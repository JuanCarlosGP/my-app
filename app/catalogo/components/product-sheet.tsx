"use client"

import { Sheet, SheetContent, SheetHeader, SheetClose } from "@/components/ui/sheet"
import { ArrowLeft } from "lucide-react"
import Image from 'next/image'
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/app/context/cart-context"

interface ProductSheetProps {
  isOpen: boolean
  onClose: () => void
  product: {
    id: string
    name: string
    price: number
    unitsPerBox: number
    imageUrl: string
  }
}

export function ProductSheet({ isOpen, onClose, product }: ProductSheetProps) {
  const { productQuantities } = useCart()

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md bg-[#f5f5f5] p-0 overflow-y-auto">
        <div className="sticky top-0 bg-white/70 backdrop-blur-md z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <SheetClose className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft className="h-6 w-6" />
              </SheetClose>
            </div>
            
            <h2 className="font-semibold text-lg absolute left-1/2 -translate-x-1/2">
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
              src={product.imageUrl}
              alt={product.name}
              fill
              className="rounded-lg object-cover"
            />
          </div>

          <div className="bg-white rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-4">{product.name}</h3>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{product.price.toFixed(2)}€</span>
              <span className="text-gray-500">{product.unitsPerBox} u/c</span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
} 