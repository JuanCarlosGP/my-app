'use client'

import { useState, useEffect } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Store, Save } from "lucide-react"
import { supabase } from '@/app/lib/supabase'
import { toast } from 'react-hot-toast'
import { useAuth } from "@/app/providers/auth-provider"

interface StoreConfigSheetProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  storeId: string
}

export function StoreConfigSheet({ isOpen, onOpenChange, storeId }: StoreConfigSheetProps) {
  const { session } = useAuth()
  const [loading, setLoading] = useState(false)
  const [storeData, setStoreData] = useState({
    name: '',
    description: '',
    subdescription: '',
    access_code: '',
    access_pin: '',
    image_url: '',
    banner_image: ''
  })

  useEffect(() => {
    if (isOpen && storeId) {
      loadStoreData()
    }
  }, [isOpen, storeId])

  const loadStoreData = async () => {
    try {
      const { data, error } = await supabase
        .from('stores')
        .select('*')
        .eq('id', storeId)
        .single()

      if (error) throw error

      if (data) {
        setStoreData({
          name: data.name || '',
          description: data.description || '',
          subdescription: data.subdescription || '',
          access_code: data.access_code || '',
          access_pin: data.access_pin || '',
          image_url: data.image_url || '',
          banner_image: data.banner_image || ''
        })
      }
    } catch (error) {
      console.error('Error loading store:', error)
      toast.error('Error al cargar los datos de la tienda')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!session?.user?.id) {
        throw new Error('No hay sesión de usuario')
      }

      if (!storeData.name.trim()) {
        throw new Error('El nombre de la tienda es requerido')
      }

      if (!storeData.description.trim()) {
        throw new Error('La descripción corta es requerida')
      }

      const storeDataToSave = {
        ...storeData,
        access_code: storeData.access_code || Math.random().toString(36).substring(2, 8).toUpperCase(),
        access_pin: storeData.access_pin || Math.random().toString(36).substring(2, 8).toUpperCase(),
        image_url: storeData.image_url || null,
        banner_image: storeData.banner_image || null
      }

      if (storeId) {
        const { error } = await supabase
          .from('stores')
          .update(storeDataToSave)
          .eq('id', storeId)

        if (error) throw error
        toast.success('Tienda actualizada correctamente')
      } else {
        const { data, error } = await supabase
          .from('stores')
          .insert([{
            ...storeDataToSave,
            owner_id: session.user.id
          }])
          .select()

        if (error) throw error
        
        if (data?.[0]) {
          setStoreData(prev => ({
            ...prev,
            access_code: data[0].access_code,
            access_pin: data[0].access_pin
          }))
        }
        
        toast.success('Tienda creada correctamente')
      }

      // onOpenChange(false)
    } catch (error) {
      console.error('Error:', error)
      toast.error(error instanceof Error ? error.message : 'Error al guardar la tienda')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full lg:w-[800px] p-6">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold flex items-center gap-2">
            <Store className="h-6 w-6" />
            {storeId ? 'Configurar Tienda' : 'Crear Tienda'}
          </SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium">Nombre de la Tienda</label>
              <Input
                value={storeData.name}
                onChange={(e) => setStoreData({...storeData, name: e.target.value})}
                placeholder="Nombre de tu tienda"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Descripción Corta</label>
              <Input
                value={storeData.description}
                onChange={(e) => setStoreData({...storeData, description: e.target.value})}
                placeholder="Breve descripción de tu tienda"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Descripción Detallada</label>
              <Textarea
                value={storeData.subdescription}
                onChange={(e) => setStoreData({...storeData, subdescription: e.target.value})}
                placeholder="Descripción detallada de tu tienda"
                className="h-32"
              />
            </div>
          </div>

          <div className="space-y-6 pt-6 border-t">
            <h3 className="text-sm font-medium text-gray-700">Configuración Avanzada (Opcional)</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Código de Acceso</label>
                <Input
                  value={storeData.access_code}
                  onChange={(e) => setStoreData({...storeData, access_code: e.target.value})}
                  placeholder="Se generará automáticamente"
                  className="font-mono"
                />
                <p className="text-xs text-gray-500 mt-1">Dejar vacío para generar automáticamente</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">PIN de Acceso</label>
                <Input
                  value={storeData.access_pin}
                  onChange={(e) => setStoreData({...storeData, access_pin: e.target.value})}
                  placeholder="Se generará automáticamente"
                  className="font-mono"
                />
                <p className="text-xs text-gray-500 mt-1">Dejar vacío para generar automáticamente</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">URL del Logo</label>
                <Input
                  value={storeData.image_url}
                  onChange={(e) => setStoreData({...storeData, image_url: e.target.value})}
                  placeholder="URL de la imagen del logo"
                  type="url"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">URL del Banner</label>
                <Input
                  value={storeData.banner_image}
                  onChange={(e) => setStoreData({...storeData, banner_image: e.target.value})}
                  placeholder="URL de la imagen del banner"
                  type="url"
                />
              </div>
            </div>
          </div>

          {storeData.access_code && storeData.access_pin && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-medium text-green-800 mb-2">
                Códigos de acceso a tu tienda:
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-green-600">Código de Acceso:</p>
                  <p className="font-mono text-green-700 font-medium">{storeData.access_code}</p>
                </div>
                <div>
                  <p className="text-xs text-green-600">PIN de Acceso:</p>
                  <p className="font-mono text-green-700 font-medium">{storeData.access_pin}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-4 pt-6 sticky bottom-0 bg-white border-t p-4 -mx-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  {storeId ? 'Actualizando...' : 'Creando...'}
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {storeId ? 'Guardar Cambios' : 'Crear Tienda'}
                </>
              )}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
} 