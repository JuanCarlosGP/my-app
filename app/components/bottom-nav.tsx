'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Book, ShoppingCart, Settings, Store } from 'lucide-react'

const navItems = [
  { href: '/', icon: Store, label: 'Tienda' },
  { href: '/catalogo', icon: Book, label: 'Catálogo' },
  { href: '/pedidos', icon: ShoppingCart, label: 'Pedidos' },
  // { href: '/historial', icon: Clock, label: 'Historial' },
  { href: '/ajustes', icon: Settings, label: 'Ajustes' },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
      <ul className="flex justify-around">
        {navItems.map(({ href, icon: Icon, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={`flex flex-col items-center p-2 ${
                pathname === href || (href !== '/' && pathname.startsWith(href)) ? 'text-black-500' : 'text-gray-500'
              }`}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
