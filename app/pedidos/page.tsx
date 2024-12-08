"use client"

import { Card } from "@/components/ui/card"
import Image from "next/image"
import { formatPrice } from "@/lib/utils"
import { useCart } from "@/hooks/use-cart"

export default function PedidosPage() {
  const { items } = useCart()
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Resumen de tu Pedido</h1>
      
      <div className="space-y-4">
        {items.map((item) => (
          <Card key={item.id} className="p-4">
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
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">Tienda: {item.storeName}</p>
                <div className="flex justify-between items-center mt-2">
                  <div>
                    <span className="text-sm">Cantidad: </span>
                    <span className="font-medium">{item.quantity} unidades</span>
                  </div>
                  <div>
                    <span className="text-sm">Precio total: </span>
                    <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
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

