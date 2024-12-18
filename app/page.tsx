'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/app/components/header'
import { StoreCard } from "@/app/components/store-card"
import { getStores, type Store } from '@/app/lib/db'
import { LoadingSpinner } from '@/app/components/loading'
import { StoreAccessForm } from '@/app/components/store-access-form'
import { Input } from '@/components/ui/input'
import { Store as StoreIcon } from "lucide-react"

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

  if (loading) return <LoadingSpinner />

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="sticky top-0 z-10 bg-white/70 backdrop-blur-lg border-b border-gray-200/50">
          <Header title="Tiendas" />
          <div className="px-4 pb-4">
            <Input
              type="text"
              placeholder="Buscar tiendas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-50 border-gray-200"
            />
          </div>
        </div>

        <div className="px-4 space-y-4 pb-10">
          {filteredStores.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-17.5rem)] text-center">
              <StoreIcon className="h-12 w-12 mb-4 text-gray-400 mx-auto" />
              <h1 className="text-xl font-semibold mb-2 text-gray-600">No tienes tiendas guardadas</h1>
              <p className="text-gray-500">Usa el botón + para añadir una tienda</p>
            </div>
          ) : (
            filteredStores.map((store) => (
              <StoreCard
                key={store.id}
                id={store.id}
                name={store.name}
                description={store.description || ''}
                subdescription={store.subdescription || ''}
                imageUrl={store.image_url || ''}
              />
            ))
          )}
        </div>
      </div>

      <StoreAccessForm />
    </div>
  )
}

