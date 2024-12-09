"use client"

import { Card } from "@/components/ui/card"
import Image from "next/image"
import { formatPrice } from "@/lib/utils"
import { useCart } from "@/hooks/use-cart"
import { HeaderPedidos } from '@/app/pedidos/components/header-pedidos'
import { ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { ProductSheet } from "@/app/catalogo/components/product-sheet"
import { Product } from "@/app/data/stores"
import { getAllProducts } from "@/app/data/stores"

export default function PedidosPage() {
  const { items, selectedStoreId } = useCart()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  
  // Obtener todos los productos de la tienda seleccionada
  const allStoreProducts = selectedStoreId ? getAllProducts(selectedStoreId) : []
  
  // Filtrar por tienda seleccionada
  const storeItems = selectedStoreId 
    ? items.filter(item => {
        const itemStoreId = item.id.split('-')[1]
        return itemStoreId === selectedStoreId && item.quantity > 0
      })
    : []

  // Filtrar por término de búsqueda
  const filteredItems = storeItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCardClick = (cartItem: typeof items[0]) => {
    // Buscar el producto completo usando el ID del item del carrito
    const fullProduct = allStoreProducts.find(p => p.id === cartItem.id)
    if (fullProduct) {
      // Combinar la información del producto con la cantidad del carrito
      const productWithQuantity = {
        ...fullProduct,
        quantity: cartItem.quantity
      }
      setSelectedProduct(productWithQuantity)
      setIsSheetOpen(true)
    }
  }

  return (
    <div>
      <div className="sticky top-0 z-10 bg-white/70 backdrop-blur-md pb-4">
        <HeaderPedidos 
          title="Pedido" 
          onSearch={setSearchTerm}
        />
      </div>
      <div className="container mx-auto px-1 py-6 max-w-3xl">
        {filteredItems.map((item) => (
          <Card 
            key={item.id} 
            className="p-4 relative mb-1 cursor-pointer hover:bg-gray-50"
            onClick={() => handleCardClick(item)}
          >
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

      {selectedProduct && (
        <ProductSheet
          isOpen={isSheetOpen}
          onClose={() => setIsSheetOpen(false)}
          product={selectedProduct}
        />
      )}
    </div>
  )
}

