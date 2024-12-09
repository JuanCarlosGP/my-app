import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '@/app/data/stores'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  storeId: string
  storeName: string
}

interface CartStore {
  items: CartItem[]
  productQuantities: { [key: string]: number }
  addToCart: (product: Product, quantity: number) => void
  removeFromCart: (product: Product, quantity: number) => void
  clearCart: () => void
  selectedStoreId: string | null
  setSelectedStoreId: (id: string | null) => void
  getUniqueStores: () => { id: string, name: string }[]
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      productQuantities: {},
      selectedStoreId: null,
      
      addToCart: (product, quantity) =>
        set((state) => {
          const existingQuantity = state.productQuantities[product.id] || 0
          const newQuantity = existingQuantity + quantity
          const storeId = product.id.split('-')[1]

          console.log('Añadiendo producto:', {
            id: product.id,
            name: product.name,
            storeId: product.storeId,
            storeName: product.storeName,
            fullProduct: product
          })

          const newProductQuantities = {
            ...state.productQuantities,
            [product.id]: newQuantity,
          }

          const existingItem = state.items.find(item => item.id === product.id)
          const newItems = existingItem
            ? state.items.map(item =>
                item.id === product.id
                  ? { 
                      ...item, 
                      quantity: newQuantity,
                      storeId: item.id.split('-')[1],
                      storeName: product.storeName
                    }
                  : item
              )
            : [...state.items, {
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: newQuantity,
                image: product.imageUrl,
                storeId: product.id.split('-')[1],
                storeName: product.storeName || 'Tienda'
              }]

          return {
            ...state,
            productQuantities: newProductQuantities,
            items: newItems,
            selectedStoreId: storeId
          }
        }),

      removeFromCart: (product, quantity) =>
        set((state) => {
          const existingQuantity = state.productQuantities[product.id] || 0
          const newQuantity = Math.max(0, existingQuantity - quantity)

          const newProductQuantities = {
            ...state.productQuantities,
            [product.id]: newQuantity,
          }

          const newItems = newQuantity === 0
            ? state.items.filter(item => item.id !== product.id)
            : state.items.map(item =>
                item.id === product.id
                  ? { ...item, quantity: newQuantity }
                  : item
              )

          return {
            ...state,
            productQuantities: newProductQuantities,
            items: newItems,
          }
        }),

      clearCart: () => set({ items: [], productQuantities: {}, selectedStoreId: null }),
      
      setSelectedStoreId: (id: string | null) => 
        set(state => ({ 
          ...state, 
          selectedStoreId: id
        })),
      
      getUniqueStores: () => {
        const { items } = get()
        
        console.log('Items completos:', JSON.stringify(items, null, 2))
        
        const storesMap = new Map()
        
        items.forEach(item => {
          if (item.quantity > 0) {
            const storeId = item.id.split('-')[1]
            
            console.log('Procesando item:', {
              id: item.id,
              name: item.name,
              extractedStoreId: storeId,
              storeName: item.storeName
            })
            
            storesMap.set(storeId, {
              id: storeId,
              name: item.storeName
            })
          }
        })

        const stores = Array.from(storesMap.values())
        console.log('Tiendas únicas encontradas:', stores)
        return stores
      },
    }),
    {
      name: 'cart-storage',
    }
  )
) 