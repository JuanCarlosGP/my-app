'use client'

import { useState } from 'react'
import { MapPin, Store } from 'lucide-react'
import { ProfileHeader } from '../components/profile-header'
import { MenuItem } from '../components/menu-item'
import { AddressForm, type AddressFormData } from '../components/address-form'
import { Button } from '@/components/ui/button'

export default function AjustesPage() {
  const phoneNumber = '+34601286447'
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false)

  const handleAddStore = () => {
    console.log('Añadir tienda clicked')
    // Aquí iría la lógica para añadir tienda
  }

  const handleAddressSubmit = (data: AddressFormData) => {
    console.log('Address form submitted:', data)
    setIsAddressFormOpen(false)
    // Aquí iría la lógica para guardar la dirección
  }

  return (
    <div className="-mt-4">
      <ProfileHeader phoneNumber={phoneNumber} />
      
      <div className="space-y-2 divide-y">
        <MenuItem 
          icon={MapPin} 
          label="Mis Direcciones" 
          onClick={() => setIsAddressFormOpen(true)} 
        />
        <MenuItem 
          icon={Store} 
          label="Mis Tiendas" 
          onClick={() => console.log('Mis Tiendas clicked')} 
        />
      </div>

      <AddressForm 
        isOpen={isAddressFormOpen}
        onClose={() => setIsAddressFormOpen(false)}
        onSave={handleAddressSubmit}
      />
    </div>
  )
}

