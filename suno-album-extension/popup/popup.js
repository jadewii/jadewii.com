/**
 * Suno Album Creator - Popup Script
 * Manages the extension popup interface
 */

class PopupManager {
  constructor() {
    this.songs = [];
    this.albums = [];
    this.currentTab = null;

    this.init();
  }

  async init() {
    // Load saved data
    await this.loadData();

    // Setup event listeners
    this.setupEventListeners();

    // Update UI
    this.updateUI();

    // Get current tab info
    this.getCurrentTab();
  }

  async loadData() {
    try {
      const result = await chrome.storage.local.get(['songs', 'albums']);
      this.songs = result.songs || [];
      this.albums = result.albums || this.createDefaultAlbums();
    } catch (error) {
      console.error('Error loading data:', error);
      this.albums = this.createDefaultAlbums();
    }
  }

  async saveData() {
    try {
      await chrome.storage.local.set({
        songs: this.songs,
        albums: this.albums
      });
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }

  createDefaultAlbums() {
    return Array.from({length: 20}, (_, i) => ({
      id: `album-${i + 1}`,
      title: `AI Generated Album ${i + 1}`,
      songsNeeded: 10,
      songs: [],
      coverImage: `Image_fx (${i + 1}).png`
    }));
  }

  setupEventListeners() {
    document.getElementById('scan-page').addEventListener('click', () => {
      this.scanCurrentPage();
    });

    document.getElementById('extract-all').addEventListener('click', () => {
      this.extractAllSongs();
    });

    document.getElementById('auto-assign').addEventListener('click', () => {
      this.autoAssignSongs();
    });

    document.getElementById('export-json').addEventListener('click', () => {
      this.exportJSON();
    });

    document.getElementById('generate-code').addEventListener('click', () => {
      this.generateAlbumCode();
    });

    // Listen for messages from content script
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'extractSongs') {
        this.songs = message.songs;
        this.updateUI();
        this.saveData();
      }
    });
  }

  async getCurrentTab() {
    try {
      const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
      this.currentTab = tab;

      // Check if we're on Suno
      const isSuno = tab.url.includes('suno.ai');
      if (!isSuno) {
        this.showStatus('⚠️', 'Not on Suno', 'Navigate to app.suno.ai to extract songs');
      }
    } catch (error) {
      console.error('Error getting current tab:', error);
    }
  }

  async scanCurrentPage() {
    if (!this.currentTab) {
      this.showStatus('❌', 'Error', 'Unable to access current tab');
      return;
    }

    try {
      this.showStatus('🔍', 'Scanning...', 'Looking for songs on the current page');

      // Send message to content script
      const response = await chrome.tabs.sendMessage(this.currentTab.id, {
        action: 'scanPage'
      });

      if (response && response.songs) {
        this.songs = response.songs;
        this.updateUI();
        this.saveData();
        this.showStatus('✅', 'Success', `Found ${response.songs.length} songs`);
      } else {
        this.showStatus('⚠️', 'No Songs Found', 'Try scrolling down or navigating to your songs page');
      }
    } catch (error) {
      this.showStatus('❌', 'Error', 'Make sure you are on a Suno page and refresh if needed');
      console.error('Scan error:', error);
    }
  }

  extractAllSongs() {
    if (this.songs.length === 0) {
      this.showStatus('⚠️', 'No Songs', 'Scan for songs first');
      return;
    }

    this.showStatus('📥', 'Extracting...', `Processing ${this.songs.length} songs`);

    // Songs are already extracted by the content script
    // Just need to save them
    this.saveData();
    this.showStatus('✅', 'Extracted', `${this.songs.length} songs ready for assignment`);
  }

  autoAssignSongs() {
    if (this.songs.length === 0) {
      this.showStatus('⚠️', 'No Songs', 'Extract songs first');
      return;
    }

    this.showStatus('🎯', 'Auto-Assigning...', 'Distributing songs across albums');

    // Clear existing assignments
    this.albums.forEach(album => album.songs = []);

    // Assign songs to albums (10 songs per album)
    let songIndex = 0;
    for (let i = 0; i < this.albums.length && songIndex < this.songs.length; i++) {
      const album = this.albums[i];
      const songsForThisAlbum = this.songs.slice(songIndex, songIndex + 10);

      album.songs = songsForThisAlbum.map((song, idx) => ({
        title: song.title || `Track ${idx + 1}`,
        audioUrl: song.url,
        duration: song.duration || '3:30'
      }));

      songIndex += 10;
    }

    const albumsWithSongs = this.albums.filter(a => a.songs.length > 0).length;
    this.saveData();
    this.updateUI();
    this.showStatus('✅', 'Assigned', `Songs distributed across ${albumsWithSongs} albums`);
  }

  exportJSON() {
    const exportData = {
      generated: new Date().toISOString(),
      totalSongs: this.songs.length,
      totalAlbums: this.albums.filter(a => a.songs.length > 0).length,
      albums: this.albums.filter(a => a.songs.length > 0)
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jade-wii-albums-${Date.now()}.json`;
    a.click();

    URL.revokeObjectURL(url);
    this.showStatus('💾', 'Exported', 'Album data downloaded as JSON');
  }

  generateAlbumCode() {
    const albumsWithSongs = this.albums.filter(a => a.songs.length > 0);

    if (albumsWithSongs.length === 0) {
      this.showStatus('⚠️', 'No Albums', 'Assign songs to albums first');
      return;
    }

    // Generate JavaScript code for products.js
    const albumCode = albumsWithSongs.map(album => {
      return `  {
    id: '${album.id}',
    title: '${album.title}',
    artist: 'JAde Wii',
    price: 15.00,
    type: 'album',
    category: 'modular',
    image: '/images/albums/${album.coverImage}',
    itchioUrl: '', // Add your itch.io URL here
    songs: [
${album.songs.map(song => `      {
        title: '${song.title.replace(/'/g, "\\'")}',
        audioUrl: '${song.audioUrl}',
        duration: '${song.duration}'
      }`).join(',\n')}
    ]
  }`).join(',\n\n');

    const fullCode = `// Generated albums from Suno
// Add these to your products.js file

const newAlbums = [
${albumCode}
];

// To add to existing products:
// export const products = [...existingProducts, ...newAlbums];`;

    // Copy to clipboard
    navigator.clipboard.writeText(fullCode).then(() => {
      this.showStatus('💻', 'Code Generated', 'Album code copied to clipboard');
    }).catch(() => {
      // Fallback: download as file
      const blob = new Blob([fullCode], { type: 'text/javascript' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `jade-wii-albums-code-${Date.now()}.js`;
      a.click();
      URL.revokeObjectURL(url);
      this.showStatus('💻', 'Code Generated', 'Album code downloaded as file');
    });
  }

  updateUI() {
    // Update stats
    document.getElementById('songs-found').textContent = this.songs.length;
    document.getElementById('albums-ready').textContent = this.albums.length;

    // Update album list
    this.updateAlbumList();
  }

  updateAlbumList() {
    const albumList = document.getElementById('album-list');

    if (this.albums.length === 0) {
      albumList.innerHTML = '<div class="loading">No albums configured</div>';
      return;
    }

    albumList.innerHTML = this.albums.slice(0, 10).map(album => {
      const progress = `${album.songs.length}/${album.songsNeeded}`;
      const isComplete = album.songs.length >= album.songsNeeded;

      return `
        <div class="album-item">
          <div class="album-info">
            <div class="album-title">${album.title}</div>
            <div class="album-progress">
              ${progress} songs ${isComplete ? '✅' : '⏳'}
            </div>
          </div>
          <div class="album-actions">
            <button class="btn-small" onclick="popup.viewAlbum('${album.id}')">
              👁️
            </button>
            <button class="btn-small" onclick="popup.clearAlbum('${album.id}')">
              🗑️
            </button>
          </div>
        </div>
      `;
    }).join('');

    if (this.albums.length > 10) {
      const remaining = this.albums.length - 10;
      albumList.innerHTML += `
        <div class="album-item">
          <div class="album-info">
            <div class="album-title">... and ${remaining} more albums</div>
          </div>
        </div>
      `;
    }
  }

  viewAlbum(albumId) {
    const album = this.albums.find(a => a.id === albumId);
    if (!album) return;

    const songList = album.songs.length > 0
      ? album.songs.map(s => `• ${s.title}`).join('\n')
      : 'No songs assigned yet';

    alert(`${album.title}\n\n${songList}`);
  }

  clearAlbum(albumId) {
    const album = this.albums.find(a => a.id === albumId);
    if (!album) return;

    if (confirm(`Clear all songs from "${album.title}"?`)) {
      album.songs = [];
      this.saveData();
      this.updateUI();
      this.showStatus('🗑️', 'Cleared', `${album.title} is now empty`);
    }
  }

  showStatus(icon, title, text) {
    const statusEl = document.getElementById('status');
    const iconEl = document.getElementById('status-icon');
    const titleEl = document.getElementById('status-title-text');
    const textEl = document.getElementById('status-text');

    iconEl.textContent = icon;
    titleEl.textContent = title;
    textEl.textContent = text;
    statusEl.style.display = 'block';

    // Auto-hide after 5 seconds for non-error messages
    if (!title.includes('Error')) {
      setTimeout(() => {
        statusEl.style.display = 'none';
      }, 5000);
    }
  }
}

// Global popup instance for inline event handlers
let popup;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  popup = new PopupManager();
});

// Export for inline handlers
window.popup = popup;