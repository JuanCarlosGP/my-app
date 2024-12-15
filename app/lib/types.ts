export interface Profile {
  id: string
  phone: string | null
  name: string | null
  wechat_id: string | null
  created_at: string
}

export interface Address {
  id: string
  profile_id: string
  name: string
  address: string
  phone: string
  nif: string
  postal_code: string
  city: string
  province: string
  email: string
  created_at: string
} 