"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { Product } from '@/app/lib/db'
import { supabase } from '@/app/lib/supabase'
import { useAuth } from '@/app/providers/auth-provider'
import { toast } from 'react-hot-toast'

export interface Store {
  id: string
  name: string
}

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  note: string | null
  store_id: string
  store_name?: string
  category_id: string
  units_per_box: number
  units_per_package: number
  reference: string | null
  barcode: string | null
  image_url: string | null
}

interface OrderItemResponse {
  quantity: number
  note: string | null
  price_per_unit: number
  order_id: string
  product: {
    id: string
    name: string
    price: number
    units_per_box: number
    units_per_package: number
    reference: string | null
    barcode: string | null
    image_url: string | null
    note: string | null
    category_id: string
  }
}

interface OrderResponse {
  id: string
  store_id: string
  status: string
  total_amount: number
  store: {
    id: string
    name: string
  }
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
  getUniqueStores: () => Promise<Store[]>
}

export const CartContext = createContext<CartContextType>({} as CartContextType)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [currentOrder, setCurrentOrder] = useState<string | null>(null)
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null)
  const { session } = useAuth()

  // Cargar el pedido actual al iniciar
  useEffect(() => {
    let isMounted = true
    
    async function initializeCart() {
      if (session?.user?.id) {
        try {
          await loadCurrentOrder()
        } catch (error) {
          console.error('Error initializing cart:', error)
        }
      } else {
        if (isMounted) {
          setItems([])
          setCurrentOrder(null)
          setSelectedStoreId(null)
        }
      }
    }

    initializeCart()

    return () => {
      isMounted = false
    }
  }, [session?.user?.id])

  async function loadCurrentOrder() {
    try {
      console.log('Loading current order...')
      const userId = session?.user?.id
      console.log('Current userId:', userId)
      
      if (!userId) {
        console.log('No user ID found')
        return
      }
      
      // Consulta básica de orders
      const { data: orders, error: orderError } = await supabase
        .from('orders')
        .select(`
          id,
          store_id,
          status,
          total_amount,
          store:stores (
            id,
            name
          )
        `)
        .eq('profile_id', userId)
        .eq('status', 'draft')
        .order('created_at', { ascending: false })
        .limit(1)  // Tomamos la orden más reciente
        .single() as { data: OrderResponse | null, error: any }

      console.log('Raw orders response:', {
        data: orders,
        error: orderError,
        userId
      })

      if (orderError) {
        console.error('Order error details:', {
          code: orderError.code,
          message: orderError.message,
          details: orderError.details
        })
        if (orderError.code === 'PGRST116') {
          console.log('No draft order found')
          setItems([])
          return
        }
        throw orderError
      }

      if (orders) {
        const orderId = orders.id
        setCurrentOrder(orderId)
        setSelectedStoreId(orders.store_id)

        // Luego, obtener los items del pedido con toda la información del producto
        const { data: orderItems, error: itemsError } = await supabase
          .from('order_items')
          .select(`
            quantity,
            note,
            price_per_unit,
            order_id,
            product:products!inner (
              id,
              name,
              price,
              units_per_box,
              units_per_package,
              reference,
              barcode,
              image_url,
              note,
              category_id
            )
          `)
          .eq('order_id', orderId) as { data: OrderItemResponse[] | null, error: any }

        console.log('Raw orderItems from Supabase:', JSON.stringify(orderItems, null, 2))

        if (itemsError) {
          console.error('Error loading order items:', itemsError)
          throw itemsError
        }

        if (orderItems && Array.isArray(orderItems)) {
          const cartItems = orderItems.map((item) => {
            if (!item.product) {
              console.warn('Missing product data for item:', item)
              return null
            }
            const cartItem: CartItem = {
              id: item.product.id,
              name: item.product.name,
              price: item.price_per_unit || item.product.price,
              quantity: item.quantity || 1,
              note: item.note || null,
              store_id: orders.store_id,
              store_name: orders.store?.name,
              category_id: item.product.category_id,
              units_per_box: item.product.units_per_box,
              units_per_package: item.product.units_per_package,
              reference: item.product.reference || null,
              barcode: item.product.barcode || null,
              image_url: item.product.image_url || null
            }
            return cartItem
          }).filter((item): item is CartItem => item !== null)

          console.log('Processed cart items:', cartItems)
          setItems(cartItems)
        } else {
          console.warn('No order items found or invalid data:', orderItems)
          setItems([])
        }
      }
    } catch (error) {
      console.error('Error loading order:', error)
      if (error instanceof Error) {
        toast.error(`Error al cargar el pedido: ${error.message}`)
      } else {
        toast.error('Error al cargar el pedido')
      }
      setItems([])
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
        const orderId = data.id
        setCurrentOrder(orderId)
        return orderId
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

      // 3. Crear o actualizar item (sin límite por cajas)
      const { error: upsertError } = await supabase
        .from('order_items')
        .upsert({
          id: existingItem?.id || undefined,
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
              ? { ...item, quantity: newQuantity }
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

  const getUniqueStores = async () => {
    const storeIds = Array.from(new Set(items
      .filter(item => item.store_id && item.quantity > 0)
      .map(item => item.store_id)
    ))
    
    if (storeIds.length === 0) return []

    try {
      const { data: stores, error } = await supabase
        .from('stores')
        .select('id, name')
        .in('id', storeIds)

      if (error) {
        console.error('Error fetching store names:', error)
        return []
      }

      return stores as Store[]
    } catch (error) {
      console.error('Error in getUniqueStores:', error)
      return []
    }
  }

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateItemNote,
      productQuantities,
      clearCart,
      selectedStoreId,
      setSelectedStoreId,
      getUniqueStores
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