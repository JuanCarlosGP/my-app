import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const storeItems = [
  {
    id: "acceptVerify",
    label: "Quiero que mi cuenta sea revisada para poder crear mi tienda.",
  },
  {
    id: "allowNotifications",
    label: "Recibir notificaciones para el proceso de verificación.",
  },
] as const

const StoreFormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Debes aceptar los términos y condiciones.",
  }),
})

interface StoreSheetProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function StoreSheet({ isOpen, onOpenChange }: StoreSheetProps) {
  const form = useForm<z.infer<typeof StoreFormSchema>>({
    resolver: zodResolver(StoreFormSchema),
    defaultValues: {
      items: [],
    },
  })

  const handleSubmit = (data: z.infer<typeof StoreFormSchema>) => {
    onOpenChange(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent 
        side="right" 
        className="w-full h-full border-none md:w-[400px] lg:w-[540px] p-0 md:p-6"
      >
        <div className="h-full flex flex-col">
          <SheetHeader className="p-6 md:p-0">
            <SheetTitle className="text-xl font-bold text-black">
              Añadir Tienda
            </SheetTitle>
            <SheetDescription className="text-gray-500">
              Este es el proceso por el cual serás parte de la plataforma y podrás poner en venta tus productos.
            </SheetDescription>
          </SheetHeader>
          
          <div className="flex-1 overflow-y-auto px-6 md:px-0">
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
              <div>
                {storeItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 mb-4"
                  >
                    <Checkbox
                      checked={form.watch('items')?.includes(item.id)}
                      onCheckedChange={(checked) => {
                        const currentItems = form.watch('items') || []
                        if (checked) {
                          form.setValue('items', [...currentItems, item.id])
                        } else {
                          form.setValue(
                            'items',
                            currentItems.filter((value) => value !== item.id)
                          )
                        }
                      }}
                    />
                    <label className="font-normal cursor-pointer">
                      {item.label}
                    </label>
                  </div>
                ))}
              </div>
            </form>

            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>¿Qué información será revisada?</AccordionTrigger>
                <AccordionContent>
                  La informacion revisada será la proporcionada en tú direccón, la cual incluye: <br></br> 
                  Nombre de empresa, CIF, dirección, código postal, ciudad, provincia, e-mail.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>¿Qué tarifas serán cobradas?</AccordionTrigger>
                <AccordionContent>
                  La aplicación se encuentra en modo beta, lo cual indica que estmaos en búsqueda de fallos, 
                  errores y mejoras. Por lo tanto los primeros usuarios podrán disfrutar de la plataforma de 
                  forma gratuita, esta oportunidad será reemplazada en el futuro por una tarifa mensual.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <SheetFooter className="p-6 md:p-0">
            <Button 
              type="submit"
              className="w-full md:w-auto"
              variant="default"
              onClick={form.handleSubmit(handleSubmit)}
              disabled={!form.watch('items')?.includes('acceptTerms')}
            >
              Función desactivada en estos momentos
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  )
} 