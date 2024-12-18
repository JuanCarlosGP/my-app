"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { Product } from '@/app/lib/db'
import { supabase } from '@/app/lib/supabase'
import { useAuth } from '@/app/providers/auth-provider'
import { toast } from 'react-hot-toast'

interface CartItem extends Product {
  quantity: number
  note: string | null
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product, quantity: number, note?: string) => Promise<void>
  removeFromCart: (product: Product, quantity: number) => Promise<void>
  updateItemNote: (productId: string, note: string) => Promise<void>
  productQuantities: { [key: string]: number }
  clearCart: () => Promise<void>
  selectedStoreId: string | null
  setSelectedStoreId: (storeId: string | null) => void
}

export const CartContext = createContext<CartContextType>({} as CartContextType)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [currentOrder, setCurrentOrder] = useState<string | null>(null)
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null)
  const { session } = useAuth()

  // Cargar el pedido actual al iniciar
  useEffect(() => {
    if (session?.user?.id) {
      loadCurrentOrder()
    }
  }, [session?.user?.id])

  async function loadCurrentOrder() {
    try {
      console.log('Loading current order...')
      const { data: orders, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('profile_id', session!.user.id)
        .eq('status', 'draft')

      if (orderError) {
        console.error('Error loading order:', orderError)
        return
      }

      // Tomar el pedido más reciente si existe
      const order = orders?.[0]
      if (order) {
        console.log('Found draft order:', order)
        setCurrentOrder(order.id)

        // Cargar los items del pedido
        const { data: orderItems, error: itemsError } = await supabase
          .from('order_items')
          .select(`
            *,
            product:products(*)
          `)
          .eq('order_id', order.id)

        if (itemsError) {
          console.error('Error loading order items:', itemsError)
          return
        }

        console.log('Loaded order items:', orderItems)
        const cartItems = orderItems?.map(item => ({
          ...item.product,
          quantity: item.quantity,
          note: item.note
        })) || []

        setItems(cartItems)
      }
    } catch (error) {
      console.error('Error in loadCurrentOrder:', error)
    }
  }

  async function ensureOrderExists(storeId: string) {
    try {
      console.log('Ensuring order exists for store:', storeId)
      
      if (!currentOrder) {
        const { data, error } = await supabase
          .from('orders')
          .insert({
            profile_id: session!.user.id,
            store_id: storeId,
            status: 'draft',
            total_amount: 0
          })
          .select()
          .single()

        if (error) {
          console.error('Error creating order:', error)
          throw error
        }

        console.log('Created new order:', data)
        setCurrentOrder(data.id)
        return data.id
      }

      console.log('Using existing order:', currentOrder)
      return currentOrder
    } catch (error) {
      console.error('Error in ensureOrderExists:', error)
      throw error
    }
  }

  const addToCart = async (product: Product, quantity: number, note?: string) => {
    try {
      if (!session?.user?.id) {
        console.error('No user session found')
        toast.error('Debes iniciar sesión para añadir productos')
        return
      }

      // 1. Obtener o crear orden
      const orderId = await ensureOrderExists(product.store_id)
      console.log('Using order:', orderId)

      // 2. Verificar si el item ya existe
      const { data: existingItems, error: searchError } = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', orderId)
        .eq('product_id', product.id)

      if (searchError) {
        console.error('Error checking existing item:', searchError)
        throw searchError
      }

      const existingItem = existingItems?.[0]
      const newQuantity = (existingItem?.quantity || 0) + quantity

      // 3. Crear o actualizar item
      const { error: upsertError } = await supabase
        .from('order_items')
        .upsert({
          order_id: orderId,
          product_id: product.id,
          quantity: newQuantity,
          price_per_unit: product.price,
          note: note || null
        })

      if (upsertError) {
        console.error('Error upserting item:', upsertError)
        throw upsertError
      }

      // 4. Actualizar estado local
      setItems(prevItems => {
        const existingIndex = prevItems.findIndex(item => item.id === product.id)
        if (existingIndex >= 0) {
          return prevItems.map((item, index) => 
            index === existingIndex 
              ? { ...item, quantity: newQuantity, note: note || null }
              : item
          )
        }
        return [...prevItems, { ...product, quantity, note: note || null }]
      })

      toast.success('Producto añadido al carrito')
    } catch (error) {
      console.error('Error in addToCart:', error)
      toast.error('Error al añadir el producto')
      throw error
    }
  }

  const removeFromCart = async (product: Product, quantity: number) => {
    try {
      if (!session?.user?.id) {
        console.error('No user session found')
        return
      }

      const existingItem = items.find(item => item.id === product.id)
      if (!existingItem || !currentOrder) return

      const newQuantity = existingItem.quantity - quantity
      
      if (newQuantity <= 0) {
        // Eliminar el item de la base de datos
        const { error } = await supabase
          .from('order_items')
          .delete()
          .eq('order_id', currentOrder)
          .eq('product_id', product.id)

        if (error) {
          console.error('Error deleting item:', error)
          throw error
        }

        // Actualizar estado local
        setItems(items.filter(item => item.id !== product.id))
        toast.success('Producto eliminado del carrito')
      } else {
        // Actualizar cantidad en la base de datos
        const { error } = await supabase
          .from('order_items')
          .update({ quantity: newQuantity })
          .eq('order_id', currentOrder)
          .eq('product_id', product.id)

        if (error) {
          console.error('Error updating quantity:', error)
          throw error
        }

        // Actualizar estado local
        setItems(items.map(item => 
          item.id === product.id 
            ? { ...item, quantity: newQuantity }
            : item
        ))
        toast.success('Cantidad actualizada')
      }
    } catch (error) {
      console.error('Error in removeFromCart:', error)
      toast.error('Error al actualizar el carrito')
      throw error
    }
  }

  const updateItemNote = async (productId: string, note: string) => {
    try {
      if (!currentOrder) return

      const { error } = await supabase
        .from('order_items')
        .update({ note })
        .eq('order_id', currentOrder)
        .eq('product_id', productId)

      if (error) throw error
      setItems(items.map(item => 
        item.id === productId 
          ? { ...item, note }
          : item
      ))
    } catch (error) {
      console.error('Error updating note:', error)
      toast.error('Error al actualizar la nota')
    }
  }

  const clearCart = async () => {
    try {
      if (!currentOrder) return

      const { error } = await supabase
        .from('order_items')
        .delete()
        .eq('order_id', currentOrder)

      if (error) throw error
      setItems([])
    } catch (error) {
      console.error('Error clearing cart:', error)
      toast.error('Error al limpiar el carrito')
    }
  }

  const productQuantities = items.reduce((acc, item) => {
    acc[item.id] = item.quantity
    return acc
  }, {} as { [key: string]: number })

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateItemNote,
      productQuantities,
      clearCart,
      selectedStoreId,
      setSelectedStoreId
    }}>
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