'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function SupportPage() {
  const [paymentType, setPaymentType] = useState('one-time') // 'one-time' or 'monthly'

  const supportTiers = [
    { amount: 2, color: 'white', stripeOneTime: 'https://donate.stripe.com/28EdR8cHN3k27ij7X25ZC0c', stripeMonthly: '', isSponsor: false, oneTimeOnly: true },
    { amount: 5, color: 'pink', stripeOneTime: 'https://buy.stripe.com/00w9ASfTZ1bUbyz9165ZC02', stripeMonthly: 'https://buy.stripe.com/fZu3cu5fl6wedGH3GM5ZC03', isSponsor: false },
    { amount: 10, color: 'blue', stripeOneTime: 'https://buy.stripe.com/aFabJ0fTZg6OeKL3GM5ZC04', stripeMonthly: 'https://buy.stripe.com/eVq7sK7ntf2K5ab2CI5ZC08', isSponsor: false },
    { amount: 20, color: 'green', stripeOneTime: 'https://buy.stripe.com/14A9AS7ntaMu6effpu5ZC07', stripeMonthly: 'https://buy.stripe.com/00waEW8rx2fY9qr9165ZC09', isSponsor: false },
    { amount: 50, color: 'purple', stripeOneTime: 'https://buy.stripe.com/fZu7sK239bQygST3GM5ZC06', stripeMonthly: 'https://buy.stripe.com/7sY3cu4bhg6O1XZdhm5ZC0a', isSponsor: false },
    { amount: 200, color: 'black', stripeOneTime: '', stripeMonthly: 'https://buy.stripe.com/3cI14mfTZ9Iq0TV9165ZC0b', isSponsor: true, monthlyOnly: true },
  ]

  const handleSupport = (tier) => {
    const link = paymentType === 'one-time' ? tier.stripeOneTime : tier.stripeMonthly
    if (link) {
      window.open(link, '_blank')
    } else {
      alert('Payment link coming soon!')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-blue-50">
      <div className="container-custom py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-black animate-fade-in">
            ❤️ DONATE
          </h1>

          <p className="text-base md:text-lg text-gray-700 mb-12 max-w-2xl mx-auto px-4">
            It's because of fans like you that I can continue to do what I do!
          </p>

          {/* Payment Type Toggle */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setPaymentType('one-time')}
              className={`px-8 py-4 text-lg font-bold rounded-full transition-all transform hover:scale-105 shadow-lg ${
                paymentType === 'one-time'
                  ? 'bg-black text-white'
                  : 'bg-white text-black border-2 border-gray-200'
              }`}
            >
              One-time
            </button>
            <button
              onClick={() => setPaymentType('monthly')}
              className={`px-8 py-4 text-lg font-bold rounded-full transition-all transform hover:scale-105 shadow-lg ${
                paymentType === 'monthly'
                  ? 'bg-black text-white'
                  : 'bg-white text-black border-2 border-gray-200'
              }`}
            >
              Monthly
            </button>
          </div>

          {/* Support Tiers */}
          <div className={`grid grid-cols-2 gap-6 md:gap-8 mb-12 max-w-5xl mx-auto md:grid-cols-5`}>
            {supportTiers
              .filter(tier => {
                if (tier.monthlyOnly && paymentType !== 'monthly') return false
                if (tier.oneTimeOnly && paymentType !== 'one-time') return false
                return true
              })
              .map((tier) => (
              <div key={tier.amount} className="flex flex-col items-center">
                <button
                  onClick={() => handleSupport(tier)}
                  className={`support-button ${tier.color}-support ${paymentType === 'monthly' ? 'monthly-mode' : 'onetime-mode'}`}
                >
                  <span className="amount-text">${tier.amount}</span>
                </button>
                {tier.isSponsor && (
                  <div className="mt-3 text-center">
                    <p className="text-xs font-bold text-gray-800 mb-1">SPONSOR</p>
                    <p className="text-xs text-gray-600 px-2">YouTube credits</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="bg-white rounded-3xl p-8 shadow-lg max-w-2xl mx-auto mb-16">
            <p className="text-gray-700 mb-4">
              Every contribution helps me continue creating music, apps, and content.
              Whether you choose a one-time gift or monthly support, I'm incredibly grateful!
            </p>
            <p className="text-sm text-gray-500">
              Secure payments powered by Stripe
            </p>
          </div>

          {/* Supporters Section */}
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">♥️ OUR MONTHLY SUPPORTERS</h2>
            <div className="text-center text-lg md:text-xl leading-relaxed text-gray-800">
              {['rogier maurer', 'Adam', 'Nuna', 'Steve Dawson', 'Sean Conover', 'Arianna Davis', 'Adam Ramadan', 'Herbal7ea', 'PaulDuran', 'Chris Samuel', 'Michael H', 'Nyyym', 'Juju Bullseye', 'Topher Graceless', 'Shah Paul', 'NoiseTheorem', 'tony', 'Jean-David Palmer', 'David Maskew', 'Jake Cadigal', 'Stevie (OneManWent)', 'Rachel K Collier', 'Edith Frost', 'Christopher Gerardy', 'David Goldstein', 'Nolan McFadden', 'orange88us', 'Jeff', 'Drew from Westchester', 'James Gregory', 'Tonverfall Studio', 'ezbot', 'Yakov Khalinsky', 'larry', 'Pnya Pnya', 'Geo (Overand)', 'Kevin Marks', 'Justin Benjamin', 'John Sudnik', 'Silvia', 'Joshua A.C. Newman', 'Dan Kushner', 'Colin Brash'].join(' • ')}
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        /* Support button style - 3D sphere like NoiseFace */
        .support-button {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          position: relative;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
          transform-style: preserve-3d;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          cursor: pointer;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (min-width: 768px) {
          .support-button {
            width: 160px;
            height: 160px;
          }
        }

        .support-button:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
        }

        /* Outer rim (white border) */
        .support-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 50%;
          background: white;
          z-index: 1;
          transform-style: preserve-3d;
        }

        /* Inner dome with 3D gradient */
        .support-button::after {
          content: '';
          position: absolute;
          top: 15%;
          left: 15%;
          right: 15%;
          bottom: 15%;
          border-radius: 50%;
          z-index: 2;
          transform-style: preserve-3d;
          box-shadow:
            inset -5px -5px 15px rgba(0, 0, 0, 0.15),
            inset 5px 5px 15px rgba(255, 255, 255, 0.6);
          transition: background 0.3s ease;
        }

        .amount-text {
          position: relative;
          z-index: 3;
          font-size: 1.5rem;
          font-weight: bold;
          color: black;
          font-family: 'Courier New', monospace;
          text-shadow: none;
          transition: color 0.3s ease;
        }

        @media (min-width: 768px) {
          .amount-text {
            font-size: 1.75rem;
          }
        }

        /* One-time mode - white interior with black text */
        .onetime-mode::after {
          background: radial-gradient(
            circle at 40% 35%,
            #ffffff,
            #f5f5f5 50%,
            #e5e5e5
          );
        }

        .onetime-mode:hover::after {
          background: radial-gradient(
            circle at 40% 35%,
            #2ecc71,
            #27ae60 50%,
            #229954
          );
        }

        .onetime-mode:hover .amount-text {
          color: white;
        }

        /* Monthly mode - white interior with black text */
        .monthly-mode::after {
          background: radial-gradient(
            circle at 40% 35%,
            #ffffff,
            #f5f5f5 50%,
            #e5e5e5
          );
        }

        /* Monthly mode hover - black instead of blue */
        .monthly-mode:hover::after {
          background: radial-gradient(
            circle at 40% 35%,
            #2a2a2a,
            #1a1a1a 50%,
            #000000
          );
        }

        .monthly-mode:hover .amount-text {
          color: white;
        }

        /* Black sponsor button */
        .black-support.monthly-mode::after {
          background: radial-gradient(
            circle at 40% 35%,
            #2a2a2a,
            #1a1a1a 50%,
            #000000
          );
        }

        .black-support.monthly-mode .amount-text {
          color: white;
        }

        .black-support.monthly-mode:hover::after {
          background: radial-gradient(
            circle at 40% 35%,
            #1a1a1a,
            #0a0a0a 50%,
            #000000
          );
        }
      `}</style>
    </div>
  )
}
