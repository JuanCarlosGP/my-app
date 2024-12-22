export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  note: string | null
  store_name?: string
}
