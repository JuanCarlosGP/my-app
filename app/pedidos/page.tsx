"use client"

import { Card } from "@/components/ui/card"
import Image from "next/image"
import { formatPrice } from "@/lib/utils"
import { useCart } from "@/hooks/use-cart"
import { Header } from '@/app/components/header'
import { ChevronRight } from 'lucide-react'

export default function PedidosPage() {
  const { items } = useCart()
  
  return (
    <div>
      <div className="sticky top-0 z-10 bg-white/70 backdrop-blur-md pb-4">
        <Header 
          title="Pedido"
        />
      </div>
      <div className="container mx-auto px-1 py-8 max-w-3xl">
        {items.map((item) => (
          <Card key={item.id} className="p-4 relative">
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-24">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold truncate max-w-[200px]">{item.name}</h3>
                  <ChevronRight className="h-7 w-7 text-gray-400" />
                </div>
                <div className="grid grid-cols-3 gap-8">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Precio</p>
                    <p className="font-medium text-blue-600">{formatPrice(item.price)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Cantidad</p>
                    <p className="font-medium">{item.quantity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Total</p>
                    <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

