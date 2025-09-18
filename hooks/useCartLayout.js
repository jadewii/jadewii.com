'use client'

import { useEffect } from 'react'
import { useCartStore } from '../lib/store'

export function useCartLayout() {
  const isCartOpen = useCartStore((state) => state.isCartOpen)

  useEffect(() => {
    // Always show cart by default, shift main content
    const main = document.querySelector('main')
    if (main) {
      if (isCartOpen) {
        main.style.paddingRight = '288px' // 272px cart + 16px gap
      } else {
        main.style.paddingRight = '0'
      }
    }
  }, [isCartOpen])
}