'use client'

import { useState, useEffect } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2, ImagePlus, LayoutGrid } from "lucide-react"
import { supabase } from '@/app/lib/supabase'
import { toast } from 'react-hot-toast'

interface Category {
  id: string
  name: string
  description: string | null
  subdescription: string | null
  image_url: string | null
  store_id: string
}

interface CategoriesSheetProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  storeId: string
}

export function CategoriesSheet({ isOpen, onOpenChange, storeId }: CategoriesSheetProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    subdescription: '',
    image_url: ''
  })

  useEffect(() => {
    if (isOpen) {
      loadCategories()
    }
  }, [isOpen, storeId])

  const loadCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('store_id', storeId)
        .order('name')

      if (error) throw error
      setCategories(data || [])
    } catch (error) {
      console.error('Error loading categories:', error)
      toast.error('Error al cargar las categorías')
    }
  }

  const handleImageUpload = async (file: File) => {
    const path = `category_${Date.now()}`
    
    const { data, error } = await supabase.storage
      .from('CategoryImages')
      .upload(path, file, { upsert: true })

    if (error) throw error
    
    const { data: { publicUrl } } = supabase.storage
      .from('CategoryImages')
      .getPublicUrl(path)

    return publicUrl
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (editingCategory) {
        const { error } = await supabase
          .from('categories')
          .update({
            name: newCategory.name,
            description: newCategory.description || null,
            subdescription: newCategory.subdescription || null,
            image_url: newCategory.image_url || null
          })
          .eq('id', editingCategory.id)

        if (error) throw error
        toast.success('Categoría actualizada correctamente')
      } else {
        const { error } = await supabase
          .from('categories')
          .insert([{
            store_id: storeId,
            name: newCategory.name,
            description: newCategory.description || null,
            subdescription: newCategory.subdescription || null,
            image_url: newCategory.image_url || null
          }])

        if (error) throw error
        toast.success('Categoría creada correctamente')
      }

      setNewCategory({ name: '', description: '', subdescription: '', image_url: '' })
      setEditingCategory(null)
      loadCategories()
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error al guardar la categoría')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (categoryId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta categoría?')) return

    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', categoryId)

      if (error) throw error
      
      toast.success('Categoría eliminada correctamente')
      loadCategories()
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error al eliminar la categoría')
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full lg:w-[800px] p-6">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold flex items-center gap-2">
            <LayoutGrid className="h-6 w-6" />
            Gestionar Categorías
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Formulario de categoría */}
          <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">
              {editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Nombre</label>
                <Input
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  placeholder="Ej: Productos de Limpieza"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Descripción Corta</label>
                <Input
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                  placeholder="Breve descripción de la categoría"
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Descripción Detallada</label>
                <Textarea
                  value={newCategory.subdescription}
                  onChange={(e) => setNewCategory({...newCategory, subdescription: e.target.value})}
                  placeholder="Descripción detallada de la categoría..."
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Imagen de Categoría</label>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('category-image')?.click()}
                  >
                    <ImagePlus className="h-4 w-4 mr-2" />
                    Subir Imagen
                  </Button>
                  <input
                    id="category-image"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={async (e) => {
                      if (e.target.files?.[0]) {
                        try {
                          const url = await handleImageUpload(e.target.files[0])
                          setNewCategory({...newCategory, image_url: url})
                          toast.success('Imagen subida correctamente')
                        } catch (error) {
                          toast.error('Error al subir la imagen')
                        }
                      }
                    }}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                {editingCategory && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setEditingCategory(null)
                      setNewCategory({ name: '', description: '', subdescription: '', image_url: '' })
                    }}
                  >
                    Cancelar
                  </Button>
                )}
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? 'Guardando...' : editingCategory ? 'Actualizar' : 'Crear Categoría'}
                </Button>
              </div>
            </div>
          </form>

          {/* Lista de categorías */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categorías Existentes</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-4 bg-white rounded-lg border"
                >
                  <div>
                    <h4 className="font-medium">{category.name}</h4>
                    {category.description && (
                      <p className="text-sm text-gray-500">{category.description}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingCategory(category)
                        setNewCategory({
                          name: category.name,
                          description: category.description || '',
                          subdescription: category.subdescription || '',
                          image_url: category.image_url || ''
                        })
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(category.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
} 