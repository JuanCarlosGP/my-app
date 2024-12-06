'use client'

import { Header } from '../components/header'
import Image from 'next/image'

const products = [
  { id: 1, name: 'Producto 1', image: '/placeholder.svg' },
  { id: 2, name: 'Producto 2', image: '/placeholder.svg' },
  // Añade más productos aquí
]

export default function CatalogoPage() {
  return (
    <div>
      <Header 
        title="Nombre de la Tienda" 
        onSearchClick={() => alert('Búsqueda de productos')}
      />
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded p-2">
            <Image src={product.image} alt={product.name} width={100} height={100} className="w-full h-auto" />
            <p className="mt-2 text-center">{product.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

