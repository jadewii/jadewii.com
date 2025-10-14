/**
 * Suno Album Creator - Content Script
 * Extracts song information from Suno pages
 */

console.log('🎵 Suno Album Creator loaded');

class SunoExtractor {
  constructor() {
    this.songs = [];
    this.albumData = [];
    this.isScanning = false;

    // Load album data from the album generator
    this.loadAlbumData();

    // Add extraction UI
    this.addExtractionUI();

    // Auto-scan on page load
    this.autoScan();
  }

  async loadAlbumData() {
    try {
      // In a real extension, this would load from chrome.storage
      // For now, we'll create some sample album slots
      this.albumData = Array.from({length: 20}, (_, i) => ({
        id: `album-${i + 1}`,
        title: `Album ${i + 1}`,
        songsNeeded: 10,
        songs: []
      }));
    } catch (error) {
      console.log('No album data found, using defaults');
    }
  }

  addExtractionUI() {
    // Create floating extraction panel
    const panel = document.createElement('div');
    panel.id = 'suno-extractor-panel';
    panel.innerHTML = `
      <div class="suno-panel-header">
        <h3>🎵 JAde Wii Album Creator</h3>
        <button id="suno-minimize">_</button>
      </div>
      <div class="suno-panel-content">
        <div class="suno-stats">
          <div>Songs Found: <span id="song-count">0</span></div>
          <div>Albums Ready: <span id="album-count">${this.albumData.length}</span></div>
        </div>
        <div class="suno-actions">
          <button id="scan-songs" class="suno-btn">🔍 Scan Page</button>
          <button id="extract-all" class="suno-btn">📥 Extract All</button>
          <button id="assign-albums" class="suno-btn">📝 Assign to Albums</button>
        </div>
        <div id="song-list" class="suno-song-list"></div>
      </div>
    `;

    document.body.appendChild(panel);

    // Add event listeners
    this.setupEventListeners();
  }

  setupEventListeners() {
    document.getElementById('scan-songs').addEventListener('click', () => {
      this.scanForSongs();
    });

    document.getElementById('extract-all').addEventListener('click', () => {
      this.extractAllSongs();
    });

    document.getElementById('assign-albums').addEventListener('click', () => {
      this.showAlbumAssignment();
    });

    document.getElementById('suno-minimize').addEventListener('click', () => {
      this.togglePanel();
    });
  }

