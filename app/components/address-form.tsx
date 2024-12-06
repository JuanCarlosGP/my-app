'use client'

import { ArrowLeft, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'

interface AddressFormProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: AddressFormData) => void
}

export interface AddressFormData {
  empresa: string
  contactos: string
  cif: string
  direccion: string
  ciudad: string
  provincia: string
  pais: string
  codigoPostal: string
  telefono: string
  email: string
}

export function AddressForm({ isOpen, onClose, onSave }: AddressFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData) as unknown as AddressFormData
    onSave(data)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0">
        <DialogTitle className="sr-only">Detalles de dirección</DialogTitle>
        <div className="sticky top-0 flex justify-between items-center p-4 border-b bg-white">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h2 className="text-lg font-semibold">Detalles</h2>
          <Button variant="ghost" size="icon" type="submit" form="addressForm">
            <Check className="h-6 w-6" />
          </Button>
        </div>
        <form id="addressForm" onSubmit={handleSubmit} className="space-y-4 p-4 bg-white">
          <div className="space-y-4">
            <div className="border-b pb-4">
              <Input name="empresa" placeholder="Introduzca Empresa" />
            </div>
            <div className="border-b pb-4">
              <Input name="contactos" placeholder="Introduzca Contactos" />
            </div>
            <div className="border-b pb-4">
              <Input name="cif" placeholder="Introduzca CIF" />
            </div>
            <div className="border-b pb-4">
              <Input name="direccion" placeholder="Introduzca Dirección" />
            </div>
            <div className="border-b pb-4">
              <Input name="ciudad" placeholder="Introduzca Ciudad" />
            </div>
            <div className="border-b pb-4">
              <Input name="provincia" placeholder="Introduzca Provincia" />
            </div>
            <div className="border-b pb-4">
              <Input name="pais" placeholder="Introduzca País" />
            </div>
            <div className="border-b pb-4">
              <Input name="codigoPostal" placeholder="Introduzca Código Postal" />
            </div>
            <div className="border-b pb-4">
              <Input name="telefono" placeholder="Introduzca Teléfono" />
            </div>
            <div className="border-b pb-4">
              <Input name="email" type="email" placeholder="Introduzca E-Mail" />
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

