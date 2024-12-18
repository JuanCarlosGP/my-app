"use client"

import { Sheet, SheetContent, SheetHeader, SheetClose, SheetTitle } from "@/components/ui/sheet"
import { ArrowLeft, Plus, Minus } from "lucide-react"
import Image from 'next/image'
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/hooks/use-cart"
import { Product } from "@/app/lib/db"
import { useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface ProductSheetProps {
  isOpen: boolean
  onClose: () => void
  product: Product
}

export function ProductSheet({ isOpen, onClose, product }: ProductSheetProps) {
  const { productQuantities, addToCart, removeFromCart, updateItemNote, items } = useCart()
  const [quantity, setQuantity] = useState(productQuantities[product.id] || 0)
  
  // Encontrar la nota existente del producto
  const existingItem = items.find(item => item.id === product.id)
  const [note, setNote] = useState(existingItem?.note || '')

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNote = e.target.value
    setNote(newNote)
    updateItemNote(product.id, newNote)
  }

  const handleSave = () => {
    if (product) {
      if (quantity > productQuantities[product.id]) {
        addToCart(product, quantity - productQuantities[product.id], note)
      } else if (quantity < productQuantities[product.id]) {
        removeFromCart(product, productQuantities[product.id] - quantity)
      }
      
      if (note !== product.note) {
        updateItemNote(product.id, note)
      }
      
      onClose()
    }
  }


  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md bg-[#f5f5f5] p-0 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="sr-only">
            {product.name}
          </SheetTitle>
        </SheetHeader>
        
        <div className="sticky top-0 bg-white/70 backdrop-blur-md z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <SheetClose className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft className="h-6 w-6" />
              </SheetClose>
            </div>
            
            <h2 className="font-semibold text-lg absolute left-1/2 -translate-x-1/2 max-w-[60%] truncate text-center">
              {product.name}
            </h2>
          </div>
        </div>

        <div className="p-4">
          <div className="relative aspect-square w-full mb-4">
            {productQuantities[product.id] > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute top-2 left-2 z-[2]"
              >
                {productQuantities[product.id]}
              </Badge>
            )}
            <Image
              src={product.image_url || ''}
              alt={product.name}
              fill
              className="rounded-lg object-cover"
            />
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4">
              <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
              <div className="overflow-x-auto whitespace-nowrap">
                <span className="text-3xl font-bold text-blue-600">
                  {product.price.toFixed(2)}€
                </span>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-2">
                  <p className="text-sm text-gray-600 text-center">Por paquete</p>
                  <div className="flex flex-col gap-2 w-full">
                    <button 
                      className="w-full py-2 px-4 bg-blue-50 hover:bg-blue-100 rounded-lg flex items-center justify-between"
                      onClick={() => addToCart(product, product.units_per_package)}
                    >
                      <Plus className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium min-w-[60px] text-right">
                        {product.units_per_package} uds.
                      </span>
                    </button>
                    <button 
                      className="w-full py-2 px-4 bg-blue-50 hover:bg-blue-100 rounded-lg flex items-center justify-between"
                      onClick={() => removeFromCart(product, product.units_per_package)}
                    >
                      <Minus className="w-5 h-5 text-red-600" />
                      <span className="text-sm font-medium min-w-[60px] text-right">
                        {product.units_per_package} uds.
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <p className="text-sm text-gray-600 text-center">Por caja</p>
                  <div className="flex flex-col gap-2 w-full">
                    <button 
                      className="w-full py-2 px-4 bg-blue-50 hover:bg-blue-100 rounded-lg flex items-center justify-between"
                      onClick={() => addToCart(product, product.units_per_box)}
                    >
                      <Plus className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium min-w-[60px] text-right">
                        {product.units_per_box} uds.
                      </span>
                    </button>
                    <button 
                      className="w-full py-2 px-4 bg-blue-50 hover:bg-blue-100 rounded-lg flex items-center justify-between"
                      onClick={() => removeFromCart(product, product.units_per_box)}
                    >
                      <Minus className="w-5 h-5 text-red-600" />
                      <span className="text-sm font-medium min-w-[60px] text-right">
                        {product.units_per_box} uds.
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Referencia:</span>
                <span className="font-medium">{product.reference || 'N/A'}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Código de barras:</span>
                <span className="font-medium">{product.barcode || 'N/A'}</span>
              </div>

              <div className="h-px bg-gray-200 my-2" />

              <div className="flex items-center justify-start whitespace-nowrap text-sm overflow-x-auto">
                <div className="inline-flex items-center mr-4">
                  <span className="text-gray-600 mr-1">Pack:</span>
                  <span className="font-medium">{product.units_per_package || 'N/A'}</span>
                </div>
                <div className="inline-flex items-center">
                  <span className="text-gray-600 mr-1">Cajas:</span>
                  <span className="font-medium">{product.units_per_box}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4">
              <label 
                htmlFor="comment" 
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                Comentarios para este producto:
              </label>
              <textarea
                id="comment"
                rows={3}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none bg-gray-50"
                placeholder="Añade aquí tus comentarios o instrucciones especiales..."
                value={note}
                onChange={handleNoteChange}
              />
              <p className="text-xs text-gray-500 mt-1">
                El comentario se guardará automáticamente
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
} 