import { supabase } from '@/app/lib/supabase'
import { Product } from '@/app/lib/db'

export async function getAllProducts(storeId: string): Promise<Product[]> {
  try {
    console.log('Fetching products for store:', storeId)

    if (!storeId || !storeId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)) {
      console.error('Invalid UUID format for store_id:', storeId)
      return []
    }

    const { data: products, error: productsError } = await supabase
      .from('products')
      .select(`
        *,
        category:categories!inner(
          id,
          store_id
        )
      `)
      .eq('category.store_id', storeId)

    if (productsError) {
      console.error('Error fetching products:', productsError)
      return []
    }

    const productsWithImages = products?.map(product => ({
      ...product,
      image_url: product.image_url 
        ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/${product.image_url}`
        : null
    })) || []

    console.log('Found products:', productsWithImages)
    return productsWithImages
  } catch (error) {
    console.error('Error in getAllProducts:', error)
    return []
  }
}
  