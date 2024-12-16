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

interface ProfileStore {
  store: Store
}

export async function getStores(): Promise<Store[]> {
  const { data: profileStores, error: profileStoresError } = await supabase
    .from('profile_stores')
    .select(`
      store:stores (
        id,
        name,
        description,
        subdescription,
        image_url,
        banner_image,
        categories (*)
      )
    `)
    .eq('profile_id', (await supabase.auth.getUser()).data.user?.id) as { data: ProfileStore[] | null, error: any }

  if (profileStoresError) {
    console.error('Error fetching stores:', profileStoresError)
    return []
  }

  return (profileStores || []).map(ps => ps.store)
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

export async function linkStoreToProfile(
  profileId: string,
  accessCode: string,
  accessPin: string
) {
  try {
    // 1. Buscar la tienda con el código y PIN proporcionados
    const { data: store, error: storeError } = await supabase
      .from('stores')
      .select('id')
      .eq('access_code', accessCode)
      .eq('access_pin', accessPin)
      .single()

    if (storeError || !store) {
      throw new Error('Código o PIN incorrectos')
    }

    // 2. Crear la relación en profile_stores
    const { error: linkError } = await supabase
      .from('profile_stores')
      .insert({
        profile_id: profileId,
        store_id: store.id
      })

    if (linkError) {
      // Si el error es por duplicado, no es realmente un error
      if (linkError.code === '23505') { // código de error único de PostgreSQL
        return { success: true, message: 'Ya tienes acceso a esta tienda' }
      }
      throw linkError
    }

    return { success: true, message: 'Tienda añadida correctamente' }
  } catch (err: unknown) {
    const error = err as Error
    console.error('Error linking store:', error)
    return { 
      success: false, 
      message: error.message || 'Error al vincular la tienda' 
    }
  }
} 