"use client"

import { useEffect, useState } from 'react'
import { getCategoryProducts, type Product } from '@/app/lib/db'

export default function CategoryPage({ params }: { params: { categoryId: string } }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      try {
        const productsData = await getCategoryProducts(params.categoryId)
        setProducts(productsData)
      } catch (error) {
        console.error('Error loading products:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [params.categoryId])

  if (loading) return <div>Cargando...</div>

  return (
    // Tu JSX aquí usando products
  )
} 