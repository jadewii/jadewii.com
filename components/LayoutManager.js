'use client'

import { useCartLayout } from '../hooks/useCartLayout'

export default function LayoutManager({ children }) {
  useCartLayout()
  return children
}