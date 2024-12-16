'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/app/components/header'
import { StoreCard } from "@/app/components/store-card"
import { getStores, type Store } from '@/app/lib/db'
import { LoadingSpinner } from '@/app/components/loading'

export default function HomePage() {
  const [stores, setStores] = useState<Store[]>([])
  const [loading, setLoading] = useState(true)

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

  if (loading) return <LoadingSpinner />

  return (
    <div>
      <div className="sticky top-0 z-10 bg-white/70 backdrop-blur-md pb-4">
        <Header title="Proveedores" />
      </div>

      <div className="mx-auto pt-6 pb-8 max-w-3xl">
        {stores.map((store) => (
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
    </div>
  )
}

