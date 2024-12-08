'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/app/components/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { StoreCard } from "@/app/components/store-card"
import { stores } from '@/app/data/stores'

export default function TiendaPage() {
  const [isAddStoreOpen, setIsAddStoreOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  
  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <div className="sticky top-0 z-10 bg-white/70 backdrop-blur-md pb-4">
      <Header 
        title="Tiendas" 
        showAddButton 
        onAddClick={() => setIsAddStoreOpen(true)}
        onSearchClick={() => alert('Búsqueda de tiendas')}
      />
        <Input className='w-full max-w-xl mx-auto'
          placeholder="Buscar tiendas..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Dialog open={isAddStoreOpen} onOpenChange={setIsAddStoreOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Añadir Tienda</DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
            <Input placeholder="Código de la tienda" />
            <Input placeholder="PIN" type="password" />
            <Button className="w-full" variant="default">Añadir Tienda</Button>
          </form>
        </DialogContent>
      </Dialog>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
        {filteredStores.map((store) => (
          <StoreCard
            key={store.id}
            id={store.id}
            name={store.name}
            description={store.description}
            subdescription={store.subdescription}
            imageUrl={store.imageUrl}
          />
        ))}
        </div>
      </main>
    </div>
  )
}

