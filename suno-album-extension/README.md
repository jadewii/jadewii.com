# 🎵 Suno Album Creator - Browser Extension

**Automatically extract songs from Suno and organize them into 10-song albums for JAde Wii's website!**

## ✨ Features

- **🔍 Auto-Scan**: Automatically finds songs on Suno pages
- **📥 Extract URLs**: Gets direct MP3 links and song metadata
- **🎯 Auto-Assign**: Distributes songs across 20 pre-configured albums
- **💻 Code Export**: Generates ready-to-use JavaScript for your website
- **📄 JSON Export**: Download all album data for backup
- **🎨 Album Integration**: Works with your 432 cover images

## 🚀 Quick Start

### 1. Installation
1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `suno-album-extension` folder
5. The extension should appear in your toolbar! 🎉

### 2. Usage
1. **Go to Suno**: Navigate to `app.suno.ai` and your songs page
2. **Auto-Scan**: The extension automatically scans for songs (or click 🔍 Scan)
3. **Extract**: Click "📥 Extract All Songs" to save them
4. **Auto-Assign**: Click "🎯 Auto-Assign to Albums" to distribute 10 songs per album
5. **Export Code**: Click "💻 Generate Album Code" to get JavaScript for your website

### 3. Add to Your Website
1. Copy the generated code from the extension
2. Add it to your `lib/data/products.js` file
3. Copy your cover images to `public/images/albums/`
4. Deploy your site! 🚀

## 🎛️ Extension Interface

### Floating Panel (On Suno Pages)
- **Songs Found**: Live count of detected songs
- **🔍 Scan Page**: Manual scan trigger
- **📥 Extract All**: Save all found songs
- **📝 Assign to Albums**: Organize into 10-song collections

### Popup Interface
- **📊 Stats**: Songs found, albums ready
- **🎯 Auto-Assign**: One-click album distribution
- **💻 Generate Code**: Export JavaScript for website
- **📄 Export JSON**: Download backup data
- **👁️ View Albums**: See what's assigned to each album

## 🔧 Technical Details

**What It Extracts:**
- Song titles
- Direct MP3 URLs (from CDN)
- Duration info (when available)
- Song metadata

**Album Structure:**
- 20 albums pre-configured
- 10 songs per album maximum
- Matches your cover image collection
- $15 pricing (customizable)

**Generated Code Format:**
```javascript
{
  id: 'album-1',
  title: 'AI Generated Album 1',
  artist: 'JAde Wii',
  price: 15.00,
  type: 'album',
  category: 'modular',
  image: '/images/albums/Image_fx (1).png',
  itchioUrl: '', // Add your itch.io URL
  songs: [
    {
      title: 'Your Song Title',
      audioUrl: 'https://cdn1.suno.ai/your-song.mp3',
      duration: '3:30'
    }
    // ... 9 more songs
  ]
}
```

## 🎨 Your Album Potential

With **432 cover images** you could create:
- **43+ albums** (10 songs each)
- **430+ songs** total capacity
- Endless combinations of art + music

## 🛠️ Troubleshooting

**No songs found?**
- Make sure you're on a Suno page with songs visible
- Try scrolling down to load more songs
- Refresh the page and try again

**Extension not working?**
- Check that you're on `app.suno.ai` or `suno.ai`
- Make sure the extension is enabled
- Try reloading the page

**Can't extract songs?**
- Some songs might be private or have restricted access
- Try extracting from your "My Songs" page
- Check browser console for error messages

## 📁 File Structure
```
suno-album-extension/
├── manifest.json          # Extension configuration
├── scripts/
│   ├── content.js         # Suno page integration
│   ├── background.js      # Extension backend
│   └── styles.css         # UI styling
├── popup/
│   ├── popup.html         # Main interface
│   └── popup.js           # Interface logic
├── icons/                 # Extension icons
└── README.md             # This file
```

## 🔄 Workflow Integration

1. **Create Albums** → `node scripts/suno-album-creator.js`
2. **Use Extension** → Extract songs from Suno
3. **Generate Code** → Export JavaScript
4. **Add to Site** → Update products.js
5. **Deploy** → Push to GitHub → Live on jadewii.com

## 🎯 Next Steps

- Upload to itch.io and add purchase links
- Create preview audio clips
- Set up automated audio hosting
- Build music discovery features

---

**Made with ❤️ for JAde Wii's music empire 🎶**