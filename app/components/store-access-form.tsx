"use client"

import { useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { linkStoreToProfile } from '@/app/lib/db'
import { useAuth } from '@/app/providers/auth-provider'
import { toast } from 'react-hot-toast'

const formSchema = z.object({
  code: z.string().min(1, "El código es requerido"),
  pin: z.string().min(4, "El PIN debe tener al menos 4 dígitos")
})

export function StoreAccessForm() {
  const { session } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      pin: ""
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!session?.user?.id) {
      toast.error('Debes iniciar sesión')
      return
    }

    setIsLoading(true)
    try {
      console.log('Enviando datos:', {
        userId: session.user.id,
        code: values.code,
        pin: values.pin
      })

      const result = await linkStoreToProfile(
        session.user.id,
        values.code,
        values.pin
      )

      console.log('Resultado:', result)

      if (result.success) {
        toast.success(result.message)
        form.reset()
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      console.error('Error en formulario:', error)
      toast.error('Error al vincular la tienda')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          size="icon"
          className="fixed bottom-24 right-4 h-14 w-14 rounded-full shadow-lg"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[300px]">
        <SheetHeader>
          <SheetTitle className="text-center">Acceder a tiendas</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código de tienda</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduce el código" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PIN de acceso</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="Introduce el PIN" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Cargando...' : 'Acceder'}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
} 