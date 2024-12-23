'use client'

import { useState, useEffect } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2, ImagePlus, LayoutGrid, X } from "lucide-react"
import { supabase } from '@/app/lib/supabase'
import { toast } from 'react-hot-toast'
import Image from "next/image"

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

  const deleteOldImage = async (url: string) => {
    try {
      if (!url) return;

      const urlObject = new URL(url);
      const pathname = urlObject.pathname;
      const parts = pathname.split('/');
      const fileName = parts[parts.length - 1];

      if (!fileName) {
        console.error('No se pudo extraer el nombre del archivo de la URL:', url);
        return;
      }

      console.log('Intentando eliminar archivo:', fileName);

      const { error } = await supabase.storage
        .from('CompanyCategory')
        .remove([decodeURIComponent(fileName)]);

      if (error) {
        console.error('Error al eliminar imagen antigua:', error);
        throw error;
      } else {
        console.log('Archivo eliminado con éxito:', fileName);
      }
    } catch (error) {
      console.error('Error en deleteOldImage:', error);
      throw error;
    }
  };

  const handleImageUpload = async (file: File, oldImageUrl: string | null | undefined) => {
    try {
      if (!file.type.startsWith('image/')) {
        throw new Error('El archivo debe ser una imagen');
      }

      if (file.size > 5 * 1024 * 1024) {
        throw new Error('La imagen debe ser menor a 5MB');
      }

      // Si hay una imagen anterior y no es null, eliminarla
      if (oldImageUrl) {
        await deleteOldImage(oldImageUrl);
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `category-${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('CompanyCategory')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true,
          contentType: file.type
        });

      if (uploadError) {
        console.error('Error al subir imagen:', uploadError);
        throw uploadError;
      }
      
      const { data: { publicUrl } } = supabase.storage
        .from('CompanyCategory')
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      console.error('Error en handleImageUpload:', error);
      throw error;
    }
  };

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
    if (!confirm('¿Estás seguro de que quieres eliminar esta categoría?')) return;

    try {
      const category = categories.find(c => c.id === categoryId);
      
      // Primero eliminar la imagen si existe
      if (category?.image_url) {
        await deleteOldImage(category.image_url);
      }

      // Luego eliminar la categoría
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', categoryId);

      if (error) throw error;
      
      toast.success('Categoría eliminada correctamente');
      loadCategories();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al eliminar la categoría');
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full lg:w-[800px] p-6 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold flex items-center gap-2">
            <LayoutGrid className="h-6 w-6" />
            Gestionar Categorías
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6 pb-20">
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
                <div className="space-y-2">
                  <div className="relative">
                    {newCategory.image_url ? (
                      <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                        <Image
                          src={newCategory.image_url}
                          alt="Category preview"
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={async () => {
                            try {
                              if (newCategory.image_url) {
                                await deleteOldImage(newCategory.image_url);
                              }
                              setNewCategory({ ...newCategory, image_url: '' });
                              toast.success('Imagen eliminada correctamente');
                            } catch (error) {
                              console.error('Error al eliminar imagen:', error);
                              toast.error('Error al eliminar la imagen');
                            }
                          }}
                          className="absolute top-2 right-2 p-1 rounded-full bg-red-100 hover:bg-red-200"
                        >
                          <X className="h-4 w-4 text-red-600" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full aspect-video rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 cursor-pointer">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <ImagePlus className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">Haz clic para subir una imagen</p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={async (e) => {
                            if (e.target.files?.[0]) {
                              try {
                                setLoading(true);
                                const url = await handleImageUpload(
                                  e.target.files[0],
                                  editingCategory?.image_url || undefined
                                );
                                setNewCategory({ ...newCategory, image_url: url });
                                toast.success('Imagen subida correctamente');
                              } catch (error) {
                                console.error('Error:', error);
                                toast.error('Error al subir la imagen');
                              } finally {
                                setLoading(false);
                              }
                            }
                          }}
                        />
                      </label>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">Formato: JPG, PNG. Máximo 5MB</p>
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