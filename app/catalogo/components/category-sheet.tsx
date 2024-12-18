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
import { ViewToggleButton } from "./view-toggle-button"
import { cn } from "@/lib/utils"

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
  const [loading, setLoading] = useState(true)
  const { productQuantities, addToCart, removeFromCart } = useCart()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isGridView, setIsGridView] = useState(true)
  const { id: categoryId } = useParams()

  useEffect(() => {
    async function loadProducts() {
      setLoading(true)
      try {
        console.log('Fetching products for category:', id, 'in store:', storeId)
        const categoryProducts = await getCategoryProducts(storeId, id)
        console.log('Products fetched:', categoryProducts)
        setProducts(categoryProducts)
      } catch (error) {
        console.error('Error loading products:', error)
        toast.error('Error al cargar los productos')
      } finally {
        setLoading(false)
      }
    }

    if (id && storeId) {
      loadProducts()
    }
  }, [storeId, id])

  const handleProductClick = (e: React.MouseEvent, product: Product) => {
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    setSelectedProduct(product);
  };

  const handleAddToCart = async (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()
    
    const storeId = Array.isArray(params.id) ? params.id[0] : params.id
    
    const productToAdd: Product = {
      ...product,
      store_id: storeId
    }

    try {
      await addToCart(productToAdd, product.units_per_package)
    } catch (error) {
      console.error('Error in handleAddToCart:', error)
      toast.error('Error al añadir el producto')
    }
  }

  const handleRemoveFromCart = async (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()
    
    try {
      await removeFromCart(product, product.units_per_package)
    } catch (error) {
      console.error('Error removing from cart:', error)
      toast.error('Error al eliminar el producto')
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="w-full px-4 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-4 ">
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
      <SheetContent className="w-full sm:max-w-md bg-gray-50 p-0 overflow-y-auto ">
        <SheetHeader className="sr-only">
          <SheetTitle>{name}</SheetTitle>
        </SheetHeader>
        
        <div className="sticky top-0 bg-white/70 backdrop-blur-xl border-b border-gray-200/50 z-10">
          <div className="flex items-center justify-between p-4">
            <SheetClose className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft className="h-6 w-6" />
            </SheetClose>
            
            <h2 className="font-semibold text-lg max-w-[60%] truncate text-center">
              {name}
            </h2>

            <div className="flex items-center">
              <ViewToggleButton 
                isGridView={isGridView}
                onToggle={() => setIsGridView(!isGridView)}
              />
              <SearchSheet />
            </div>
          </div>
        </div>
        
        <div className="p-4 ">
          <div className={cn(
            "grid gap-3",
            isGridView ? "grid-cols-2" : "grid-cols-1"
          )}>
            {loading ? (
              <div className="col-span-full text-center py-10">Cargando productos...</div>
            ) : products.length === 0 ? (
              <div className="col-span-full text-center py-10">No hay productos en esta categoría</div>
            ) : products.map((product) => (
              <div 
                key={product.id} 
                className="flex flex-col bg-white rounded-lg border border overflow-hidden w-full "
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
                      <div className="flex items-center gap-2">
                        {productQuantities[product.id] > 0 && (
                          <button 
                            className="p-2.5 bg-gray-50 rounded-full transition-colors hover:bg-gray-100"
                            onClick={(e) => handleRemoveFromCart(e, product)}
                          >
                            <Minus className="w-5 h-5 text-red-600" />
                          </button>
                        )}
                        <button 
                          className="p-2.5 bg-gray-50 rounded-full transition-colors hover:bg-gray-100"
                          onClick={(e) => handleAddToCart(e, product)}
                        >
                          <Plus className="w-5 h-5 text-green-600" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col text-sm text-gray-500">
                        <span>{product.units_per_package} uds/pack</span>
                        <span className="text-gray-400">{product.units_per_box} uds/caja</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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