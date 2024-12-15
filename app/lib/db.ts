import { supabase } from './supabase'

export interface Store {
  id: string
  name: string
  description: string | null
  subdescription: string | null
  image_url: string | null
  banner_image: string | null
  categories?: Category[]
}

export interface Category {
  id: string
  store_id: string
  name: string
  description: string | null
  subdescription: string | null
  image_url: string | null
}

export interface Product {
  id: string
  category_id: string
  store_id: string
  name: string
  price: number
  units_per_box: number
  units_per_package: number
  reference: string | null
  barcode: string | null
  image_url: string | null
  image: string | null
  note: string | null
}

export async function getStores() {
  const { data, error } = await supabase
    .from('stores')
    .select(`
      *,
      categories (
        *
      )
    `)
  
  if (error) {
    console.error('Error fetching stores:', error)
    return []
  }
  
  return data
}

export async function getStoreById(storeId: string) {
  const { data, error } = await supabase
    .from('stores')
    .select(`
      *,
      categories (
        *
      )
    `)
    .eq('id', storeId)
    .single()
  
  if (error) {
    console.error('Error fetching store:', error)
    return null
  }
  
  return data
}

export async function getCategoryProducts(storeId: string, categoryId: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('store_id', storeId)
    .eq('category_id', categoryId)
  
  if (error) {
    console.error('Error fetching category products:', error)
    return []
  }
  
  return data
}

export async function getAllProducts(storeId: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('store_id', storeId)
  
  if (error) {
    console.error('Error fetching all products:', error)
    return []
  }
  
  return data
}

export async function getCategories(storeId: string) {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('store_id', storeId)
  
  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }
  
  return data
} 