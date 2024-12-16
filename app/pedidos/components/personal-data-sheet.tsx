"use client"

import { Sheet, SheetContent, SheetHeader, SheetClose, SheetTitle } from "@/components/ui/sheet"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { supabase } from '@/app/lib/supabase'
import { useAuth } from '@/app/providers/auth-provider'
import { toast } from "react-hot-toast"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { type Address } from '@/app/lib/types'

const addressFormSchema = z.object({
  company_name: z.string().min(2, "El nombre de la empresa debe tener al menos 2 caracteres"),
  address: z.string().min(5, "La dirección debe tener al menos 5 caracteres"),
  phone: z.string().min(9, "El teléfono debe tener al menos 9 dígitos"),
  nif: z.string().min(9, "El NIF debe tener 9 caracteres"),
  postal_code: z.string().min(5, "El código postal debe tener 5 dígitos"),
  city: z.string().min(2, "La ciudad debe tener al menos 2 caracteres"),
  province: z.string().min(2, "La provincia debe tener al menos 2 caracteres"),
  email: z.string().email("Email no válido")
})

type AddressFormValues = z.infer<typeof addressFormSchema>

interface PersonalDataSheetProps {
  isOpen: boolean
  onClose: () => void
  onComplete?: () => void
  editingAddress?: Address | null
}

export function PersonalDataSheet({ isOpen, onClose, onComplete, editingAddress }: PersonalDataSheetProps) {
  const { session } = useAuth()
  const [loading, setLoading] = useState(true)

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      company_name: "",
      address: "",
      phone: "",
      nif: "",
      postal_code: "",
      city: "",
      province: "",
      email: ""
    }
  })

  useEffect(() => {
    async function loadAddress() {
      if (editingAddress) {
        setLoading(true)
        try {
          form.reset({
            company_name: editingAddress.company_name || "",
            address: editingAddress.address || "",
            phone: editingAddress.phone || "",
            nif: editingAddress.nif || "",
            postal_code: editingAddress.postal_code || "",
            city: editingAddress.city || "",
            province: editingAddress.province || "",
            email: editingAddress.email || ""
          })
        } catch (error) {
          console.error('Error cargando dirección:', error)
          toast.error('Error al cargar la dirección')
        } finally {
          setLoading(false)
        }
      } else {
        form.reset({
          company_name: "",
          address: "",
          phone: "",
          nif: "",
          postal_code: "",
          city: "",
          province: "",
          email: ""
        })
        setLoading(false)
      }
    }

    if (isOpen) {
      loadAddress()
    }
  }, [editingAddress, form, isOpen])

  async function onSubmit(data: AddressFormValues) {
    if (!session?.user?.id) {
      toast.error('Debes iniciar sesión')
      return
    }

    try {
      if (editingAddress) {
        const { error } = await supabase
          .from('addresses')
          .update({
            company_name: data.company_name,
            address: data.address,
            phone: data.phone,
            nif: data.nif,
            postal_code: data.postal_code,
            city: data.city,
            province: data.province,
            email: data.email
          })
          .eq('id', editingAddress.id)
          .eq('profile_id', session.user.id)

        if (error) throw error
        toast.success('Dirección actualizada correctamente')
      } else {
        const { error } = await supabase
          .from('addresses')
          .insert({
            profile_id: session.user.id,
            company_name: data.company_name,
            address: data.address,
            phone: data.phone,
            nif: data.nif,
            postal_code: data.postal_code,
            city: data.city,
            province: data.province,
            email: data.email
          })

        if (error) throw error
        toast.success('Dirección guardada correctamente')
      }

      onComplete?.()
      onClose()
    } catch (error) {
      console.error('Error al guardar la dirección:', error)
      toast.error('Error al guardar la dirección')
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md bg-[#f5f5f5] p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="h-full flex flex-col">
            <SheetHeader>
              <div className="sticky top-0 bg-white/70 backdrop-blur-md z-10">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-2">
                    <SheetClose className="p-2 hover:bg-gray-100 rounded-full">
                      <ArrowLeft className="h-6 w-6" />
                    </SheetClose>
                  </div>
                  
                  <SheetTitle className="font-semibold text-lg absolute left-1/2 -translate-x-1/2">
                    {editingAddress ? 'Editar Dirección' : 'Nueva Dirección'}
                  </SheetTitle>
                </div>
              </div>
            </SheetHeader>

            {loading ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto">
                <div className="p-4 space-y-4">
                  {/* Campos del formulario */}
                  <FormField
                    control={form.control}
                    name="company_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre Empresa *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Nombre de la empresa" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="nif"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>NIF *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="NIF de la empresa" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dirección *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Dirección completa" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="postal_code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Código Postal *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Código postal" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ciudad *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Ciudad" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="province"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Provincia *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Provincia" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teléfono *</FormLabel>
                        <FormControl>
                          <Input {...field} type="tel" placeholder="Número de teléfono" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" placeholder="Email de contacto" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            <div className="p-4 mt-auto">
              <Button type="submit" className="w-full" disabled={loading}>
                {editingAddress ? 'Guardar cambios' : 'Añadir dirección'}
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
} 