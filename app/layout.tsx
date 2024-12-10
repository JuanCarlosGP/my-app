import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { BottomNav } from './components/bottom-nav'
import { CartProvider } from "@/app/context/cart-context"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Creador de pedidos para proveedores',
  description: 'B2B Proveedor-Tienda',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className + " bg-[#f5f5f5] min-h-screen"}>
        <CartProvider>
          <main className="mx-auto mb-[120px]">
            {children}
          </main>
        </CartProvider>
        <BottomNav />
      </body>
    </html>
  )
}

