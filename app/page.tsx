'use client'

import { useState } from 'react'
import { Header } from './components/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { StoreCard } from "@/app/components/store-card"

export default function TiendaPage() {
  const [isAddStoreOpen, setIsAddStoreOpen] = useState(false)

  const stores = [
    {
      name: "Perfumería Primor",
      phone: "912 345 678",
      description: "Tu perfumería de confianza con las mejores marcas de cosmética y perfumes. Encuentra todo lo que necesitas para tu rutina de belleza.",
      imageUrl: "/stores/primor.jpg"
    },
    {
      name: "Droguería García",
      phone: "911 223 344",
      description: "Productos de limpieza, cosmética y cuidado personal. Más de 30 años de experiencia en el barrio de Salamanca.",
      imageUrl: "/stores/drogueria.jpg"
    },
    {
      name: "Herboristería El Jardín Natural",
      phone: "913 456 789",
      description: "Especialistas en productos naturales, hierbas medicinales y cosmética ecológica. Asesoramiento personalizado para tu bienestar.",
      imageUrl: "/stores/herboristeria.jpg"
    },
    {
      name: "Cosmética Carmen",
      phone: "914 567 890",
      description: "Tu tienda especializada en productos de belleza profesional. Distribuidores oficiales de las mejores marcas de cosmética.",
      imageUrl: "/stores/cosmetica-carmen.jpg"
    }
  ]

  return (
    <div>
      <Header 
        title="Tiendas" 
        showAddButton 
        onAddClick={() => setIsAddStoreOpen(true)}
        onSearchClick={() => alert('Búsqueda de tiendas')}
      />
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
          {stores.map((store, index) => (
            <StoreCard
              key={index}
              name={store.name}
              phone={store.phone}
              description={store.description}
              imageUrl={store.imageUrl}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

