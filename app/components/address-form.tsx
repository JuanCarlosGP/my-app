'use client'

import { ArrowLeft, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from '@/components/ui/input'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


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
    <div className={`transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className="sticky top-0 flex justify-between items-center p-4 border-b bg-white">
      </div>
      <form id="addressForm" onSubmit={handleSubmit} className="space-y-4 p-4 bg-white">
        <div className="space-y-4">
          <div className="border-b pb-4">
            <Input name="empresa" placeholder="Nombre Empresa" />
          </div>
          <div className="border-b pb-4">
            <Input name="cif" placeholder="CIF" />
          </div>
          <div className="border-b pb-4">
            <Input name="direccion" placeholder="Dirección" />
          </div>
          <div className="border-b pb-4">
            <Input name="codigoPostal" placeholder="Código Postal" />
          </div>
          <div className="border-b pb-4">
            <Input name="ciudad" placeholder="Ciudad" />
          </div>
          <div className="border-b pb-4">
            <Input name="provincia" placeholder="Provincia" />
          </div>
          <div className="border-b pb-4">
            <Input name="email" type="email" placeholder="E-Mail" />
          </div>
        </div>
      </form>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>¿Por qué pedimos estos datos?</AccordionTrigger>
          <AccordionContent>
            Solicitamos estos datos para validar que la empresa es real. Si no proporcionas esta información, no podrás acceder al sistema para formar una tienda. Esto nos ayuda a mantener un entorno seguro y confiable para todos los usuarios.
          </AccordionContent>
        </AccordionItem>
      </Accordion>


    </div>
  )
}

