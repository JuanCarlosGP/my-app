"use client"

import { Sheet, SheetContent, SheetHeader, SheetClose, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { CategoryCard } from "@/app/components/category-card"
import { SearchSheet } from "./search-sheet"
import { ArrowLeft, Search, Plus, Minus, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { getCategoryProducts, type Product } from "@/app/lib/db"
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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      try {
        const categoryProducts = await getCategoryProducts(storeId, id)
        setProducts(categoryProducts)
      } catch (error) {
        console.error('Error loading products:', error)
        toast.error('Error al cargar los productos')
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
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
        <button className="w-full px-4 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 relative rounded-lg overflow-hidden border border-gray-200/50">
              <Image
                src={imageUrl}
                alt={name}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-left">
              <span className="block text-lg font-medium mb-1.5">
                {name}
              </span>
              {description && (
                <span className="text-sm text-gray-500">
                  {description}
                </span>
              )}
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-gray-50 p-0 overflow-y-auto">
        <div className="sticky top-0 bg-white/70 backdrop-blur-xl border-b border-gray-200/50 z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <SheetClose className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft className="h-6 w-6" />
              </SheetClose>
            </div>
            
            <h2 className="font-semibold text-lg absolute left-1/2 -translate-x-1/2">
              {name}
            </h2>

            <SearchSheet />
          </div>
        </div>
        
        <div className="p-4 space-y-3">
          {loading ? (
            <div className="text-center py-10">Cargando productos...</div>
          ) : products.length === 0 ? (
            <div className="text-center py-10">No hay productos en esta categoría</div>
          ) : products.map((product) => (
            <div 
              key={product.id} 
              className="flex flex-col bg-white rounded-lg border border-gray-200/50 overflow-hidden w-full"
              onClick={(e) => handleProductClick(e, product)}
            >
              <div className="relative aspect-[16/9]">
                {productQuantities[product.id] > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute top-3 left-3 z-[2]"
                  >
                    {productQuantities[product.id]}
                  </Badge>
                )}
                <Image
                  src={product.image_url || ''}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-base font-medium line-clamp-2 mb-3">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xl">{product.price.toFixed(2)}€</span>
                  <div className="flex gap-2">
                    {productQuantities[product.id] > 0 && (
                      <button 
                        className="p-2.5 bg-gray-50 rounded-full transition-colors hover:bg-gray-100"
                        onClick={(e) => {
                          e.preventDefault();
                          removeFromCart(product, product.units_per_package);
                        }}
                      >
                        <Minus className="w-5 h-5 text-red-600" />
                      </button>
                    )}
                    <button 
                      className="p-2.5 bg-gray-50 rounded-full transition-colors hover:bg-gray-100"
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product, product.units_per_package);
                      }}
                    >
                      <Plus className="w-5 h-5 text-green-600" />
                    </button>
                  </div>
                </div>
                <span className="text-sm text-gray-500 block mt-2">
                  {product.units_per_package}u/pack ({product.units_per_box} u/caja)
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