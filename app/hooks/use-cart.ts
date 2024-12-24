import { useState, useCallback } from 'react'
import { CartItem } from '../types/cart'
import { supabase } from '@/app/lib/supabase'
import { toast } from 'react-hot-toast'

export type { CartItem }

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null)

  const createNewOrder = async (storeId: string) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert([{
          store_id: storeId,
          status: 'draft'
        }])
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating new order:', error)
      toast.error('Error al crear nuevo pedido')
      return null
    }
  }

  const addItemToOrderItems = async (item: CartItem, orderId: string) => {
    try {
      const { error } = await supabase
        .from('order_items')
        .insert([{
          order_id: orderId,
          product_id: item.id,
          quantity: item.quantity,
          price_per_unit: item.price,
          note: item.note || null
        }])

      if (error) throw error
    } catch (error) {
      console.error('Error adding item to order:', error)
      throw error
    }
  }

  const addItem = useCallback(async (item: CartItem) => {
    try {
      // Si no hay items, crear nueva orden
      if (items.length === 0) {
        const newOrder = await createNewOrder(item.store_id)
        if (!newOrder) return
        
        // Añadir el item a order_items
        await addItemToOrderItems(item, newOrder.id)
      } else {
        // Obtener el pedido actual en draft
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .select('id')
          .eq('status', 'draft')
          .single()

        if (orderError) throw orderError
        
        // Añadir el item a order_items
        await addItemToOrderItems(item, orderData.id)
      }

      // Actualizar el estado local
      setItems(current => {
        const existingItem = current.find(i => i.id === item.id)
        
        if (existingItem) {
          return current.map(i => 
            i.id === item.id 
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          )
        }
        
        return [...current, item]
      })
      
      setSelectedStoreId(item.store_id)
    } catch (error) {
      console.error('Error adding item:', error)
      toast.error('Error al añadir el producto')
    }
  }, [items])

  const updateItemNote = useCallback(async (productId: string, note: string) => {
    try {
      // Obtener el pedido actual
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .select('id')
        .eq('status', 'draft')
        .single()

      if (orderError) throw orderError

      // Actualizar la nota en order_items
      const { error: updateError } = await supabase
        .from('order_items')
        .update({ note })
        .eq('order_id', orderData.id)
        .eq('product_id', productId)

      if (updateError) throw updateError

      // Actualizar estado local
      setItems(current => 
        current.map(item => 
          item.id === productId 
            ? { ...item, note } 
            : item
        )
      )
    } catch (error) {
      console.error('Error updating note:', error)
      toast.error('Error al actualizar la nota')
    }
  }, [])

  const clearCart = useCallback(() => {
    // Solo limpiamos el estado local
    setItems([])
    setSelectedStoreId(null)
  }, [])

  return {
    items,
    addItem,
    selectedStoreId,
    setSelectedStoreId,
    updateItemNote,
    clearCart,
  }
}