'use client'

import SimpleProductCard from '../../../components/SimpleProductCard'
import { products } from '../../../lib/data/products'

export default function SamplePacksPage() {
  // Filter for sample packs - you may need to adjust the category name
  const samplePacks = products.filter(p => p.category === 'sample-packs' || p.type === 'sample-pack')

  // All your sample packs with artwork
  const samplePackData = [
    // World Instruments
    {
      id: 'shahi-baaja',
      title: 'Shahi Baaja',
      artist: 'JAde Wii',
      price: 15.00,
      type: 'sample-pack',
      category: 'world',
      image: '/images/sample-packs/Shahi Baaja - JAde Wii.jpg',
      itchioUrl: 'https://jadewii.itch.io/'
    },
    {
      id: 'shamisen-wii-pack',
      title: 'Shamisen - Wii Pack',
      artist: 'JAde Wii',
      price: 15.00,
      type: 'sample-pack',
      category: 'world',
      image: '/images/sample-packs/Shamisen - Wii Pack.jpg',
      itchioUrl: 'https://jadewii.itch.io/'
    },
    {
      id: 'tongue-drum',
      title: 'Tongue Drum',
      artist: 'JAde Wii',
      price: 12.00,
      type: 'sample-pack',
      category: 'world',
      image: '/images/sample-packs/tonguedrum.png',
      itchioUrl: 'https://jadewii.itch.io/tongue-drum'
    },
    {
      id: 'world-instruments',
      title: 'World Instruments',
      artist: 'JAde Wii',
      price: 20.00,
      type: 'sample-pack',
      category: 'world',
      image: '/images/sample-packs/world.png',
      itchioUrl: 'https://jadewii.itch.io/'
    },
    {
      id: 'world-instruments-vol-2',
      title: 'World Instruments Vol. 2',
      artist: 'JAde Wii',
      price: 20.00,
      type: 'sample-pack',
      category: 'world',
      image: '/images/sample-packs/world2.png',
      itchioUrl: 'https://jadewii.itch.io/'
    },

    // Drums & Percussion
    {
      id: 'boombap-drums',
      title: 'BoomBap Drums',
      artist: 'JAde Wii',
      price: 15.00,
      type: 'sample-pack',
      category: 'drums',
      image: '/images/sample-packs/BoomBap Drums.jpg',
      itchioUrl: 'https://jadewii.itch.io/'
    },
    {
      id: 'pm-drums',
      title: 'PM Drums',
      artist: 'JAde Wii',
      price: 12.00,
      type: 'sample-pack',
      category: 'drums',
      image: '/images/sample-packs/pmdrums.png',
      itchioUrl: 'https://jadewii.itch.io/'
    },
    {
      id: 'glitch-drums',
      title: 'Glitch Drums',
      artist: 'JAde Wii',
      price: 15.00,
      type: 'sample-pack',
      category: 'drums',
      image: '/images/sample-packs/glitch drum.png',
      itchioUrl: 'https://jadewii.itch.io/'
    },
    {
      id: 'world-drums',
      title: 'World Drums',
      artist: 'JAde Wii',
      price: 15.00,
      type: 'sample-pack',
      category: 'drums',
      image: '/images/sample-packs/world drums.png',
      itchioUrl: 'https://jadewii.itch.io/'
    },

    // Electronic & Ambient
    {
      id: 'ambient-chords',
      title: 'Ambient Chords',
      artist: 'JAde Wii',
      price: 18.00,
      type: 'sample-pack',
      category: 'electronic',
      image: '/images/sample-packs/Ambient Chords Artwork.jpg',
      itchioUrl: 'https://jadewii.itch.io/'
    },
    {
      id: 'fm-synthesis',
      title: 'FM Synthesis',
      artist: 'JAde Wii',
      price: 15.00,
      type: 'sample-pack',
      category: 'electronic',
      image: '/images/sample-packs/fm2.png',
      itchioUrl: 'https://jadewii.itch.io/'
    },
    {
      id: 'glitch-electronics',
      title: 'Glitch Electronics',
      artist: 'JAde Wii',
      price: 15.00,
      type: 'sample-pack',
      category: 'electronic',
      image: '/images/sample-packs/glitch.png',
      itchioUrl: 'https://jadewii.itch.io/'
    },
    {
      id: 'pm-electronics',
      title: 'PM Electronics',
      artist: 'JAde Wii',
      price: 15.00,
      type: 'sample-pack',
      category: 'electronic',
      image: '/images/sample-packs/pm2.png',
      itchioUrl: 'https://jadewii.itch.io/'
    },

    // Household & Experimental
    {
      id: 'household-sounds-vol-2',
      title: 'Household Sounds Vol. 2',
      artist: 'JAde Wii',
      price: 12.00,
      type: 'sample-pack',
      category: 'experimental',
      image: '/images/sample-packs/household2.png',
      itchioUrl: 'https://jadewii.itch.io/'
    },
    {
      id: 'household-sounds-vol-3',
      title: 'Household Sounds Vol. 3',
      artist: 'JAde Wii',
      price: 12.00,
      type: 'sample-pack',
      category: 'experimental',
      image: '/images/sample-packs/household3.png',
      itchioUrl: 'https://jadewii.itch.io/'
    },
    {
      id: 'mu-15',
      title: 'MU-15',
      artist: 'JAde Wii',
      price: 10.00,
      type: 'sample-pack',
      category: 'experimental',
      image: '/images/sample-packs/MU-15.png',
      itchioUrl: 'https://jadewii.itch.io/'
    },
    {
      id: 'fat-buddha',
      title: 'Fat Buddha',
      artist: 'JAde Wii',
      price: 15.00,
      type: 'sample-pack',
      category: 'experimental',
      image: '/images/sample-packs/fat buddha.gif',
      itchioUrl: 'https://jadewii.itch.io/'
    }
  ]

  const displayPacks = samplePackData

  return (
    <div className="container-custom py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Sample Packs & Stems</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">High-quality samples and stems for your productions.</p>
      </div>

      <h2 className="text-xl font-bold mb-6">WORLD INSTRUMENTS</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
        {displayPacks.filter(p => p.category === 'world').map((product) => (
          <SimpleProductCard key={product.id} product={product} />
        ))}
      </div>

      <h2 className="text-xl font-bold mb-6">DRUMS & PERCUSSION</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
        {displayPacks.filter(p => p.category === 'drums').map((product) => (
          <SimpleProductCard key={product.id} product={product} />
        ))}
      </div>

      <h2 className="text-xl font-bold mb-6">ELECTRONIC & AMBIENT</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
        {displayPacks.filter(p => p.category === 'electronic').map((product) => (
          <SimpleProductCard key={product.id} product={product} />
        ))}
      </div>

      <h2 className="text-xl font-bold mb-6">HOUSEHOLD & EXPERIMENTAL</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
        {displayPacks.filter(p => p.category === 'experimental').map((product) => (
          <SimpleProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}