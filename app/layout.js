import './globals.css'
import Header from '../components/Header'
import CartDrawer from '../components/CartDrawer'
import LayoutManager from '../components/LayoutManager'
import { Toaster } from 'react-hot-toast'

export const metadata = {
  title: 'Music Store - Digital Albums & Sample Packs',
  description: 'High quality music and sample packs for producers',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-black min-h-screen">
        <LayoutManager>
          <Header />
          <main className="pt-20 transition-all duration-300">
            {children}
          </main>
          <CartDrawer />
          <Toaster position="bottom-right" />
        </LayoutManager>
      </body>
    </html>
  )
}