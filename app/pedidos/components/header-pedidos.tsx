import React from 'react'
import { ArrowUpDown, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/hooks/use-cart"
import { useState } from 'react'
import { Input } from "@/components/ui/input"

interface HeaderPedidosProps {
  title: string
  onSearch: (term: string) => void
}

export function HeaderPedidos({ title, onSearch }: HeaderPedidosProps) {
  const { getUniqueStores, selectedStoreId, setSelectedStoreId } = useCart()
  const uniqueStores = getUniqueStores()
  const [isOpen, setIsOpen] = useState(false)

  const selectedStore = uniqueStores.find(store => store.id === selectedStoreId)

  return (
    <header className="flex flex-col pt-4 px-4">
      <div className="flex justify-between items-center">
        <div className="w-10" />
        <div className="text-center">
          <h1 className="text-xl font-bold truncate max-w-[450px]">{title}</h1>
          {selectedStore && (
            <p className="text-sm text-gray-500 mt-2">{selectedStore.name}</p>
          )}
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <ArrowUpDown className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[100%]">
            <div className="space-y-4 py-4">
              <h2 className="text-lg font-semibold text-center">Cambiar Tienda</h2>
              <div className="space-y-2 px-4">
                {uniqueStores.map((store) => (
                  <Button
                    key={store.id}
                    variant={selectedStoreId === store.id ? "default" : "ghost"}
                    className="w-full justify-start text-left"
                    onClick={() => {
                      setSelectedStoreId(store.id)
                      setIsOpen(false)
                    }}
                  >
                    {store.name}
                  </Button>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
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
    </header>
  )
} 