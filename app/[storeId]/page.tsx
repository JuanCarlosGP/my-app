"use client"

import { useEffect, useState } from 'react'
import { getStoreById, getCategories, type Store, type Category } from '@/app/lib/db'

export default function StorePage({ params }: { params: { storeId: string } }) {
  const [store, setStore] = useState<Store | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStoreData() {
      try {
        const storeData = await getStoreById(params.storeId)
        const categoriesData = await getCategories(params.storeId)
        setStore(storeData)
        setCategories(categoriesData)
      } catch (error) {
        console.error('Error loading store data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadStoreData()
  }, [params.storeId])

  if (loading) return <div>Cargando...</div>
  if (!store) return <div>Tienda no encontrada</div>

  return (
    <div>
      <h1>{store.name}</h1>
      <div className="grid grid-cols-1 gap-4">
        {categories.map((category) => (
          <div key={category.id}>
            <h2>{category.name}</h2>
            <p>{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
} 