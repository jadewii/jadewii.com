import './globals.css'
import SimpleHeader from '../components/SimpleHeader'

export const metadata = {
  title: 'Music Store - Digital Albums & Sample Packs',
  description: 'High quality music and sample packs for producers',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-black min-h-screen">
        <SimpleHeader />
        <main className="pt-20">
          {children}
        </main>
      </body>
    </html>
  )
}