  autoScan() {
    // Auto-scan when page loads or changes
    setTimeout(() => {
      this.scanForSongs();
    }, 2000);

    // Re-scan when page content changes
    const observer = new MutationObserver(() => {
      if (!this.isScanning) {
        setTimeout(() => this.scanForSongs(), 1000);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  scanForSongs() {
    if (this.isScanning) return;

    console.log('🔍 Scanning for Suno songs...');
    this.isScanning = true;

    // Clear previous results
    this.songs = [];

    // Try multiple selectors for different Suno page layouts
    const selectors = [
      '[data-testid="song-card"]',
      '.song-item',
      '.track-item',
      '[class*="song"]',
      '[class*="track"]',
      'audio',
      '[src*="cdn"]',
      '[href*="song"]'
    ];

    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => this.extractSongFromElement(el));
    });

    // Also scan for direct audio URLs in the page
    this.scanForAudioUrls();

    // Remove duplicates
    this.songs = this.removeDuplicateSongs(this.songs);

    console.log(`✅ Found ${this.songs.length} songs`);
    this.updateUI();
    this.isScanning = false;
  }

  extractSongFromElement(element) {
    try {
      const song = {
        title: '',
        url: '',
        duration: '',
        element: element
      };

      // Extract title - try multiple methods
      song.title =
        element.getAttribute('data-title') ||
        element.querySelector('[class*="title"]')?.textContent ||
        element.querySelector('h1, h2, h3, h4')?.textContent ||
        element.textContent?.trim().split('\n')[0] ||
        'Unknown Track';

      // Clean up title
      song.title = song.title.trim().substring(0, 100);

      // Extract audio URL - try multiple methods
      song.url =
        element.getAttribute('src') ||
        element.querySelector('audio')?.src ||
        element.querySelector('[src*="cdn"]')?.src ||
        element.querySelector('[href*="mp3"]')?.href ||
        element.getAttribute('data-src') ||
        '';

      // Extract duration
      const durationEl = element.querySelector('[class*="duration"], [data-duration]');
      if (durationEl) {
        song.duration = durationEl.textContent || durationEl.getAttribute('data-duration') || '';
      }

      // Only add if we have a valid URL or can find one
      if (song.url || song.title !== 'Unknown Track') {
        this.songs.push(song);
      }

    } catch (error) {
      console.log('Error extracting song:', error);
    }
  }

  scanForAudioUrls() {
    // Scan for audio URLs in various places
    const urlPatterns = [
      /https?:\/\/cdn\d*\.suno\.ai\/[^"\s]+\.mp3/g,
      /https?:\/\/[^"\s]*suno[^"\s]*\.mp3/g,
      /https?:\/\/[^"\s]+\.mp3/g
    ];

    const pageText = document.documentElement.outerHTML;

    urlPatterns.forEach(pattern => {
      const matches = pageText.match(pattern);
      if (matches) {
        matches.forEach(url => {
          if (!this.songs.find(s => s.url === url)) {
            this.songs.push({
              title: this.extractTitleFromUrl(url),
              url: url,
              duration: '',
              element: null
            });
          }
        });
      }
    });
  }

  extractTitleFromUrl(url) {
    try {
      const filename = url.split('/').pop().split('?')[0];
      return filename.replace('.mp3', '').replace(/[-_]/g, ' ') || 'Extracted Track';
    } catch {
      return 'Extracted Track';
    }
  }

  removeDuplicateSongs(songs) {
    const seen = new Set();
    return songs.filter(song => {
      const key = song.url || song.title;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  updateUI() {
    document.getElementById('song-count').textContent = this.songs.length;

    const songList = document.getElementById('song-list');
    songList.innerHTML = '';

    if (this.songs.length === 0) {
      songList.innerHTML = '<div class="no-songs">No songs found. Try scrolling down or navigating to your songs page.</div>';
      return;
    }

    this.songs.slice(0, 10).forEach((song, i) => {
      const songEl = document.createElement('div');
      songEl.className = 'song-item';
      songEl.innerHTML = `
        <div class="song-info">
          <div class="song-title">${song.title}</div>
          <div class="song-url">${song.url ? '🔗' : '❌'} ${song.url || 'No URL found'}</div>
        </div>
        <div class="song-actions">
          <button onclick="navigator.clipboard.writeText('${song.url}')" class="copy-btn">📋</button>
        </div>
      `;
      songList.appendChild(songEl);
    });

    if (this.songs.length > 10) {
      const moreEl = document.createElement('div');
      moreEl.className = 'more-songs';
      moreEl.textContent = `... and ${this.songs.length - 10} more songs`;
      songList.appendChild(moreEl);
    }
  }

  extractAllSongs() {
    if (this.songs.length === 0) {
      alert('No songs found! Try scanning first.');
      return;
    }

    // Send to background script for processing
    chrome.runtime.sendMessage({
      action: 'extractSongs',
      songs: this.songs,
      albumData: this.albumData
    });

    // Show success message
    this.showMessage(`🎉 Extracted ${this.songs.length} songs! Check the extension popup to assign them to albums.`);
  }

  showAlbumAssignment() {
    // This will be handled in the popup
    chrome.runtime.sendMessage({
      action: 'showAlbumAssignment',
      songs: this.songs
    });
  }

  showMessage(text) {
    const msg = document.createElement('div');
    msg.className = 'suno-message';
    msg.textContent = text;
    document.body.appendChild(msg);

    setTimeout(() => {
      msg.remove();
    }, 5000);
  }

  togglePanel() {
    const panel = document.getElementById('suno-extractor-panel');
    panel.classList.toggle('minimized');
  }
}

// Initialize when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new SunoExtractor();
  });
} else {
  new SunoExtractor();
}