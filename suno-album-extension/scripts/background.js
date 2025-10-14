/**
 * Suno Album Creator - Background Script
 * Handles extension lifecycle and message passing
 */

// Extension installation
chrome.runtime.onInstalled.addListener(() => {
  console.log('🎵 Suno Album Creator installed');

  // Initialize storage with default data
  chrome.storage.local.set({
    songs: [],
    albums: Array.from({length: 20}, (_, i) => ({
      id: `album-${i + 1}`,
      title: `AI Generated Album ${i + 1}`,
      songsNeeded: 10,
      songs: [],
      coverImage: `Image_fx (${i + 1}).png`
    }))
  });
});

// Handle messages between content script and popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Background received message:', message);

  switch (message.action) {
    case 'extractSongs':
      handleSongExtraction(message, sender);
      break;

    case 'showAlbumAssignment':
      handleAlbumAssignment(message, sender);
      break;

    default:
      console.log('Unknown action:', message.action);
  }

  return true; // Keep message channel open for async responses
});

async function handleSongExtraction(message, sender) {
  try {
    // Save songs to storage
    await chrome.storage.local.set({
      songs: message.songs
    });

    // Show badge with song count
    chrome.action.setBadgeText({
      text: String(message.songs.length),
      tabId: sender.tab.id
    });

    chrome.action.setBadgeBackgroundColor({
      color: '#667eea'
    });

    console.log(`✅ Extracted ${message.songs.length} songs`);

    // Notify user
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon48.png',
      title: '🎵 Songs Extracted!',
      message: `Found ${message.songs.length} songs. Click the extension to assign them to albums.`
    });

  } catch (error) {
    console.error('Error handling song extraction:', error);
  }
}

async function handleAlbumAssignment(message, sender) {
  try {
    // This will open the popup or focus on it
    chrome.action.openPopup();
  } catch (error) {
    console.error('Error opening popup:', error);
  }
}

// Handle tab updates to clear badge on navigation
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && !tab.url.includes('suno.ai')) {
    // Clear badge when navigating away from Suno
    chrome.action.setBadgeText({
      text: '',
      tabId: tabId
    });
  }
});

// Context menu integration (optional)
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'extract-songs') {
    chrome.tabs.sendMessage(tab.id, {
      action: 'manualScan'
    });
  }
});

// Create context menu on install
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'extract-songs',
    title: '🎵 Extract Suno Songs',
    contexts: ['page'],
    documentUrlPatterns: ['*://suno.ai/*', '*://app.suno.ai/*']
  });
});

// Periodic cleanup of old data
setInterval(async () => {
  try {
    const result = await chrome.storage.local.get(['songs', 'albums']);

    // Remove songs older than 7 days (optional)
    if (result.songs) {
      const weekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
      const recentSongs = result.songs.filter(song => {
        return !song.timestamp || song.timestamp > weekAgo;
      });

      if (recentSongs.length !== result.songs.length) {
        await chrome.storage.local.set({ songs: recentSongs });
        console.log(`🧹 Cleaned up ${result.songs.length - recentSongs.length} old songs`);
      }
    }
  } catch (error) {
    console.error('Error during cleanup:', error);
  }
}, 60 * 60 * 1000); // Run every hour