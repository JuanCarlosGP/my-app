"use client"

import { createContext, useContext, useState, ReactNode } from 'react'

interface CartContextType {
  productQuantities: { [key: string]: number }
  addProduct: (productId: string, unitsPerBox: number) => void
  removeProduct: (productId: string, unitsPerBox: number) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [productQuantities, setProductQuantities] = useState<{ [key: string]: number }>({})

  const addProduct = (productId: string, unitsPerBox: number) => {
    setProductQuantities(prev => {
      const currentQuantity = prev[productId] || 0
      return {
        ...prev,
        [productId]: currentQuantity + unitsPerBox
      }
    })
  }

  const removeProduct = (productId: string, unitsPerBox: number) => {
    setProductQuantities(prev => {
      const currentQuantity = prev[productId] || 0
      const newQuantity = Math.max(0, currentQuantity - unitsPerBox)
      
      if (newQuantity === 0) {
        const { [productId]: _, ...rest } = prev
        return rest
      }
      
      return {
        ...prev,
        [productId]: newQuantity
      }
    })
  }

  return (
    <CartContext.Provider value={{ productQuantities, addProduct, removeProduct }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
} 