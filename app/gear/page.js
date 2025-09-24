'use client'

import { useState, useEffect } from 'react'
import GearProductCard from '../../components/GearProductCard'
import { gear } from '../../lib/data/gear'

export default function GearPage() {
  const newProducts = gear.filter(p => p.brand === 'NEW')
  const akaiProducts = gear.filter(p => p.brand === 'Akai')
  const arturiaProducts = gear.filter(p => p.brand === 'Arturia')
  const elektronProducts = gear.filter(p => p.brand === 'Elektron')
  const korgProducts = gear.filter(p => p.brand === 'Korg')
  const moogProducts = gear.filter(p => p.brand === 'Moog')
  const rolandProducts = gear.filter(p => p.brand === 'Roland')
  const yamahaProducts = gear.filter(p => p.brand === 'Yamaha')
  const bossProducts = gear.filter(p => p.brand === 'Boss')
  const novationProducts = gear.filter(p => p.brand === 'Novation')
  const strymonProducts = gear.filter(p => p.brand === 'Strymon')
  const sequentialProducts = gear.filter(p => p.brand === 'Sequential')
  const teProducts = gear.filter(p => p.brand === 'Te')
  const cablesProducts = gear.filter(p => p.brand === 'Cables')

  return (
    <div>
      <div className="container-custom py-8">
        {/* Gear Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            GEAR
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The latest and greatest in synthesizers, drum machines, and all things music making
          </p>
        </div>

        {/* NEW Section */}
        {newProducts.length > 0 && (
          <>
            <h2 className="text-xl font-bold mb-6">NEW</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
              {newProducts.map((product) => (
                <GearProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}

        {/* AKAI Section */}
        {akaiProducts.length > 0 && (
          <>
            <h2 className="text-xl font-bold mb-6">AKAI</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
              {akaiProducts.map((product) => (
                <GearProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}

        {/* ARTURIA Section */}
        {arturiaProducts.length > 0 && (
          <>
            <h2 className="text-xl font-bold mb-6">ARTURIA</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
              {arturiaProducts.map((product) => (
                <GearProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}

        {/* ELEKTRON Section */}
        {elektronProducts.length > 0 && (
          <>
            <h2 className="text-xl font-bold mb-6">ELEKTRON</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
              {elektronProducts.map((product) => (
                <GearProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}

        {/* KORG Section */}
        {korgProducts.length > 0 && (
          <>
            <h2 className="text-xl font-bold mb-6">KORG</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
              {korgProducts.map((product) => (
                <GearProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}

        {/* MOOG Section */}
        {moogProducts.length > 0 && (
          <>
            <h2 className="text-xl font-bold mb-6">MOOG</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
              {moogProducts.map((product) => (
                <GearProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}

        {/* ROLAND Section */}
        {rolandProducts.length > 0 && (
          <>
            <h2 className="text-xl font-bold mb-6">ROLAND</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
              {rolandProducts.map((product) => (
                <GearProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}

        {/* YAMAHA Section */}
        {yamahaProducts.length > 0 && (
          <>
            <h2 className="text-xl font-bold mb-6">YAMAHA</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
              {yamahaProducts.map((product) => (
                <GearProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}

        {/* BOSS Section */}
        {bossProducts.length > 0 && (
          <>
            <h2 className="text-xl font-bold mb-6">BOSS</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
              {bossProducts.map((product) => (
                <GearProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}

        {/* NOVATION Section */}
        {novationProducts.length > 0 && (
          <>
            <h2 className="text-xl font-bold mb-6">NOVATION</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
              {novationProducts.map((product) => (
                <GearProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}

        {/* STRYMON Section */}
        {strymonProducts.length > 0 && (
          <>
            <h2 className="text-xl font-bold mb-6">STRYMON</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
              {strymonProducts.map((product) => (
                <GearProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}

        {/* SEQUENTIAL Section */}
        {sequentialProducts.length > 0 && (
          <>
            <h2 className="text-xl font-bold mb-6">SEQUENTIAL</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
              {sequentialProducts.map((product) => (
                <GearProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}

        {/* TEENAGE ENGINEERING Section */}
        {teProducts.length > 0 && (
          <>
            <h2 className="text-xl font-bold mb-6">TEENAGE ENGINEERING</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
              {teProducts.map((product) => (
                <GearProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}

        {/* CABLES Section */}
        {cablesProducts.length > 0 && (
          <>
            <h2 className="text-xl font-bold mb-6">CABLES</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
              {cablesProducts.map((product) => (
                <GearProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}