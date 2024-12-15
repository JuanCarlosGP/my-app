import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from "@/app/lib/db"

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  packages?: number
  boxes?: number
  note?: string
  storeName: string
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
          const storeId = product.store_id

          const unitsPerPackage = product.units_per_package
          const unitsPerBox = product.units_per_box
          
          const packages = Math.floor(newQuantity / unitsPerPackage)
          const boxes = Math.floor(newQuantity / unitsPerBox)

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
                      storeId: product.store_id,
                      storeName: product.store_id
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
                image: product.image_url || '',
                storeId: product.store_id,
                storeName: product.store_id || 'Tienda'
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
          
          const unitsPerPackage = product.units_per_package || 12
          const unitsPerBox = product.units_per_box || 48
          
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
        const storesMap = new Map()
        
        items.forEach(item => {
          if (item.quantity > 0) {
            const storeId = item.id.split('-')[1]
            storesMap.set(storeId, {
              id: storeId,
              name: item.storeName
            })
          }
        })

        return Array.from(storesMap.values())
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