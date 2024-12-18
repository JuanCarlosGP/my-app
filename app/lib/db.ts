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
  name: string
  price: number
  units_per_box: number
  units_per_package: number
  image_url: string | null
  store_id: string
  reference: string | null
  barcode: string | null
  image: string | null
  note: string | null
}

interface ProfileStore {
  store: Store
}

interface StoreResponse {
  store: Store
}

export async function getStores(): Promise<Store[]> {
  const { data, error } = await supabase
    .from('profile_stores')
    .select(`
      store:stores (
        id,
        name,
        description,
        subdescription,
        image_url,
        banner_image
      )
    `)
    .eq('profile_id', (await supabase.auth.getUser()).data.user?.id)

  if (error) {
    console.error('Error fetching stores:', error)
    return []
  }

  const stores = data?.map(item => item.store as unknown as Store) || []
  
  const storesWithCategories = await Promise.all(
    stores.map(async (store) => {
      const { data: categories } = await supabase
        .from('categories')
        .select('*')
        .eq('store_id', store.id)

      return {
        ...store,
        categories: categories || []
      }
    })
  )

  return storesWithCategories
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
    .select(`
      *,
      category:categories(
        *,
        store:stores(*)
      )
    `)
    .eq('category_id', categoryId)

  if (error) {
    console.error('Error fetching products:', error)
    throw error
  }

  // Añadir store_id a cada producto
  return data.map(product => ({
    ...product,
    store_id: storeId
  }))
}

export async function getAllProducts(storeId: string) {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select(`
        id,
        products (
          id,
          category_id,
          name,
          price,
          units_per_box,
          units_per_package,
          reference,
          barcode,
          image_url,
          image,
          note
        )
      `)
      .eq('store_id', storeId)

    if (error) throw error

    const allProducts = data?.flatMap(category => 
      category.products.map(product => ({
        ...product,
        store_id: storeId
      }))
    ) || []

    return allProducts
  } catch (error) {
    console.error('Error in getAllProducts:', error)
    return []
  }
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
): Promise<{ success: boolean; message: string }> {
  try {
    // 1. Verificar el usuario actual
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    console.log('Usuario actual:', { user, userError })

    if (!user) throw new Error('No hay usuario autenticado')

    // 2. Buscar la tienda
    const { data: stores, error: storeError } = await supabase
      .from('stores')
      .select('*')
      .eq('access_code', accessCode)
      .eq('access_pin', accessPin)

    console.log('Búsqueda de tienda:', { stores, storeError })

    if (storeError) throw storeError
    if (!stores || stores.length === 0) {
      throw new Error('Código o PIN incorrectos')
    }

    const store = stores[0]
    console.log('Tienda encontrada:', store)

    // 3. Intentar crear la vinculación
    const insertData = {
      profile_id: user.id,
      store_id: store.id
    }
    console.log('Datos a insertar:', insertData)

    const { data: linkData, error: linkError } = await supabase
      .from('profile_stores')
      .insert([insertData])
      .select()

    console.log('Resultado de inserción:', { linkData, linkError })

    if (linkError) {
      if (linkError.code === '23505') {
        return { success: true, message: 'Ya tienes acceso a esta tienda' }
      }
      throw linkError
    }

    return { success: true, message: 'Tienda añadida correctamente' }
  } catch (err: unknown) {
    const error = err as { message?: string }
    console.error('Error completo:', error)
    return { 
      success: false, 
      message: error.message || 'Error al vincular la tienda' 
    }
  }
} 