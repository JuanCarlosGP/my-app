"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { CategoryCard } from "@/app/components/category-card"
import { SearchSheet } from "./search-sheet"
import { ArrowLeft, Search, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { getCategoryProducts, Product } from "@/app/data/stores"
import { useParams } from 'next/navigation'

interface CategorySheetProps {
  id: string
  name: string
  description?: string
  subdescription?: string
  imageUrl: string
}

export function CategorySheet({ id, name, description, subdescription, imageUrl }: CategorySheetProps) {
  const params = useParams()
  const storeId = params.id as string
  const [products, setProducts] = useState<Product[]>([])
  const [productQuantities, setProductQuantities] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    const categoryProducts = getCategoryProducts(storeId, id)
    setProducts(categoryProducts)
  }, [storeId, id])

  const handleAddProduct = (productId: string, unitsPerBox: number) => {
    setProductQuantities(prev => {
      const currentQuantity = prev[productId] || 0
      return {
        ...prev,
        [productId]: currentQuantity + unitsPerBox
      }
    })
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div>
          <CategoryCard
            id={id}
            name={name}
            description={description}
            subdescription={subdescription}
            imageUrl={imageUrl}
          />
        </div>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-[#f5f5f5] p-0 overflow-y-auto">
        <div className="sticky top-0 bg-white/70 backdrop-blur-md z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <SheetClose className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft className="h-6 w-6" />
              </SheetClose>
            </div>
            
            <h2 className="font-semibold text-lg absolute left-1/2 -translate-x-1/2">
              {name}
            </h2>

            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Search className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Buscar productos</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  {/* Aquí puedes agregar el contenido del buscador */}
                  <p>Contenido del buscador...</p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 m-1 mt-4">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col bg-white rounded-lg mb-3">
              <div className="relative aspect-square mb-2">
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
              <div className="h-[2.8em] overflow-hidden relative px-2">
                <h3 className="text-sm leading-[1.4em] line-clamp-2">
                  {product.name}
                </h3>
              </div>
              <div className="flex items-center justify-between pb-2 px-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-l">{product.price.toFixed(2)}€</span>
                  <span className="text-sm text-gray-500">{product.unitsPerBox} u/c</span>
                </div>
                <button 
                  className="p-2.5 bg-gray-100 rounded-full transition-transform active:scale-90 hover:bg-gray-200"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddProduct(product.id, product.unitsPerBox);
                  }}
                >
                  <Plus className="w-5 h-5 text-green-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
} 