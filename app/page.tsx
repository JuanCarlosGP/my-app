'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/app/components/header'
import { StoreCard } from "@/app/components/store-card"
import { getStores, type Store } from '@/app/lib/db'
import { LoadingSpinner } from '@/app/components/loading'
import { StoreAccessForm } from '@/app/components/store-access-form'
import { Input } from '@/components/ui/input'

export default function HomePage() {
  const [stores, setStores] = useState<Store[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    async function loadStores() {
      try {
        const storesData = await getStores()
        setStores(storesData)
      } catch (error) {
        console.error('Error loading stores:', error)
      } finally {
        setLoading(false)
      }
    }

    loadStores()
  }, [])

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <LoadingSpinner />

  return (
    <div>
      <div className="sticky top-0 z-10 bg-white/70 backdrop-blur-md">
        <Header title="Proveedores" />
        <div className="px-4 pb-4">
          <Input
            type="text"
            placeholder="Buscar proveedores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-50 border-gray-200"
          />
        </div>
      </div>

      <div className="mx-auto pt-6 pb-8 max-w-3xl">
        {filteredStores.map((store) => (
          <StoreCard
            key={store.id}
            id={store.id}
            name={store.name}
            description={store.description || ''}
            subdescription={store.subdescription || ''}
            imageUrl={store.image_url || ''}
          />
        ))}
      </div>

      <StoreAccessForm />
    </div>
  )
}

