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
        {filteredStores.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <StoreIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No tienes proveedores guardados</p>
            <p className="text-sm mt-1">Usa el botón + para añadir un proveedor</p>
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

      <StoreAccessForm />
    </div>
  )
}

