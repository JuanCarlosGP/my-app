import { Product } from '@/app/lib/db'

export function getAllProducts(storeId: string): Product[] {
  return products.map(p => ({
    id: p.id,
    category_id: '',  // Añadir los campos requeridos
    name: p.name,
    price: p.price,
    units_per_box: p.unitsPerBox,
    units_per_package: p.unitsPerPackage,
    image_url: p.imageUrl,
    store_id: p.storeId,
    reference: p.reference,
    barcode: p.barcode,
    image: p.image,
    note: p.note || null
  }))
}
  