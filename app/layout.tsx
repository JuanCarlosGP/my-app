import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { BottomNav } from './components/bottom-nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tienda Móvil',
  description: 'Una aplicación simple de tienda para móviles',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <main className="container mx-auto max-w-md p-4">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  )
}

