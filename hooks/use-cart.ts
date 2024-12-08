import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  storeName: string
}

interface CartStore {
  items: CartItem[]
  productQuantities: { [key: string]: number }
  addToCart: (product: Product, quantity: number) => void
  removeFromCart: (product: Product, quantity: number) => void
  clearCart: () => void
}

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      productQuantities: {},
      addToCart: (product, quantity) =>
        set((state) => {
          const existingQuantity = state.productQuantities[product.id] || 0
          const newQuantity = existingQuantity + quantity

          // Actualizar productQuantities
          const newProductQuantities = {
            ...state.productQuantities,
            [product.id]: newQuantity,
          }

          // Actualizar items
          const existingItem = state.items.find(item => item.id === product.id)
          const newItems = existingItem
            ? state.items.map(item =>
                item.id === product.id
                  ? { ...item, quantity: newQuantity }
                  : item
              )
            : [...state.items, {
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: newQuantity,
                image: product.imageUrl,
                storeName: product.storeName || 'Tienda'
              }]

          return {
            productQuantities: newProductQuantities,
            items: newItems
          }
        }),
      removeFromCart: (product, quantity) =>
        set((state) => {
          const existingQuantity = state.productQuantities[product.id] || 0
          const newQuantity = Math.max(0, existingQuantity - quantity)

          // Actualizar productQuantities
          const newProductQuantities = {
            ...state.productQuantities,
            [product.id]: newQuantity,
          }

          // Actualizar items
          const newItems = newQuantity === 0
            ? state.items.filter(item => item.id !== product.id)
            : state.items.map(item =>
                item.id === product.id
                  ? { ...item, quantity: newQuantity }
                  : item
              )

          return {
            productQuantities: newProductQuantities,
            items: newItems
          }
        }),
      clearCart: () => set({ items: [], productQuantities: {} }),
    }),
    {
      name: 'cart-storage',
    }
  )
) 