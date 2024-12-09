import React from 'react'
import { ArrowUpDown, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/hooks/use-cart"
import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { StoreSelectorSheet } from './store-selector-sheet'

interface HeaderPedidosProps {
  title: string
  onSearch: (term: string) => void
}

export function HeaderPedidos({ title, onSearch }: HeaderPedidosProps) {
  const { getUniqueStores, selectedStoreId } = useCart()
  const uniqueStores = getUniqueStores()
  const [isOpen, setIsOpen] = useState(false)

  const selectedStore = uniqueStores.find(store => store.id === selectedStoreId)

  return (
    <header className="flex flex-col pt-4 px-4">
      <div className="flex justify-between items-center">
        <div className="w-10" />
        <div className="flex flex-col items-center w-full max-w-[500px]">
          <div className="flex items-center justify-between w-full relative">
            <div className="w-10" />
            <h1 className="text-xl font-bold truncate absolute left-1/2 -translate-x-1/2">{title}</h1>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
              <ArrowUpDown className="h-6 w-6" />
            </Button>
          </div>
          {selectedStore && (
            <Button 
              variant="secondary" 
              onClick={() => setIsOpen(true)}
              className="mt-2 text-sm font-normal"
            >
              {selectedStore.name}
            </Button>
          )}
        </div>
        <div className="w-10" />
      </div>
      {selectedStore && (
        <div className="relative mt-4">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar productos..."
            className="pl-9 w-full"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      )}

      <StoreSelectorSheet 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </header>
  )
} 