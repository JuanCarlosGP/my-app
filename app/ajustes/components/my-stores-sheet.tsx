"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { ArrowLeft, Trash2 } from "lucide-react"
import { useState, useEffect } from "react"
import { supabase } from '@/app/lib/supabase'
import { useAuth } from '@/app/providers/auth-provider'
import { toast } from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { Store } from "@/app/lib/db"

interface MyStoresSheetProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function MyStoresSheet({ isOpen, onOpenChange }: MyStoresSheetProps) {
  const { session } = useAuth()
  const [stores, setStores] = useState<Store[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStores()
  }, [session?.user?.id])

  async function loadStores() {
    if (!session?.user?.id) return

    try {
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
        .eq('profile_id', session.user.id)

      if (error) throw error

      setStores(data?.map(item => item.store as unknown as Store) || [])
    } catch (error) {
      console.error('Error loading stores:', error)
      toast.error('Error al cargar las tiendas')
    } finally {
      setLoading(false)
    }
  }

  async function removeStore(storeId: string) {
    if (!session?.user?.id) return

    try {
      const { error } = await supabase
        .from('profile_stores')
        .delete()
        .eq('profile_id', session.user.id)
        .eq('store_id', storeId)

      if (error) throw error

      setStores(stores.filter(store => store.id !== storeId))
      toast.success('Tienda eliminada correctamente')
    } catch (error) {
      console.error('Error removing store:', error)
      toast.error('Error al eliminar la tienda')
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md bg-[#f5f5f5] p-0">
        <SheetHeader>
          <div className="sticky top-0 bg-white/70 backdrop-blur-md z-10">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2">
                <SheetClose className="p-2 hover:bg-gray-100 rounded-full">
                  <ArrowLeft className="h-6 w-6" />
                </SheetClose>
              </div>
              
              <SheetTitle className="font-semibold text-lg absolute left-1/2 -translate-x-1/2">
                Mis Tiendas
              </SheetTitle>
            </div>
          </div>
        </SheetHeader>

        <div className="p-4">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : stores.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No tienes tiendas guardadas</p>
              <p className="text-sm mt-1">Usa el botón + en la página principal para añadir tiendas</p>
            </div>
          ) : (
            <div className="space-y-4">
              {stores.map((store) => (
                <div 
                  key={store.id} 
                  className="bg-white p-4 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-medium">{store.name}</h3>
                    {store.description && (
                      <p className="text-sm text-gray-500">{store.description}</p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => removeStore(store.id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
} 