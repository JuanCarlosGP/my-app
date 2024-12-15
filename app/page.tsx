'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/app/components/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { StoreCard } from "@/app/components/store-card"
import { getStores, type Store } from '@/app/lib/db'

export default function TiendaPage() {
  const [isAddStoreOpen, setIsAddStoreOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
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
  
  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <div>Cargando...</div>

  return (
    <div>
      <div className="sticky top-0 z-10 bg-white/70 backdrop-blur-md pb-4">
        <Header 
          title="Proveedores" 
          showAddButton 
          onAddClick={() => setIsAddStoreOpen(true)}
          onSearchClick={() => alert('Búsqueda de Proveedores')}
        />
        <Input 
          className='w-full max-w-xs mx-auto'
          placeholder="Buscar proveedor..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Dialog open={isAddStoreOpen} onOpenChange={setIsAddStoreOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Añadir Proveedor</DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
            <Input placeholder="Código de proveedor" />
            <Input placeholder="PIN" type="password" />
            <Button className="w-full" variant="default">Añadir Proveedor</Button>
          </form>
        </DialogContent>
      </Dialog>

      <div className="mx-auto pt-6 pb-8 max-w-3xl">
        {filteredStores.map((store) => (
          <StoreCard
            key={store.id}
            id={store.id}
            name={store.name}
            description={store.description}
            subdescription={store.subdescription}
            imageUrl={store.image_url}
          />
        ))}
      </div>
    </div>
  )
}

