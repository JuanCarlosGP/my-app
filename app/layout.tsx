import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { BottomNav } from './components/bottom-nav'
import { CartProvider } from "@/app/context/cart-context"
import { AuthProvider } from './providers/auth-provider'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Creador de tiendas online para Proveedores',
  description: 'B2B Proveedor-Tienda',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <main className="pb-[3.75rem]">
              {children}
            </main>
            <BottomNav />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

