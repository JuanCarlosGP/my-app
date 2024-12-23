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
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Lock } from "lucide-react"

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
      <SheetContent side="right" className="w-full lg:w-[800px] p-6 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold flex items-center gap-2">
            <Store className="h-6 w-6" />
            {storeId ? 'Configurar Tienda' : 'Crear Tienda'}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6 pb-20">
          {/* Formulario de tienda */}
          <form id="store-form" onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">
              {storeId ? 'Editar Tienda' : 'Nueva Tienda'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Nombre</label>
                <Input
                  value={storeData.name}
                  onChange={(e) => setStoreData({...storeData, name: e.target.value})}
                  placeholder="Nombre de tu tienda"
                  className="mt-1"
                  required
                  autoFocus={false}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Descripción Corta</label>
                <Input
                  value={storeData.description}
                  onChange={(e) => setStoreData({...storeData, description: e.target.value})}
                  placeholder="Breve descripción de tu tienda"
                  className="mt-1"
                  required
                  autoFocus={false}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Descripción Detallada</label>
                <Textarea
                  value={storeData.subdescription}
                  onChange={(e) => setStoreData({...storeData, subdescription: e.target.value})}
                  placeholder="Descripción detallada de tu tienda..."
                  className="mt-1"
                  rows={3}
                  autoFocus={false}
                />
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Imágenes de la Tienda</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Input
                      value={storeData.image_url}
                      onChange={(e) => setStoreData({...storeData, image_url: e.target.value})}
                      placeholder="URL del logo"
                      type="url"
                    />
                    <p className="text-xs text-gray-500 mt-1">Logo de la tienda</p>
                  </div>
                  <div>
                    <Input
                      value={storeData.banner_image}
                      onChange={(e) => setStoreData({...storeData, banner_image: e.target.value})}
                      placeholder="URL del banner"
                      type="url"
                    />
                    <p className="text-xs text-gray-500 mt-1">Banner de la tienda</p>
                  </div>
                </div>
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="access-codes">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-blue-600" />
                      <span>Códigos de Acceso</span>
                      {storeData.access_code && storeData.access_pin && (
                        <Badge variant="secondary" className="ml-2">Configurados</Badge>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                      <div>
                        <Input
                          value={storeData.access_code}
                          onChange={(e) => setStoreData({...storeData, access_code: e.target.value})}
                          placeholder="Código de acceso"
                          className="font-mono"
                        />
                        <p className="text-xs text-gray-500 mt-1">Se generará automáticamente si se deja vacío</p>
                      </div>
                      <div>
                        <Input
                          value={storeData.access_pin}
                          onChange={(e) => setStoreData({...storeData, access_pin: e.target.value})}
                          placeholder="PIN de acceso"
                          className="font-mono"
                        />
                        <p className="text-xs text-gray-500 mt-1">Se generará automáticamente si se deja vacío</p>
                      </div>
                    </div>

                    {storeData.access_code && storeData.access_pin && (
                      <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Lock className="h-4 w-4 text-blue-600" />
                          <h4 className="text-sm font-medium text-blue-800">Códigos actuales:</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-blue-600">Código:</p>
                            <p className="font-mono text-blue-700 font-medium">{storeData.access_code}</p>
                          </div>
                          <div>
                            <p className="text-xs text-blue-600">PIN:</p>
                            <p className="font-mono text-blue-700 font-medium">{storeData.access_pin}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="flex justify-end gap-2 pt-4">
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
                  className="bg-blue-600 hover:bg-blue-700 text-white"
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
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  )
} 