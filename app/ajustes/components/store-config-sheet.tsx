'use client'

import { useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Store, ImagePlus } from "lucide-react"
import { supabase } from '@/app/lib/supabase'
import { toast } from 'react-hot-toast'

interface StoreConfigSheetProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  storeId: string
}

export function StoreConfigSheet({ isOpen, onOpenChange, storeId }: StoreConfigSheetProps) {
  const [loading, setLoading] = useState(false)
  const [storeData, setStoreData] = useState({
    name: '',
    description: '',
    subdescription: '',
    image_url: '',
    banner_image: '',
    access_code: '',
    access_pin: ''
  })

  const handleImageUpload = async (file: File, type: 'logo' | 'banner') => {
    const bucket = type === 'logo' ? 'CompanyLogo' : 'CompanyBanner'
    const path = `${type}_${storeId}`
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, { upsert: true })

    if (error) throw error
    
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(path)

    return publicUrl
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from('stores')
        .update(storeData)
        .eq('id', storeId)

      if (error) throw error
      
      toast.success('Tienda actualizada correctamente')
      onOpenChange(false)
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error al actualizar la tienda')
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
            Configuración de Tienda
          </SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Nombre de la Tienda</label>
                <Input
                  value={storeData.name}
                  onChange={(e) => setStoreData({...storeData, name: e.target.value})}
                  placeholder="Ej: Mi Tienda Premium"
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Descripción Corta</label>
                <Input
                  value={storeData.description}
                  onChange={(e) => setStoreData({...storeData, description: e.target.value})}
                  placeholder="Ej: Importación y venta al por mayor"
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Descripción Detallada</label>
                <Textarea
                  value={storeData.subdescription}
                  onChange={(e) => setStoreData({...storeData, subdescription: e.target.value})}
                  placeholder="Describe tu tienda en detalle..."
                  className="mt-1"
                  rows={4}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Código de Acceso</label>
                <Input
                  value={storeData.access_code}
                  onChange={(e) => setStoreData({...storeData, access_code: e.target.value})}
                  placeholder="Código para acceder a la tienda"
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">PIN de Acceso</label>
                <Input
                  value={storeData.access_pin}
                  onChange={(e) => setStoreData({...storeData, access_pin: e.target.value})}
                  placeholder="PIN para acceder a la tienda"
                  className="mt-1"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-2">Logo de la Tienda</label>
                  <div className="flex items-center gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('logo-upload')?.click()}
                    >
                      <ImagePlus className="h-4 w-4 mr-2" />
                      Subir Logo
                    </Button>
                    <input
                      id="logo-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={async (e) => {
                        if (e.target.files?.[0]) {
                          try {
                            const url = await handleImageUpload(e.target.files[0], 'logo')
                            setStoreData({...storeData, image_url: url})
                            toast.success('Logo subido correctamente')
                          } catch (error) {
                            toast.error('Error al subir el logo')
                          }
                        }
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium block mb-2">Banner de la Tienda</label>
                  <div className="flex items-center gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('banner-upload')?.click()}
                    >
                      <ImagePlus className="h-4 w-4 mr-2" />
                      Subir Banner
                    </Button>
                    <input
                      id="banner-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={async (e) => {
                        if (e.target.files?.[0]) {
                          try {
                            const url = await handleImageUpload(e.target.files[0], 'banner')
                            setStoreData({...storeData, banner_image: url})
                            toast.success('Banner subido correctamente')
                          } catch (error) {
                            toast.error('Error al subir el banner')
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
} 