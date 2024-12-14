'use client'

import { useState } from 'react'
import { MapPin, User, PackagePlus, MessageSquareHeart, SlidersHorizontal, ScrollText, Paintbrush } from 'lucide-react'
import { ProfileHeader } from '../components/profile-header'
import { MenuItem } from '../components/menu-item'
import { ProfileSheet } from './components/profile-sheet'
import { StoreSheet } from './components/store-sheet'
import { FeedbackSheet } from './components/feedback-sheet'
import { StoreSettingsSheet } from './components/store-settings-sheet'
import { OrderHistorySheet } from './components/order-history-sheet'
import { CustomSheet } from './components/custom-sheet'
import { AddressesListSheet } from '../pedidos/components/addresses-list-sheet'
import { useAddresses } from '../hooks/use-addresses'

export default function AjustesPage() {
  const phoneNumber = '+34601286447'
  const [isProfileSheetOpen, setIsProfileSheetOpen] = useState(false)
  const [isAddressesListOpen, setIsAddressesListOpen] = useState(false)
  const [isAddStoreOpen, setIsAddStoreOpen] = useState(false)
  const [isFeedbackSheetOpen, setIsFeedbackSheetOpen] = useState(false)
  const [isStoreSettingsOpen, setIsStoreSettingsOpen] = useState(false)
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false)
  const [isCustomSheetOpen, setIsCustomSheetOpen] = useState(false)

  const { selectAddress } = useAddresses()

  const handleAddressSelect = (address: any) => {
    if (address) {
      selectAddress(address.id)
    }
    setIsAddressesListOpen(false)
  }

  return (
    <div className="bg-[#f5f5f5] min-h-screen max-w-3xl m-auto ">
      <ProfileHeader phoneNumber={phoneNumber} />
    
      <div className="space-y-2 divide-y mt-4">
        <MenuItem 
          icon={User}
          label="Editar Perfil"
          onClick={() => setIsProfileSheetOpen(true)}
        />
        <MenuItem 
          icon={MapPin} 
          label="Mis Direcciones"  
          onClick={() => setIsAddressesListOpen(true)} 
        />
        <MenuItem 
          icon={PackagePlus} 
          label="Crear mi Tienda" 
          onClick={() => setIsAddStoreOpen(true)}
          disabled={true} 
          labelClassName="line-through"
        />
        <MenuItem 
          icon={SlidersHorizontal} 
          label="Configuración de mi tienda" 
          onClick={() => setIsStoreSettingsOpen(true)}
          disabled={true}
          labelClassName="line-through"
        />
        <MenuItem 
          icon={ScrollText}
          label="Historial de compras"
          onClick={() => setIsOrderHistoryOpen(true)}
        />
        <MenuItem 
          icon={Paintbrush}
          label="Personalizar"
          onClick={() => setIsCustomSheetOpen(true)}
          disabled={true} 
          labelClassName="line-through"
        />
        <MenuItem 
          icon={MessageSquareHeart} 
          label="Enviar opiniones" 
          onClick={() => setIsFeedbackSheetOpen(true)}
        />
      </div>

      <ProfileSheet 
        isOpen={isProfileSheetOpen}
        onOpenChange={setIsProfileSheetOpen}
        phoneNumber={phoneNumber}
      />

      <AddressesListSheet
        isOpen={isAddressesListOpen}
        onClose={() => setIsAddressesListOpen(false)}
        onAddressSelect={handleAddressSelect}
      />

      <StoreSheet
        isOpen={isAddStoreOpen}
        onOpenChange={setIsAddStoreOpen}
      />

      <FeedbackSheet
        isOpen={isFeedbackSheetOpen}
        onOpenChange={setIsFeedbackSheetOpen}
      />

      <StoreSettingsSheet
        isOpen={isStoreSettingsOpen}
        onOpenChange={setIsStoreSettingsOpen}
      />

      <OrderHistorySheet
        isOpen={isOrderHistoryOpen}
        onOpenChange={setIsOrderHistoryOpen}
      />

      <CustomSheet
        isOpen={isCustomSheetOpen}
        onOpenChange={setIsCustomSheetOpen}
      />
    </div>
  )
}
