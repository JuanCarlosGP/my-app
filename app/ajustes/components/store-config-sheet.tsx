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
import { UploadCloud, X } from "lucide-react"
import Image from "next/image"

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

      // Verificar que el usuario es vendedor
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('is_seller')
        .single()

      if (profileError || !profile?.is_seller) {
        throw new Error('No tienes permisos para gestionar tiendas')
      }

      if (!storeData.name.trim()) {
        throw new Error('El nombre de la tienda es requerido')
      }

      if (!storeData.description.trim()) {
        throw new Error('La descripción corta es requerida')
      }

      const storeDataToSave = {
        ...storeData,
        owner_id: session.user.id,
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

  const uploadImage = async (file: File, bucket: 'CompanyLogo' | 'CompanyBanner', storeId: string) => {
    try {
      // Verificar que el usuario es vendedor
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('is_seller')
        .single()

      if (profileError || !profile?.is_seller) {
        throw new Error('No tienes permisos para subir imágenes')
      }

      const fileExt = file.name.split('.').pop()
      const fileName = `${storeId}-${Date.now()}.${fileExt}`
      const filePath = `${fileName}`

      if (!file.type.startsWith('image/')) {
        throw new Error('El archivo debe ser una imagen')
      }

      // Subir la imagen
      const { error: uploadError, data } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
          contentType: file.type
        })

      if (uploadError) {
        console.error('Error de Supabase:', uploadError)
        throw new Error('Error al subir la imagen')
      }

      // Obtener la URL pública
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath)

      return publicUrl
    } catch (error) {
      console.error('Error en uploadImage:', error)
      throw error instanceof Error ? error : new Error('Error al subir la imagen')
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
                  {/* Logo Upload */}
                  <div className="space-y-2">
                    <div className="relative">
                      {storeData.image_url ? (
                        <div className="relative aspect-square w-full overflow-hidden rounded-lg border">
                          <Image
                            src={storeData.image_url}
                            alt="Logo preview"
                            fill
                            className="object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => setStoreData({ ...storeData, image_url: '' })}
                            className="absolute top-2 right-2 p-1 rounded-full bg-red-100 hover:bg-red-200"
                          >
                            <X className="h-4 w-4 text-red-600" />
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-full aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 cursor-pointer">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <UploadCloud className="h-8 w-8 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500">Logo de la tienda</p>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={async (e) => {
                              try {
                                const file = e.target.files?.[0]
                                if (!file) return
                                
                                if (file.size > 5 * 1024 * 1024) {
                                  toast.error('La imagen debe ser menor a 5MB')
                                  return
                                }

                                setLoading(true)
                                const publicUrl = await uploadImage(file, 'CompanyLogo', storeId)
                                setStoreData({ ...storeData, image_url: publicUrl })
                                toast.success('Logo subido correctamente')
                              } catch (error) {
                                console.error('Error uploading logo:', error)
                                toast.error('Error al subir el logo')
                              } finally {
                                setLoading(false)
                              }
                            }}
                          />
                        </label>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">Formato: JPG, PNG. Máximo 5MB</p>
                  </div>

                  {/* Banner Upload */}
                  <div className="space-y-2">
                    <div className="relative">
                      {storeData.banner_image ? (
                        <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                          <Image
                            src={storeData.banner_image}
                            alt="Banner preview"
                            fill
                            className="object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => setStoreData({ ...storeData, banner_image: '' })}
                            className="absolute top-2 right-2 p-1 rounded-full bg-red-100 hover:bg-red-200"
                          >
                            <X className="h-4 w-4 text-red-600" />
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-full aspect-video rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 cursor-pointer">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <UploadCloud className="h-8 w-8 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500">Banner de la tienda</p>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={async (e) => {
                              try {
                                const file = e.target.files?.[0]
                                if (!file) return
                                
                                if (file.size > 5 * 1024 * 1024) {
                                  toast.error('La imagen debe ser menor a 5MB')
                                  return
                                }

                                setLoading(true)
                                const publicUrl = await uploadImage(file, 'CompanyBanner', storeId)
                                setStoreData({ ...storeData, banner_image: publicUrl })
                                toast.success('Banner subido correctamente')
                              } catch (error) {
                                console.error('Error uploading banner:', error)
                                toast.error('Error al subir el banner')
                              } finally {
                                setLoading(false)
                              }
                            }}
                          />
                        </label>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">Formato: JPG, PNG. Máximo 5MB</p>
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