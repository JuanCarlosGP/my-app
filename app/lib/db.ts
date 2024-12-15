import { supabase } from './supabase'

export interface Store {
  id: string
  name: string
  description: string
  subdescription: string
  image_url: string
  banner_image: string
}

export interface Category {
  id: string
  store_id: string
  name: string
  description: string
  subdescription: string
  image_url: string
}

export interface Product {
  id: string
  category_id: string
  store_id: string
  name: string
  price: number
  units_per_box: number
  units_per_package: number
  reference: string
  barcode: string
  image_url: string
  image: string
  note?: string
}

export async function getStores() {
  const { data, error } = await supabase
    .from('stores')
    .select('*')
  
  if (error) throw error
  return data
}

export async function getStoreById(storeId: string) {
  const { data, error } = await supabase
    .from('stores')
    .select('*')
    .eq('id', storeId)
    .single()
  
  if (error) throw error
  return data
}

export async function getStoreCategories(storeId: string) {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('store_id', storeId)
  
  if (error) throw error
  return data
}

export async function getCategoryProducts(categoryId: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category_id', categoryId)
  
  if (error) throw error
  return data
}

export async function getAllStoreProducts(storeId: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('store_id', storeId)
  
  if (error) throw error
  return data
} 