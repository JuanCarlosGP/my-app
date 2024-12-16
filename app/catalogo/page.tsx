'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LoadingSpinner } from '@/app/components/loading'
import { supabase } from '@/app/lib/supabase'
import { useAuth } from '@/app/providers/auth-provider'
import { Store as StoreIcon } from "lucide-react"

export default function CatalogoPage() {
  const router = useRouter()
  const { session } = useAuth()
  const [loading, setLoading] = useState(true)
  const [hasStores, setHasStores] = useState(true)

  useEffect(() => {
    async function checkStores() {
      if (!session?.user?.id) {
        router.push('/login')
        return
      }

      try {
        const { data: stores, error } = await supabase
          .from('profile_stores')
          .select('store_id')
          .eq('profile_id', session.user.id)
          .limit(1)
          .single()

        if (error || !stores) {
          setHasStores(false)
        } else {
          router.push(`/catalogo/${stores.store_id}`)
        }
      } catch (error) {
        console.error('Error checking stores:', error)
        setHasStores(false)
      } finally {
        setLoading(false)
      }
    }

    checkStores()
  }, [router, session?.user?.id])

  if (loading) return <LoadingSpinner />

  if (!hasStores) {
    return (
      <div className="min-h-[calc(100vh-3.75rem)]">
        <div className="flex flex-col items-center justify-center h-[calc(100vh-3.75rem)] text-center px-4">
          <StoreIcon className="h-12 w-12 mb-4 text-gray-400" />
          <h1 className="text-xl font-semibold mb-2 text-gray-600">No hay tiendas disponibles</h1>
          <p className="text-gray-500">
            Añade una tienda desde la página principal para ver su catálogo
          </p>
        </div>
      </div>
    )
  }

  return null
}

