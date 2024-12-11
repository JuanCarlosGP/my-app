export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  note: string
  // ... otros campos
}

export const useCart = () => {
  // ... código existente

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