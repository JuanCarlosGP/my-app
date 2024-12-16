"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const formSchema = z.object({
  code: z.string().min(1, "El código es requerido"),
  pin: z.string().min(4, "El PIN debe tener al menos 4 dígitos")
})

export function StoreAccessForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      pin: ""
    }
  })

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
          <SheetTitle className="text-center">Acceder a proveedor</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código de proveedor</FormLabel>
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
            <Button type="submit" className="w-full">
              Acceder
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
} 