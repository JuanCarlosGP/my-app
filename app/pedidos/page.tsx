"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { formatPrice } from "@/lib/utils"
import { useCart } from "@/hooks/use-cart"
import { HeaderPedidos } from '@/app/pedidos/components/header-pedidos'
import { ChevronRight, ShoppingCart, ArrowUpDown } from 'lucide-react'
import { useState, useEffect, useMemo } from 'react'
import { ProductSheet } from "@/app/catalogo/components/product-sheet"
import { Product } from "@/app/lib/db"
import { getAllProducts } from "@/app/data/stores"
import { Button } from "@/components/ui/button"
import { FacturacionSheet } from './components/facturacion-sheet'
import { StoreSelectorSheet } from './components/store-selector-sheet'
import { CartItem } from "@/app/context/cart-context"
import toast from 'react-hot-toast'

function CompactProductCard({ item }: { item: CartItem }) {
  const calculateBoxes = () => {
    if (!item.units_per_box || !item.units_per_package || !item.quantity) return 0
    const totalUnits = item.units_per_package
    const boxes = totalUnits / item.units_per_box
    return Number(boxes.toFixed(2))
  }

  return (
    <Card className="hover:bg-gray-50 transition-colors">
      <CardContent className="p-3">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 flex-shrink-0">
            <Image
              src={item.image_url || '/placeholder.jpg'}
              alt={item.name}
              fill
              className="object-cover rounded-md"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = '/placeholder.jpg'
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm truncate">{item.name}</h3>
                <p className="text-xs text-muted-foreground truncate">Ref: {item.reference || 'N/A'}</p>
              </div>
              <div className="flex items-center gap-4 ml-2">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Total</p>
                  <p className="font-medium text-sm text-primary">
                    {formatPrice(item.price * (item.quantity/item.units_per_package))}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              </div>
            </div>
            <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
              <span>{item.units_per_package} uds/pack</span>
              <span>•</span>
              <span>{calculateBoxes()} cajas</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ProductCard({ item, viewMode = "detailed" }: { item: CartItem, viewMode?: "compact" | "detailed" }) {
  if (viewMode === "compact") {
    return <CompactProductCard item={item} />
  }

  const calculateBoxes = () => {
    if (!item.units_per_box || !item.units_per_package || !item.quantity) return 0
    const totalUnits = item.units_per_package
    const boxes = totalUnits / item.units_per_box
    return Number(boxes.toFixed(2))
  }

  const totalUnits = item.units_per_package

  return (
    <Card className="hover:bg-gray-50 transition-colors">
      <CardContent className="p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
          <div className="relative w-full sm:w-20 h-32 sm:h-20 flex-shrink-0">
            <Image
              src={item.image_url || '/placeholder.jpg'}
              alt={item.name}
              fill
              className="object-cover rounded-md"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = '/placeholder.jpg'
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start sm:items-center justify-between mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base sm:text-lg truncate">{item.name}</h3>
                <p className="text-sm text-muted-foreground truncate">Ref: {item.reference || 'N/A'}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0 ml-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-3 mt-2 sm:mt-4">
              <div className="space-y-1 bg-muted/50 p-2 rounded-md">
                <p className="text-xs sm:text-sm text-muted-foreground">Pack</p>
                <p className="font-medium text-sm sm:text-base">{item.units_per_package} uds</p>
              </div>
              <div className="space-y-1 bg-muted/50 p-2 rounded-md">
                <p className="text-xs sm:text-sm text-muted-foreground">Unidades</p>
                <p className="font-medium text-sm sm:text-base">{totalUnits}</p>
              </div>
              <div className="space-y-1 bg-muted/50 p-2 rounded-md">
                <p className="text-xs sm:text-sm text-muted-foreground">Cajas</p>
                <div className="flex items-center gap-1 flex-wrap">
                  <p className="font-medium text-sm sm:text-base">{calculateBoxes()}</p>
                  <span className="text-[10px] sm:text-xs text-muted-foreground">
                    ({item.units_per_box} uds/caja)
                  </span>
                </div>
              </div>
              <div className="space-y-1 bg-muted/50 p-2 rounded-md">
                <p className="text-xs sm:text-sm text-muted-foreground">Total</p>
                <p className="font-medium text-sm sm:text-base text-primary">
                  {formatPrice(item.price * (item.quantity/item.units_per_package))}
                </p>
              </div>
            </div>

            {item.note && (
              <div className="mt-3 p-2 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Nota:</span> {item.note}
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function PedidosPage() {
  const { items, selectedStoreId, setSelectedStoreId } = useCart()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<(Product & { quantity?: number }) | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [storeProducts, setStoreProducts] = useState<Product[]>([])
  const [viewMode, setViewMode] = useState<"compact" | "detailed">("compact")
  const [isFacturacionOpen, setIsFacturacionOpen] = useState(false)
  
  const storesWithItems = Array.from(new Set(items
    .filter(item => item.quantity > 0 && item.store_id)
    .map(item => item.store_id)
  ))

  useEffect(() => {
    console.log('Items:', items)
    console.log('Stores with items:', storesWithItems)
    
    if (selectedStoreId) {
      const hasItemsInSelectedStore = items.some(item => 
        item.store_id === selectedStoreId && item.quantity > 0
      )

      if (!hasItemsInSelectedStore && storesWithItems.length > 0) {
        setSelectedStoreId(storesWithItems[0])
      }
    } else if (storesWithItems.length > 0) {
      setSelectedStoreId(storesWithItems[0])
    }
  }, [items, selectedStoreId, setSelectedStoreId, storesWithItems])

  useEffect(() => {
    async function loadProducts() {
      if (selectedStoreId) {
        console.log('Loading products for store:', selectedStoreId)
        try {
          const products = await getAllProducts(selectedStoreId)
          console.log('Loaded products:', products)
          setStoreProducts(products)
        } catch (error) {
          console.error('Error loading products:', error)
          toast.error('Error al cargar los productos')
        }
      }
    }
    loadProducts()
  }, [selectedStoreId])

  useEffect(() => {
    console.log('Current state:', {
      selectedStoreId,
      storesWithItems,
      items,
      storeProducts
    })
  }, [selectedStoreId, storesWithItems, items, storeProducts])

  const storeItems = useMemo(() => {
    return selectedStoreId 
      ? items.filter(item => 
          item.store_id === selectedStoreId && 
          item.quantity > 0 &&
          item.id // asegurarse de que el item tenga un id válido
        )
      : []
  }, [items, selectedStoreId])

  const filteredItems = useMemo(() => {
    return storeItems.filter(item =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [storeItems, searchTerm])

  const handleCardClick = (cartItem: CartItem) => {
    console.log('Cart item:', cartItem)
    const fullProduct = storeProducts.find(p => p.id === cartItem.id)
    console.log('Full product:', fullProduct)
    if (fullProduct) {
      setSelectedProduct({
        ...fullProduct,
        quantity: cartItem.quantity,
        note: cartItem.note || null
      })
      setIsSheetOpen(true)
    }
  }

  const orderTotal = filteredItems.reduce((total, item) => {
    return total + (item.price * (item.quantity/item.units_per_package))
  }, 0)

  return (
    <div className="bg-gray-50 min-h-screen pb-[120px]">
      <div className="max-w-2xl mx-auto">
        <div className="sticky top-0 z-10 bg-white/70 backdrop-blur-md pb-4">
          <HeaderPedidos 
            title="Pedido" 
            onSearch={setSearchTerm}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </div>

        <div className="container mx-auto px-1 py-6 max-w-3xl">
          {storesWithItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-15rem)] text-center px-4">
              <ShoppingCart className="h-12 w-12 mb-4 text-gray-400 mx-auto" />
              <h1 className="text-xl font-semibold mb-2 text-gray-600">No hay productos en el pedido</h1>
              <p className="text-gray-500">
                Añade productos desde el catálogo para comenzar tu pedido
              </p>
            </div>
          ) : !selectedStoreId ? (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-15rem)] text-center px-4">
              <ShoppingCart className="h-12 w-12 mb-4 text-gray-400" />
              <h2 className="text-xl font-semibold mb-2">Selecciona una tienda</h2>
              <p className="text-gray-600">
                Puedes elegir una tienda usando el selector en la parte superior
              </p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-15rem)] text-center px-4">
              <ShoppingCart className="h-12 w-12 mb-4 text-gray-400" />
              <h2 className="text-xl font-semibold mb-2">Pedido vacío</h2>
              <p className="text-gray-600">
                Agrega productos desde el catálogo para comenzar tu pedido
              </p>
            </div>
          ) : (
            <div className="space-y-[0.1rem]">
              {filteredItems.map((item) => (
                <div key={item.id} onClick={() => handleCardClick(item)}>
                  <ProductCard 
                    item={item} 
                    viewMode={viewMode}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {storeItems.length > 0 && (
          <>
            <div className="fixed bottom-[56px] left-0 right-0 bg-white">
              <div className="border-b border-gray-200" />
              <div className="max-w-2xl mx-auto flex items-center justify-between p-4">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Total</span>
                  <span className="font-semibold text-lg">{formatPrice(orderTotal)}</span>
                </div>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                  onClick={() => setIsFacturacionOpen(true)}
                >
                  Pedir
                </Button>
              </div>
            </div>
          </>
        )}

        <FacturacionSheet
          isOpen={isFacturacionOpen}
          onClose={() => setIsFacturacionOpen(false)}
          items={filteredItems}
          total={orderTotal}
        />

        {selectedProduct && (
          <ProductSheet
            product={selectedProduct}
            isOpen={isSheetOpen}
            onClose={() => {
              setIsSheetOpen(false)
              setSelectedProduct(null)
            }}
          />
        )}
      </div>
    </div>
  )
}
