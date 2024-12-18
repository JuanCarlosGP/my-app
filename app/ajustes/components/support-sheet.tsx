import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { Check } from "lucide-react"

interface SupportSheetProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

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

export function SupportSheet({ isOpen, onOpenChange }: SupportSheetProps) {
  const [acceptedItems, setAcceptedItems] = useState<string[]>([])

  const handleSubmit = () => {
    if (acceptedItems.length < 2) {
      toast.error("Debes aceptar todos los términos para continuar")
      return
    }
    
    toast.success('Solicitud enviada correctamente', {
      icon: <Check className="w-4 h-4 text-green-600" />,
      style: {
        background: 'hsl(142.1 76.2% 97.3%)',
        color: 'hsl(0 0% 0%)',
        border: '1px solid hsl(142.1 76.2% 90.3%)',
      },
    })
    onOpenChange(false)
  }

  const toggleItem = (itemId: string) => {
    setAcceptedItems(prev => 
      prev.includes(itemId)
        ? prev.filter(i => i !== itemId)
        : [...prev, itemId]
    )
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full lg:w-[540px] p-0">
        <div className="h-full flex flex-col">
          <SheetHeader className="p-6">
            <SheetTitle className="text-xl font-bold">Solicitar cuenta de vendedor</SheetTitle>
            <SheetDescription>
              Completa el proceso para comenzar a vender en nuestra plataforma
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-6">
            <div className="space-y-6">
              <Card className="border-blue-100 bg-blue-50/50">
                <CardHeader>
                  <CardTitle className="text-base">Proceso de verificación</CardTitle>
                  <CardDescription>
                    Para garantizar la seguridad de nuestra plataforma, necesitamos verificar tu identidad y negocio
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {storeItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className="flex items-start space-x-3 space-y-0 rounded-md border p-4 cursor-pointer hover:bg-blue-50/50 transition-colors"
                    >
                      <Checkbox
                        checked={acceptedItems.includes(item.id)}
                        onCheckedChange={() => toggleItem(item.id)}
                        className="mt-0.5"
                      />
                      <label className="font-normal cursor-pointer flex-1">
                        {item.label}
                      </label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-500">Información importante</h3>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="requirements">
                    <AccordionTrigger>Requisitos para ser vendedor</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-4 space-y-2 text-sm">
                        <li>Documento de identidad válido</li>
                        <li>Registro de actividad comercial</li>
                        <li>Cuenta bancaria verificada</li>
                        <li>Dirección comercial verificable</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="process">
                    <AccordionTrigger>Proceso de verificación</AccordionTrigger>
                    <AccordionContent>
                      <ol className="list-decimal pl-4 space-y-2 text-sm">
                        <li>Envío de documentación requerida</li>
                        <li>Verificación de identidad por videollamada</li>
                        <li>Revisión de documentos comerciales</li>
                        <li>Aprobación final y activación de cuenta</li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="terms">
                    <AccordionTrigger>Términos y condiciones</AccordionTrigger>
                    <AccordionContent className="text-sm">
                      Al solicitar una cuenta de vendedor, aceptas nuestros términos y condiciones,
                      incluyendo las comisiones por venta, políticas de envío y estándares de servicio al cliente.
                      La aprobación final está sujeta a la verificación exitosa de toda la información proporcionada.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="fees">
                    <AccordionTrigger>Tarifas</AccordionTrigger>
                    <AccordionContent className="text-sm">
                      La aplicación se encuentra en modo beta, lo cual indica que estamos en búsqueda de fallos, 
                      errores y mejoras. Por lo tanto los primeros usuarios podrán disfrutar de la plataforma de 
                      forma gratuita, esta oportunidad será reemplazada en el futuro por una tarifa mensual.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>

          <div className="p-6 mt-auto">
            <Button 
              onClick={handleSubmit}
              className="w-full"
              variant="default"
            >
              Solicitar verificación
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
} 