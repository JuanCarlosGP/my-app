"use client"

import { Card } from "@/components/ui/card"
import Image from "next/image"
import { formatPrice } from "@/lib/utils"
import { useCart } from "@/hooks/use-cart"
import { HeaderPedidos } from '@/app/pedidos/components/header-pedidos'
import { ChevronRight, ShoppingCart } from 'lucide-react'
import { useState, useEffect } from 'react'
import { ProductSheet } from "@/app/catalogo/components/product-sheet"
import { Product } from "@/app/data/stores"
import { getAllProducts } from "@/app/data/stores"
import { Button } from "@/components/ui/button"
import { FacturacionSheet } from './components/facturacion-sheet'

export default function PedidosPage() {
  const { items, selectedStoreId, setSelectedStoreId } = useCart()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isFacturacionOpen, setIsFacturacionOpen] = useState(false)
  
  const allStoreProducts = selectedStoreId ? getAllProducts(selectedStoreId) : []
  
  const storesWithItems = Array.from(new Set(items
    .filter(item => item.quantity > 0)
    .map(item => item.id.split('-')[1])
  ))

  useEffect(() => {
    if (selectedStoreId) {
      const hasItemsInSelectedStore = items.some(item => {
        const itemStoreId = item.id.split('-')[1]
        return itemStoreId === selectedStoreId && item.quantity > 0
      })

      if (!hasItemsInSelectedStore && storesWithItems.length > 0) {

        setSelectedStoreId(storesWithItems[0])
      }
    } else if (storesWithItems.length > 0) {

      setSelectedStoreId(storesWithItems[0])
    }
  }, [items, selectedStoreId, setSelectedStoreId, storesWithItems])

  const storeItems = selectedStoreId 
    ? items.filter(item => {
        const itemStoreId = item.id.split('-')[1]
        return itemStoreId === selectedStoreId && item.quantity > 0
      })
    : []

  const filteredItems = storeItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCardClick = (cartItem: typeof items[0]) => {
    const fullProduct = allStoreProducts.find(p => p.id === cartItem.id)
    if (fullProduct) {
      const productWithQuantity = {
        ...fullProduct,
        quantity: cartItem.quantity
      }
      setSelectedProduct(productWithQuantity)
      setIsSheetOpen(true)
    }
  }

  const orderTotal = filteredItems.reduce((total, item) => {
    return total + (item.price * item.quantity)
  }, 0)

  return (
    <div>
      <div className="sticky top-0 z-10 bg-white/70 backdrop-blur-md pb-4">
        <HeaderPedidos 
          title="Pedido" 
          onSearch={setSearchTerm}
        />
      </div>
      <div className="container mx-auto px-1 py-6 max-w-3xl">
        {storesWithItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
            <ShoppingCart className="h-12 w-12 mb-4 text-gray-400 mx-auto" />
            <h1 className="text-xl font-semibold mb-2 text-gray-600">No hay productos en el pedido</h1>
            <p className="text-gray-500">
              Añade productos desde el catálogo para comenzar tu pedido
            </p>
          </div>
        ) : !selectedStoreId ? (
          <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
            <ShoppingCart className="h-12 w-12 mb-4 text-gray-400" />
            <h2 className="text-xl font-semibold mb-2">Selecciona una tienda</h2>
            <p className="text-gray-600">
              Puedes elegir una tienda usando el selector en la parte superior
            </p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
            <ShoppingCart className="h-12 w-12 mb-4 text-gray-400" />
            <h2 className="text-xl font-semibold mb-2">Pedido vacío</h2>
            <p className="text-gray-600">
              Agrega productos desde el catálogo para comenzar tu pedido
            </p>
          </div>
        ) : (
          filteredItems.map((item) => (
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
                      <p className="text-sm text-gray-500 mt-2 mb-1 whitespace-nowrap">
                        Pack: <span className="font-medium text-black">{item.packages || 0}</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Cantidad</p>
                      <p className="font-medium">{item.quantity}</p>
                      <p className="text-sm text-gray-500 mt-2 mb-1 whitespace-nowrap">
                        Cajas: <span className="font-medium text-black">{item.boxes || 0}</span>
                      </p>
                    </div> 
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Total</p>
                      
                        <p className="font-medium whitespace-nowrap text-sm">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {filteredItems.length > 0 && selectedStoreId && (
        <div className="fixed bottom-[60px] left-0 right-0 bg-white border-t shadow-lg mb-[-1vw]">
          <div className="container mx-auto px-4 h-[60px] flex items-center justify-between max-w-3xl">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Total</span>
              <span className="text-lg font-semibold ml-1">{formatPrice(orderTotal)}</span>
            </div>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
              onClick={() => setIsFacturacionOpen(true)}
            >
              Pedir
            </Button>
          </div>
        </div>
      )}

      {selectedProduct && (
        <ProductSheet
          isOpen={isSheetOpen}
          onClose={() => setIsSheetOpen(false)}
          product={selectedProduct}
        />
      )}

      <FacturacionSheet
        isOpen={isFacturacionOpen}
        onClose={() => setIsFacturacionOpen(false)}
        items={filteredItems}
        total={orderTotal}
      />
    </div>
  )
}

