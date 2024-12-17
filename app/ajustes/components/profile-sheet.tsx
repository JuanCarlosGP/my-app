import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { supabase } from '@/app/lib/supabase'
import { toast } from "react-hot-toast"
import { useAuth } from '@/app/providers/auth-provider'
import { useEffect, useState } from "react"

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  wechat_id: z.string().optional(),
  phone: z.string().min(9, {
    message: "El número de teléfono debe tener al menos 9 dígitos.",
  })
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

interface ProfileSheetProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  phoneNumber: string
  onProfileUpdate: () => Promise<void>
}

export function ProfileSheet({ isOpen, onOpenChange, phoneNumber, onProfileUpdate }: ProfileSheetProps) {
  const { session } = useAuth()
  const [loading, setLoading] = useState(true)
  const [isComplete, setIsComplete] = useState(true)
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      wechat_id: "",
      phone: phoneNumber || "",
    },
  })

  const checkFormCompleteness = (data: any) => {
    const complete = !!(data.name && data.phone && data.wechat_id)
    setIsComplete(complete)
    return complete
  }

  useEffect(() => {
    async function loadProfile() {
      if (session?.user?.id) {
        setLoading(true)
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select()
            .eq('id', session.user.id)
            .single()

          if (error) throw error

          if (data) {
            console.log('Datos cargados:', data)
            form.reset({
              name: data.name || "",
              wechat_id: data.wechat_id || "",
              phone: data.phone || ""
            })
            checkFormCompleteness(data)
          }
        } catch (error) {
          console.error('Error cargando perfil:', error)
          toast.error('Error al cargar el perfil')
        } finally {
          setLoading(false)
        }
      }
    }

    if (isOpen) {
      loadProfile()
    }
  }, [session?.user?.id, form, isOpen])

  async function onSubmit(data: ProfileFormValues) {
    try {
      if (!session?.user?.id) {
        throw new Error('No hay sesión de usuario')
      }

      console.log('Enviando datos:', data)

      const { error } = await supabase
        .from('profiles')
        .update({
          name: data.name,
          phone: data.phone,
          wechat_id: data.wechat_id || null
        })
        .eq('id', session.user.id)

      if (error) {
        console.error('Error de Supabase:', error)
        throw error
      }

      checkFormCompleteness(data)
      await onProfileUpdate()
      toast.success('Perfil actualizado correctamente')
      onOpenChange(false)
    } catch (error) {
      console.error('Error al guardar el perfil:', error)
      toast.error('Error al guardar el perfil')
    }
  }

  useEffect(() => {
    const subscription = form.watch((data) => {
      checkFormCompleteness(data)
    })
    return () => subscription.unsubscribe()
  }, [form.watch])

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent 
        side="right" 
        className="w-full h-full border-none lg:w-[540px] p-0"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="h-full flex flex-col">
            <SheetHeader className="p-6">
              <SheetTitle className="text-xl font-bold text-black">
                {loading ? 'Cargando...' : 'Editar perfil'}
              </SheetTitle>
              <SheetDescription className="text-gray-500">
                Modifica los datos de tu perfil aquí. Haz clic en guardar cuando termines.
              </SheetDescription>
            </SheetHeader>
            
            {loading ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto px-6">
                <div className="grid gap-4 py-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-4 items-center gap-4">
                        <FormLabel className="text-right text-gray-700">
                          Nombre
                        </FormLabel>
                        <div className="col-span-3">
                          <FormControl>
                            <Input 
                              placeholder="Tu nombre"
                              className="bg-white border-gray-200"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="wechat_id"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-4 items-center gap-4">
                        <FormLabel className="text-right text-gray-700">
                          WeChat ID
                        </FormLabel>
                        <div className="col-span-3">
                          <FormControl>
                            <Input 
                              placeholder="Tu WeChat ID"
                              className="bg-white border-gray-200"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-4 items-center gap-4">
                        <FormLabel className="text-right text-gray-700">
                          Teléfono
                        </FormLabel>
                        <div className="col-span-3">
                          <FormControl>
                            <Input 
                              type="tel"
                              placeholder="Tu número de teléfono"
                              className="bg-white border-gray-200"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            <SheetFooter className="p-6">
              <Button 
                type="submit"
                className="w-full"
                variant="default"
              >
                Guardar perfil
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
} 