"use client"

import { useEffect, useState } from 'react'
import { getCategoryProducts, type Product } from '@/app/lib/db'
import { LoadingSpinner } from '@/app/components/loading'

export default function CategoryPage({ params }: { params: { storeId: string, categoryId: string } }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      try {
        const productsData = await getCategoryProducts(params.storeId, params.categoryId)
        setProducts(productsData)
      } catch (error) {
        console.error('Error loading products:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [params.storeId, params.categoryId])

  if (loading) return <LoadingSpinner />

  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      {products.map((product) => (
        <div key={product.id} className="bg-white p-4 rounded-lg shadow">
          <h2>{product.name}</h2>
          <p>Precio: {product.price}€</p>
        </div>
      ))}
    </div>
  )
} 