"use client"

import { Sheet, SheetContent, SheetHeader, SheetClose, SheetTitle } from "@/components/ui/sheet"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useAddresses } from "../../hooks/use-addresses"

interface PersonalDataSheetProps {
  isOpen: boolean
  onClose: () => void
  onComplete?: () => void
}

export function PersonalDataSheet({ isOpen, onClose, onComplete }: PersonalDataSheetProps) {
  const { addAddress } = useAddresses()
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    nif: '',
    postalCode: '',
    city: '',
    province: '',
    email: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Intentando guardar nueva dirección:', formData)
    
    // Validar campos requeridos
    if (!formData.name || !formData.address || !formData.phone) {
      alert('Por favor, completa los campos obligatorios')
      return
    }

    try {
      const result = addAddress(formData)
      console.log('Resultado de addAddress:', result)
      if (result) {
        setFormData({ 
          name: '', address: '', phone: '', 
          nif: '', postalCode: '', city: '', 
          province: '', email: '' 
        })
        onComplete?.()
        onClose()
      } else {
        alert('Error al guardar la dirección')
      }
    } catch (error) {
      console.error('Error al guardar la dirección:', error)
      alert('Ocurrió un error al guardar la dirección')
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md bg-[#f5f5f5] p-0">
        <SheetHeader>
          <SheetTitle className="sr-only">Datos Personales</SheetTitle>
        </SheetHeader>

        <div className="sticky top-0 bg-white/70 backdrop-blur-md z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <SheetClose className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft className="h-6 w-6" />
              </SheetClose>
            </div>
            
            <h2 className="font-semibold text-lg absolute left-1/2 -translate-x-1/2">
              Datos Personales
            </h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium text-gray-700">
                Nombre Empresa
              </label>
              <Input
                id="name"
                placeholder="Ingresa tu nombre de empresa" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label htmlFor="nif" className="text-sm font-medium text-gray-700">
                NIF
              </label>
              <Input
                id="nif"
                placeholder="Ingresa tu NIF"
                value={formData.nif}
                onChange={(e) => setFormData({ ...formData, nif: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="address" className="text-sm font-medium text-gray-700">
                Dirección
              </label>
              <Input
                id="address"
                placeholder="Ingresa tu dirección"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              />
            </div>

            <div>
              <label htmlFor="postalCode" className="text-sm font-medium text-gray-700">
                Código Postal
              </label>
              <Input
                id="postalCode"
                placeholder="Ingresa tu código postal"
                value={formData.postalCode}
                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="city" className="text-sm font-medium text-gray-700">
                Ciudad
              </label>
              <Input
                id="city"
                placeholder="Ingresa tu ciudad"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="province" className="text-sm font-medium text-gray-700">
                Provincia
              </label>
              <Input
                id="province"
                placeholder="Ingresa tu provincia"
                value={formData.province}
                onChange={(e) => setFormData({ ...formData, province: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Teléfono
              </label>
              <Input
                id="phone"
                type="tel"
                placeholder="Ingresa tu número de teléfono"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Ingresa tu email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Guardar cambios
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
} 