import React from 'react'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
    <header className="mb-4 pt-4 px-4">
      <h1 className="text-xl font-bold text-center">{title}</h1>
      {selectedStore && (
        <>
          <Button 
            variant="secondary" 
            onClick={() => setIsOpen(true)}
            className="mt-2 text-sm font-normal w-full"
          >
            {selectedStore.name}
          </Button>

          <div className="relative mt-4">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar productos..."
              className="pl-9 w-full"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </>
      )}

      <StoreSelectorSheet 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </header>
  )
} 