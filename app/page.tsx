'use client'

import { useState, useEffect } from 'react'
import { Header } from './components/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { StoreCard } from "@/app/components/store-card"


export default function TiendaPage() {
  const [isAddStoreOpen, setIsAddStoreOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const stores = [
    {
      id: "1",
      name: "La Casa de los Bigotes",
      phone: "912 345 678",
      description: "Tienda de artículos y juguetes para gatos amantes de la diversión.",
      imageUrl: "https://cataas.com/cat?width=300&height=200&random=1"
    },
    {
      id: "2",
      name: "Gatitos Gourmet",
      phone: "911 223 344",
      description: "Especialistas en comida premium para los paladares felinos más exigentes.",
      imageUrl: "https://cataas.com/cat?width=300&height=200&random=2"
    },
    {
      id: "3",
      name: "Bigotes Saludables",
      phone: "913 456 789",
      description: "Productos naturales y suplementos para mantener a tu gato en forma.",
      imageUrl: "https://cataas.com/cat?width=300&height=200&random=3"
    },
    {
      id: "4",
      name: "Rascadores y Más",
      phone: "914 567 890",
      description: "Todo lo que necesitas para que tu gato se divierta y cuide sus uñas.",
      imageUrl: "https://cataas.com/cat?width=300&height=200&random=4"
    },
    {
      id: "5",
      name: "Gatolandia",
      phone: "915 678 901",
      description: "Tienda integral con todo tipo de productos para consentir a tu gato.",
      imageUrl: "https://cataas.com/cat?width=300&height=200&random=5"
    },
    {
      id: "6",
      name: "El Paraíso del Gato",
      phone: "916 789 012",
      description: "Desde camas cómodas hasta accesorios modernos, el lugar perfecto para tu gato.",
      imageUrl: "https://cataas.com/cat?width=300&height=200&random=6"
    },
    {
      id: "7",
      name: "Felinos Fashion",
      phone: "917 890 123",
      description: "Ropa y accesorios de moda para que tu gato luzca increíble.",
      imageUrl: "https://cataas.com/cat?width=300&height=200&random=7"
    },
    {
      id: "8",
      name: "Los Reyes del Miau",
      phone: "918 901 234",
      description: "Coronas, juguetes y más para los auténticos reyes felinos.",
      imageUrl: "https://cataas.com/cat?width=300&height=200&random=8"
    },
    {
      id: "9",
      name: "Bigotes de Lujo",
      phone: "919 012 345",
      description: "Productos premium para consentir a tu gato con estilo y comodidad.",
      imageUrl: "https://cataas.com/cat?width=300&height=200&random=9"
    },
    {
      id: "10",
      name: "Miau Relax",
      phone: "920 123 456",
      description: "Spa para gatos con productos relajantes y espacios únicos para el descanso.",
      imageUrl: "https://cataas.com/cat?width=300&height=200&random=10"
    }
  ];
  
  
  
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

