import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '@/app/data/stores'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  packages?: number
  boxes?: number
  note?: string
}

interface CartStore {
  items: CartItem[]
  productQuantities: { [key: string]: number }
  addToCart: (product: Product, quantity: number, note?: string) => void
  removeFromCart: (product: Product, quantity: number) => void
  clearCart: () => void
  selectedStoreId: string | null
  setSelectedStoreId: (id: string | null) => void
  getUniqueStores: () => { id: string, name: string }[]
  updateItemNote: (productId: string, note: string) => void
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      productQuantities: {},
      selectedStoreId: null,
      
      addToCart: (product, quantity, note) =>
        set((state) => {
          const existingQuantity = state.productQuantities[product.id] || 0
          const newQuantity = existingQuantity + quantity
          const storeId = product.id.split('-')[1]

          const unitsPerPackage = product.unitsPerPackage
          const unitsPerBox = product.unitsPerBox
          
          const packages = Math.floor(newQuantity / unitsPerPackage)
          const boxes = Math.floor(newQuantity / unitsPerBox)

          console.log('Añadiendo producto:', {
            id: product.id,
            name: product.name,
            quantity: newQuantity,
            unitsPerPackage,
            unitsPerBox,
            packages,
            boxes
          })

          const existingItem = state.items.find(item => item.id === product.id)
          const newItems = existingItem
            ? state.items.map(item =>
                item.id === product.id
                  ? { 
                      ...item, 
                      quantity: newQuantity,
                      packages,
                      boxes,
                      note: note || item.note,
                      unitsPerPackage,
                      unitsPerBox,
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
                packages,
                boxes,
                note,
                unitsPerPackage,
                unitsPerBox,
                image: product.imageUrl,
                storeId: product.id.split('-')[1],
                storeName: product.storeName || 'Tienda'
              }]

          return {
            ...state,
            productQuantities: {
              ...state.productQuantities,
              [product.id]: newQuantity,
            },
            items: newItems,
            selectedStoreId: storeId
          }
        }),

      removeFromCart: (product, quantity) =>
        set((state) => {
          const existingQuantity = state.productQuantities[product.id] || 0
          const newQuantity = Math.max(0, existingQuantity - quantity)
          
          const unitsPerPackage = product.unitsPerPackage || 12
          const unitsPerBox = product.unitsPerBox || 48
          
          const packages = Math.floor(newQuantity / unitsPerPackage)
          const boxes = Math.floor(newQuantity / unitsPerBox)

          const newItems = newQuantity === 0
            ? state.items.filter(item => item.id !== product.id)
            : state.items.map(item =>
                item.id === product.id
                  ? { 
                      ...item, 
                      quantity: newQuantity,
                      packages,
                      boxes
                    }
                  : item
              )

          return {
            ...state,
            productQuantities: {
              ...state.productQuantities,
              [product.id]: newQuantity,
            },
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

      updateItemNote: (productId: string, note: string) =>
        set((state) => ({
          items: state.items.map(item =>
            item.id === productId
              ? { ...item, note }
              : item
          )
        })),
    }),
    {
      name: 'cart-storage',
    }
  )
) 