"use client"

import { useEffect, useState } from 'react'
import { getStoreById, getStoreCategories, type Store, type Category } from '@/app/lib/db'

export default function StorePage({ params }: { params: { storeId: string } }) {
  const [store, setStore] = useState<Store | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStoreData() {
      try {
        const storeData = await getStoreById(params.storeId)
        const categoriesData = await getStoreCategories(params.storeId)
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
    // Tu JSX aquí usando store y categories
  )
} 