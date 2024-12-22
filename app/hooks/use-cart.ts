import { useState, useCallback } from 'react'
import { CartItem } from '../types/cart'

export type { CartItem }

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([])

  const updateItemNote = useCallback((productId: string, note: string) => {
    setItems(current => 
      current.map(item => 
        item.id === productId 
          ? { ...item, note } 
          : item
      )
    )
  }, [])

  // ... resto del código existente

  return {
    // ... otros returns
    updateItemNote,
  }
}