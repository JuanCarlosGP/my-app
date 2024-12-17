export interface Profile {
  id: string
  phone: string | null
  name: string | null
  wechat_id: string | null
  created_at: string
  is_seller: boolean
}

export type Address = {
  id: string
  profile_id: string
  created_at: string
  company_name: string
  address: string
  phone: string
  nif: string
  postal_code: string
  city: string
  province: string
  email: string
} 