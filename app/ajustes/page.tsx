'use client'

import { useState } from 'react'
import { MapPin, User, PackagePlus, MessageSquareHeart } from 'lucide-react'
import { ProfileHeader } from '../components/profile-header'
import { MenuItem } from '../components/menu-item'
import { AddressForm, type AddressFormData } from '../components/address-form'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Textarea } from "@/components/ui/textarea"

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

export default function AjustesPage() {
  const phoneNumber = '+34601286447'
  const [isProfileSheetOpen, setIsProfileSheetOpen] = useState(false)
  const [isAddressSheetOpen, setIsAddressSheetOpen] = useState(false)
  const [isAddStoreOpen, setIsAddStoreOpen] = useState(false)
  const [isFeedbackSheetOpen, setIsFeedbackSheetOpen] = useState(false)

  const storeForm = useForm<z.infer<typeof StoreFormSchema>>({
    resolver: zodResolver(StoreFormSchema),
    defaultValues: {
      items: [],
    },
  })

  const handleAddStore = () => {
    setIsAddStoreOpen(true)
  }

  const handleAddressSubmit = (data: AddressFormData) => {
    console.log('Address form submitted:', data)
    setIsAddressSheetOpen(false)
  }

  const handleStoreSubmit = (data: z.infer<typeof StoreFormSchema>) => {
    console.log('Store form submitted:', data)
    setIsAddStoreOpen(false)
  }

  return (
    <div className="bg-white min-h-screen">
      <ProfileHeader phoneNumber={phoneNumber} />
    
      <div className="space-y-2 divide-y mt-4">
        <MenuItem 
          icon={User}
          label="Editar Perfil"
          onClick={() => setIsProfileSheetOpen(true)}
        />
        <MenuItem 
          icon={MapPin} 
          label="Mi Dirección"  
          onClick={() => setIsAddressSheetOpen(true)} 
        />
        <MenuItem 
          icon={PackagePlus} 
          label="Crear mi Tienda" 
          onClick={handleAddStore} 
        />
        <MenuItem 
          icon={MessageSquareHeart} 
          label="Enviar opiniones" 
          onClick={() => setIsFeedbackSheetOpen(true)}
        />
      </div>

      <Sheet open={isAddressSheetOpen} onOpenChange={setIsAddressSheetOpen}>
        <SheetContent 
          side="right" 
          className="w-full h-full border-none md:w-[400px] lg:w-[540px] p-0 md:p-6"
        >
          <div className="h-full flex flex-col">
            <SheetHeader className="p-6 md:p-0">
              <SheetTitle className="text-xl font-bold text-black">
                Mi Dirección
              </SheetTitle>
              <SheetDescription className="text-gray-500">
                Administra tus direcciones aquí.
              </SheetDescription>
            </SheetHeader>
            
            <div className="flex-1 overflow-y-auto px-6 md:px-0">
              <AddressForm 
                isOpen={isAddressSheetOpen}
                onClose={() => setIsAddressSheetOpen(false)}
                onSave={handleAddressSubmit}
              />
            </div>

            <SheetFooter className="p-6 md:p-0">
              <SheetClose asChild>
                <Button 
                  type="button"
                  className="w-full md:w-auto"
                  variant="default"
                  onClick={() => setIsAddressSheetOpen(false)}
                >
                  Cerrar
                </Button>
              </SheetClose>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={isProfileSheetOpen} onOpenChange={setIsProfileSheetOpen}>
        <SheetContent 
          side="right" 
          className="w-full h-full border-none md:w-[400px] lg:w-[540px] p-0 md:p-6"
        >
          <div className="h-full flex flex-col">
            <SheetHeader className="p-6 md:p-0">
              <SheetTitle className="text-xl font-bold text-black">
                Editar perfil
              </SheetTitle>
              <SheetDescription className="text-gray-500">
                Modifica los datos de tu perfil aquí. Haz clic en guardar cuando termines.
              </SheetDescription>
            </SheetHeader>
            
            <div className="flex-1 overflow-y-auto px-6 md:px-0">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right text-gray-700">
                    Nombre
                  </Label>
                  <Input 
                    id="name" 
                    placeholder="Tu nombre" 
                    className="col-span-3 bg-white border-gray-200" 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right text-gray-700">
                    Teléfono
                  </Label>
                  <Input 
                    id="phone" 
                    value={phoneNumber} 
                    disabled 
                    className="col-span-3 bg-gray-50 border-gray-200" 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right text-gray-700">
                    Contraseña
                  </Label>
                  <Input 
                    id="passwd" 
                    type="password" 
                    placeholder="Tu contraseña" 
                    className="col-span-3 bg-white border-gray-200"
                  />
                </div>
              </div>
            </div>

            <SheetFooter className="p-6 md:p-0">
              <SheetClose asChild>
                <Button 
                  type="submit"
                  className="w-full md:w-auto"
                  variant="default"
                >
                  Guardar perfil
                </Button>
              </SheetClose>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={isAddStoreOpen} onOpenChange={setIsAddStoreOpen}>
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
              <form onSubmit={storeForm.handleSubmit(handleStoreSubmit)} className="space-y-8">
                <div>
                  {storeItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 mb-4"
                    >
                      <Checkbox
                        checked={storeForm.watch('items')?.includes(item.id)}
                        onCheckedChange={(checked) => {
                          const currentItems = storeForm.watch('items') || []
                          if (checked) {
                            storeForm.setValue('items', [...currentItems, item.id])
                          } else {
                            storeForm.setValue(
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
                    La informacion revisada será la proporcionada en tú direccón, la cual incluye: <br></br> Nombre de empresa, CIF, dirección, código postal, ciudad, provincia, e-mail.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>¿Qué tarifas serán cobradas?</AccordionTrigger>
                  <AccordionContent>
                    La aplicación se encuentra en modo beta, lo cual indica que estmaos en búsqueda de fallos, errores y mejoras. Por lo tanto los primeros usuarios podrán disfrutar de la plataforma de forma gratuita, esta oportunidad será reemplazada en el futuro por una tarifa mensual.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <SheetFooter className="p-6 md:p-0">
              <Button 
                type="submit"
                className="w-full md:w-auto"
                variant="default"
                onClick={storeForm.handleSubmit(handleStoreSubmit)}
                disabled={!storeForm.watch('items')?.includes('acceptTerms')}
              >
                Función desactivada en estos momentos
              </Button>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={isFeedbackSheetOpen} onOpenChange={setIsFeedbackSheetOpen}>
        <SheetContent 
          side="right" 
          className="w-full h-full border-none md:w-[400px] lg:w-[540px] p-0 md:p-6"
        >
          <div className="h-full flex flex-col">
            <SheetHeader className="p-6 md:p-0">
              <SheetTitle className="text-xl font-bold text-black">
                Enviar opiniones
              </SheetTitle>
              <SheetDescription className="text-gray-500">
                Nos encantaría escuchar tu opinión sobre la aplicación.💖
              </SheetDescription>
            </SheetHeader>
            
            <div className="flex-1 overflow-y-auto px-6 md:px-0">
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="feedback" className="text-gray-700">
                    Tu opinión
                  </Label>
                  <Textarea 
                    id="feedback" 
                    placeholder="Cuéntanos qué podemos mejorar..." 
                    className="min-h-[150px] bg-white border-gray-200" 
                  />
                </div>
              </div>
            </div>

            <SheetFooter className="p-6 md:p-0">
              <SheetClose asChild>
                <Button 
                  type="submit"
                  className="w-full md:w-auto"
                  variant="default"
                >
                  Enviar opinión
                </Button>
              </SheetClose>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
