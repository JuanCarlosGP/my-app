"use client"

import { Sheet, SheetContent, SheetHeader, SheetClose, SheetTitle } from "@/components/ui/sheet"
import { ArrowLeft, User, MapPin, Phone, Coins, Percent } from "lucide-react"
import { CartItem } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import { PersonalDataSheet } from "./personal-data-sheet"
import { useState, useEffect } from "react"
import { AddressesListSheet } from "./addresses-list-sheet"
import { useAddresses, type Address } from "../../hooks/use-addresses"
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { useCart } from "@/hooks/use-cart"

interface FacturacionSheetProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  total: number
}

export function FacturacionSheet({ isOpen, onClose, items, total }: FacturacionSheetProps) {
  const [isAddressesListOpen, setIsAddressesListOpen] = useState(false)
  const { getActiveAddress, selectAddress } = useAddresses()
  const [selectedAddress, setSelectedAddress] = useState<Address | undefined>(getActiveAddress())
  const { updateItemNote } = useCart()

  // Actualizar la dirección seleccionada cuando cambie
  useEffect(() => {
    const address = getActiveAddress()
    console.log('Effect: Active address changed:', address)
    setSelectedAddress(address)
  }, [getActiveAddress])

  // Manejar el cierre del sheet de direcciones
  const handleAddressesListClose = () => {
    setIsAddressesListOpen(false)
  }

  // Manejar la selección de dirección
  const handleAddressSelect = (address: Address | undefined) => {
    console.log('Handling address selection:', address)
    if (address) {
      selectAddress(address.id)
      setSelectedAddress(address)
    } else {
      // Si no hay dirección, limpiamos el estado
      setSelectedAddress(undefined)
    }
    setIsAddressesListOpen(false)
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-md bg-[#f5f5f5] p-0 flex flex-col h-full">
          <SheetHeader>
            <SheetTitle>
              <VisuallyHidden>Facturación</VisuallyHidden>
            </SheetTitle>
          </SheetHeader>

          <div className="sticky top-0 bg-white/70 backdrop-blur-md z-10">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2">
                <SheetClose className="p-2 hover:bg-gray-100 rounded-full">
                  <ArrowLeft className="h-6 w-6" />
                </SheetClose>
              </div>
              
              <h2 className="font-semibold text-lg absolute left-1/2 -translate-x-1/2">
                Facturación
              </h2>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Sección de Datos Personales */}
            <div className="bg-white rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Datos Personales</h3>
                <Button 
                  variant="ghost" 
                  className="text-blue-600 hover:text-blue-700 p-0"
                  onClick={() => setIsAddressesListOpen(true)}
                >
                  Modificar
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Nombre</p>
                    <p className="font-medium">
                      {selectedAddress?.name || "Sin especificar"}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Dirección</p>
                    <p className="font-medium">
                      {selectedAddress?.address || "Sin especificar"}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Teléfono</p>
                    <p className="font-medium">
                      {selectedAddress?.phone || "Sin especificar"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sección de Información */}
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-4">Información</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Coins className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="font-medium">{formatPrice(total)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Percent className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Descuento</p>
                    <p className="font-medium">0%</p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-2">Comentarios generales</p>
                  <Textarea 
                    placeholder="Añade comentarios adicionales para tu pedido..."
                    className="w-full min-h-[100px]"
                  />
                </div>
              </div>
            </div>

            {/* Sección de Notas de Productos */}
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-4">Notas de Productos</h3>
              
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="space-y-2">
                    <div className="flex justify-between">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">x{item.quantity}</p>
                    </div>
                    <Textarea 
                      placeholder={`Añade notas para ${item.name}...`}
                      className="w-full min-h-[80px]"
                      value={item.note || ''}
                      onChange={(e) => updateItemNote(item.id, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Botón de Hacer Pedido */}
          <div className="mt-auto border-t bg-white p-4">
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-semibold"
              onClick={() => {
                console.log('Procesando pedido...')
              }}
            >
              Hacer Pedido
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <AddressesListSheet 
        isOpen={isAddressesListOpen}
        onClose={handleAddressesListClose}
        onAddressSelect={handleAddressSelect}
      />
    </>
  )
} 