'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Download, Upload, ArrowLeft, ArrowRight, FileEdit, Save, Store, ArrowDown, MessageSquare, LayoutGrid } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { useAuth } from "@/app/providers/auth-provider"
import { supabase } from '@/app/lib/supabase'
import { toast } from 'react-hot-toast'
import { StoreConfigSheet } from './store-config-sheet'
import { CategoriesSheet } from './categories-sheet'

interface StoreSettingsSheetProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function StoreSettingsSheet({ isOpen, onOpenChange }: StoreSettingsSheetProps) {
  const { session } = useAuth()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [store, setStore] = useState<{
    id: string;
    name: string;
    description: string | null;
    owner_id: string;
  } | null>(null)
  const [showStoreConfigSheet, setShowStoreConfigSheet] = useState(false)
  const [showCategoriesSheet, setShowCategoriesSheet] = useState(false)

  useEffect(() => {
    if (isOpen && session?.user?.id) {
      loadStore()
    }
  }, [isOpen, session?.user?.id])

  const loadStore = async () => {
    setLoading(true)
    setError(null)

    try {
      if (!session?.user?.id) {
        throw new Error('No hay sesión de usuario')
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('is_seller')
        .eq('id', session.user.id)
        .single()

      if (profileError) throw profileError

      if (!profile?.is_seller) {
        setStore(null)
        setError('No tienes permisos de vendedor')
        return
      }

      const { data: storeData, error: storeError } = await supabase
        .from('stores')
        .select('*')
        .eq('owner_id', session.user.id)
        .single()

      console.log('Store data:', storeData)

      if (storeError) {
        if (storeError.code === 'PGRST116') {
          setStore(null)
          return
        }
        throw storeError
      }

      setStore(storeData)

    } catch (err) {
      console.error('Error loading store:', err)
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar la tienda'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Manejar archivos
      console.log(e.dataTransfer.files)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent 
        side="right" 
        className="w-full h-full border-none lg:w-[800px] p-0 md:p-6 bg-white"
      >
        <div className="h-full flex flex-col">
          <SheetHeader className="p-6 md:p-0">
            <SheetTitle className="text-xl font-bold text-black">
              Configuración de Tienda
            </SheetTitle>
            <SheetDescription className="text-gray-500">
              Gestiona tu catálogo y configuración de tienda
            </SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto px-6 md:px-0">
            <div className="space-y-6 py-6">
              {/* Sección de Configuración Básica */}
              <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Configuración Básica</h3>
                {loading ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                  </div>
                ) : error ? (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-6">
                      <p className="text-sm text-gray-500">
                        Configura los detalles de tu tienda y gestiona las categorías de productos.
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <Button 
                        className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                        onClick={() => setShowStoreConfigSheet(true)}
                      >
                        <Store className="mr-2 h-4 w-4" />
                        Configurar Tienda
                      </Button>

                      <Button 
                        className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
                        onClick={() => setShowCategoriesSheet(true)}
                      >
                        <LayoutGrid className="mr-2 h-4 w-4" />
                        Gestionar Categorías
                      </Button>
                    </div>
                  </>
                )}
              </div>

              {/* Sección de Plantilla CSV */}
              <div className="bg-[#f9fafb] rounded-lg p-6 shadow-sm border">
                <h3 className="text-lg font-semibold mb-2">Plantilla CSV</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Descarga nuestra plantilla CSV para ver el formato correcto de importación de productos.
                </p>
                <Button className="w-full sm:w-auto" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Descargar Plantilla
                </Button>
              </div>

              {/* Sección de Importación */}
              <div className="bg-[#f9fafb] rounded-lg p-6 shadow-sm border">
                <h3 className="text-lg font-semibold mb-2">Importar Productos</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Arrastra tu archivo CSV o haz clic para seleccionarlo.
                </p>
                
                <div
                  className={cn(
                    "border-2 border-dashed rounded-lg p-8 transition-colors",
                    "hover:bg-gray-50 cursor-pointer text-center",
                    dragActive ? "border-blue-500 bg-blue-50" : "border-gray-200"
                  )}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Upload className={cn(
                      "h-10 w-10 transition-colors",
                      dragActive ? "text-blue-500" : "text-gray-400"
                    )} />
                    <p className="text-sm font-medium">
                      {dragActive ? "Suelta el archivo aquí" : "Arrastra y suelta tu archivo CSV"}
                    </p>
                    <p className="text-xs text-gray-500">
                      o haz clic para seleccionar
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept=".csv"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        // Manejar archivo
                        console.log(e.target.files[0])
                      }
                    }}
                  />
                </div>
              </div>

              {/* Backup Section */}
              <div className="bg-[#f9fafb] rounded-lg p-6 shadow-sm border">
                <h3 className="text-lg font-semibold mb-2">Copia de Seguridad</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Descarga una copia de tu catálogo actual para futuras modificaciones y mantén un respaldo de tu tienda.
                </p>
                <Button className="w-full sm:w-auto" variant="outline">
                  <Save className="mr-2 h-4 w-4" />
                  Descargar mi tienda
                </Button>
              </div>

              {/* Roadmap */}
              <div className="bg-[#f9fafb] rounded-lg p-8 shadow-sm border">
                <h3 className="text-xl font-bold mb-6 text-center">Proceso de Importación</h3>
                <div className="flex flex-col gap-8 max-w-2xl mx-auto">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <Download className="h-10 w-10 text-blue-600" />
                    </div>
                    <div className="text-center md:text-left">
                      <span className="text-lg font-semibold block mb-2">1. Descarga la Plantilla</span>
                      <p className="text-gray-600">
                        Obtén nuestra plantilla CSV con el formato correcto. Esta plantilla incluye todas las columnas necesarias para tus productos: nombres, precios, categorías, descripciones y más.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <ArrowDown className="h-8 w-8 text-gray-400" />
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <FileEdit className="h-10 w-10 text-green-600" />
                    </div>
                    <div className="text-center md:text-left">
                      <span className="text-lg font-semibold block mb-2">2. Edita el Archivo</span>
                      <p className="text-gray-600">
                        Rellena la plantilla con la información de tus productos. Puedes usar Excel o cualquier editor de hojas de cálculo. Asegúrate de mantener el formato de las columnas y guardar como CSV.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <ArrowDown className="h-8 w-8 text-gray-400" />
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                      <Upload className="h-10 w-10 text-purple-600" />
                    </div>
                    <div className="text-center md:text-left">
                      <span className="text-lg font-semibold block mb-2">3. Importa tus Productos</span>
                      <p className="text-gray-600">
                        Sube el archivo CSV completado a través de nuestra herramienta de importación. El sistema procesará automáticamente todos tus productos y los organizará en tu catálogo.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <ArrowDown className="h-8 w-8 text-gray-400" />
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                      <Store className="h-10 w-10 text-orange-600" />
                    </div>
                    <div className="text-center md:text-left">
                      <span className="text-lg font-semibold block mb-2">4. ¡Tu Tienda Lista!</span>
                      <p className="text-gray-600">
                        Tu catálogo estará actualizado y listo para usar. Podrás ver todos tus productos organizados y comenzar a vender inmediatamente. Guarda una copia de tu CSV para futuras actualizaciones.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ayuda Adicional */}
              <div className="bg-[#f9fafb] rounded-lg p-8 shadow-sm border">
                <h3 className="text-xl font-bold mb-6 text-center">¿Necesitas ayuda?</h3>
                <div className="space-y-8">
                  <div className="bg-white rounded-lg p-6 border">
                    <h4 className="text-lg font-semibold mb-3">Ver Tienda de Ejemplo</h4>
                    <p className="text-gray-600 mb-4">
                      ¿Quieres ver cómo quedará tu tienda? Usa estos datos de acceso para ver una tienda completamente configurada:
                    </p>
                    <div className="bg-blue-50 p-4 rounded-lg mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">Código de tienda:</span>
                        <span className="font-mono text-blue-600">12345</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">PIN de tienda:</span>
                        <span className="font-mono text-blue-600">12345</span>
                      </div>
                    </div>
                    <Button className="w-full sm:w-auto" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Descargar CSV de ejemplo
                    </Button>
                  </div>

                  <div className="bg-white rounded-lg p-6 border">
                    <h4 className="text-lg font-semibold mb-3">Soporte Técnico</h4>
                    <p className="text-gray-600 mb-4">
                      ¿Tienes dudas sobre cómo configurar tu tienda? Nuestro equipo de soporte está aquí para ayudarte en cada paso del proceso.
                    </p>
                    <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Contactar con Soporte
                    </Button>
                  </div>
                </div>
              </div>

              {/* Aquí irán más secciones de configuración */}
            </div>
          </div>
        </div>

        {/* Sheets adicionales */}
        <StoreConfigSheet 
          isOpen={showStoreConfigSheet}
          onOpenChange={setShowStoreConfigSheet}
          storeId={store?.id || ''}
        />
        <CategoriesSheet
          isOpen={showCategoriesSheet}
          onOpenChange={setShowCategoriesSheet}
          storeId={store?.id || ''}
        />
      </SheetContent>
    </Sheet>
  )
} 