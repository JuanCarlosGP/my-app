"use client"

import { Sheet, SheetContent, SheetClose, SheetTrigger } from "@/components/ui/sheet"
import { Search, ArrowLeft, Plus, Minus } from "lucide-react"
import { useSearch } from '@/app/context/search-context'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { getAllProducts, type Product } from "@/app/lib/db"
import Image from 'next/image'
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/hooks/use-cart"
import { ProductSheet } from "./product-sheet"
import { Input } from "@/components/ui/input"
import { ViewToggleButton } from "./view-toggle-button"
import { cn } from "@/lib/utils"

interface SearchSheetProps {
  variant?: 'icon' | 'card'
}

export function SearchSheet({ variant = 'icon' }: SearchSheetProps) {
  const params = useParams()
  const storeId = params.id as string
  const [products, setProducts] = useState<Product[]>([])
  const { searchTerm, setSearchTerm } = useSearch()
  const { productQuantities, addToCart, removeFromCart } = useCart()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [isGridView, setIsGridView] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      setLoading(true)
      try {
        const allProducts = await getAllProducts(storeId)
        console.log('Products loaded:', allProducts)
        setProducts(allProducts)
      } catch (error) {
        console.error('Error loading products:', error)
      } finally {
        setLoading(false)
      }
    }

    if (storeId) {
      loadProducts()
    }
  }, [storeId])

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleProductClick = (e: React.MouseEvent, product: Product) => {
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    setSelectedProduct(product);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {variant === 'card' ? (
          <div className="flex flex-col items-center py-5 hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="p-3 bg-emerald-50 rounded-xl mb-2.5 transition-transform hover:scale-105">
              <Search className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">Buscador</span>
          </div>
        ) : (
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Search className="h-6 w-6" />
          </button>
        )}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-gray-50 p-0 overflow-y-auto">
        <div className="sticky top-0 bg-white/70 backdrop-blur-xl border-b border-gray-200/50 z-10">
          <div className="flex items-center justify-between p-4">
            <SheetClose className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="h-6 w-6" />
            </SheetClose>
            
            <h2 className="font-semibold text-lg max-w-[60%] truncate text-center">
              Buscador
            </h2>

            <ViewToggleButton 
              isGridView={isGridView}
              onToggle={() => setIsGridView(!isGridView)}
            />
          </div>

          <div className="px-4 pb-4">
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full bg-white border-gray-200"
            />
          </div>
        </div>
        
        <div className="p-4">
          <div className={cn(
            "grid gap-3",
            isGridView ? "grid-cols-2" : "grid-cols-1"
          )}>
            {loading ? (
              <div className="col-span-2 text-center py-10">Cargando productos...</div>
            ) : filteredProducts.length === 0 ? (
              <div className="col-span-2 text-center py-10">No se encontraron productos</div>
            ) : (
              filteredProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="flex flex-col bg-white rounded-lg border border overflow-hidden w-full"
                  onClick={(e) => handleProductClick(e, product)}
                >
                  <div className={cn(
                    "relative",
                    isGridView ? "aspect-square" : "aspect-[16/9]"
                  )}>
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
                  <div className="p-2">
                    <h3 className="text-base font-medium line-clamp-2 mb-2">
                      {product.name}
                    </h3>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xl text-blue-600">
                          {product.price.toFixed(2)}€
                        </span>
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
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col text-sm text-gray-500">
                          <span>{product.units_per_package}u/pack</span>
                          <span>{product.units_per_box}u/caja</span>
                        </div>
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
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
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