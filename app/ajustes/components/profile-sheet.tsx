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

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres.",
  }),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

interface ProfileSheetProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  phoneNumber: string
}

export function ProfileSheet({ isOpen, onOpenChange, phoneNumber }: ProfileSheetProps) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      password: "",
    },
  })

  function onSubmit(data: ProfileFormValues) {
    console.log('Guardando perfil:', data)
    onOpenChange(false)
  }

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
                Editar perfil
              </SheetTitle>
              <SheetDescription className="text-gray-500">
                Modifica los datos de tu perfil aquí. Haz clic en guardar cuando termines.
              </SheetDescription>
            </SheetHeader>
            
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

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right text-gray-700">
                    Teléfono
                  </Label>
                  <Input 
                    value={phoneNumber} 
                    disabled 
                    className="col-span-3 bg-gray-50 border-gray-200" 
                  />
                </div>

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right text-gray-700">
                        Contraseña
                      </FormLabel>
                      <div className="col-span-3">
                        <FormControl>
                          <Input 
                            type="password"
                            placeholder="Tu contraseña"
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