"use client"

import { Sheet, SheetContent, SheetHeader, SheetClose, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { CategoryCard } from "@/app/components/category-card"
import { SearchSheet } from "./search-sheet"
import { ArrowLeft, Search, Plus, Minus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { getCategoryProducts, Product } from "@/app/data/stores"
import { useParams } from 'next/navigation'
import { useCart } from "@/hooks/use-cart"
import { ProductSheet } from "./product-sheet"
import { toast } from "react-hot-toast"

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
  const { productQuantities, addToCart, removeFromCart } = useCart()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    const categoryProducts = getCategoryProducts(storeId, id)
    console.log('Category products:', categoryProducts)
    setProducts(categoryProducts)
  }, [storeId, id])

  const handleProductClick = (e: React.MouseEvent, product: Product) => {
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    setSelectedProduct(product);
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    addToCart(product, quantity)
    toast.success(`Se han añadido ${quantity} unidades al pedido`)
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
        <SheetHeader>
          <SheetTitle className="sr-only">
            {name}
          </SheetTitle>
        </SheetHeader>
        
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

            <SearchSheet />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 m-1 mt-4">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="flex flex-col bg-white rounded-lg mb-3"
              onClick={(e) => handleProductClick(e, product)}
            >
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
              <div className="flex flex-col pb-2 px-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-l">{product.price.toFixed(2)}€</span>
                  <div className="flex gap-2">
                    {productQuantities[product.id] > 0 && (
                      <button 
                        className="p-2.5 bg-gray-100 rounded-full transition-transform active:scale-90 hover:bg-gray-200"
                        onClick={(e) => {
                          e.preventDefault();
                          removeFromCart(product, product.unitsPerPackage);
                        }}
                      >
                        <Minus className="w-5 h-5 text-red-600" />
                      </button>
                    )}
                    <button 
                      className="p-2.5 bg-gray-100 rounded-full transition-transform active:scale-90 hover:bg-gray-200"
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product, product.unitsPerPackage);
                      }}
                    >
                      <Plus className="w-5 h-5 text-green-600" />
                    </button>
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {product.unitsPerPackage}/p ({product.unitsPerBox} u/caja)
                </span>
              </div>
            </div>
          ))}
        </div>

        {selectedProduct && (
          <ProductSheet
            isOpen={!!selectedProduct}
            onClose={() => setSelectedProduct(null)}
            product={selectedProduct}
          />
        )}
      </SheetContent>
    </Sheet>
  )
} 