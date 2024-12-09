import React from 'react'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/hooks/use-cart"
import { useState } from 'react'

interface HeaderPedidosProps {
  title: string
}

export function HeaderPedidos({ title }: HeaderPedidosProps) {
  const { getUniqueStores, selectedStoreId, setSelectedStoreId } = useCart()
  const uniqueStores = getUniqueStores()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="flex justify-between items-center mb-4 pt-4 px-4">
      <div className="w-10" />
      <h1 className="text-xl font-bold truncate max-w-[450px]">{title}</h1>
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
    </header>
  )
} 