'use client'

import { useState } from 'react'
import { MapPin, User, PackagePlus, MessageSquareHeart, SlidersHorizontal } from 'lucide-react'
import { ProfileHeader } from '../components/profile-header'
import { MenuItem } from '../components/menu-item'
import { ProfileSheet } from './components/profile-sheet'
import { AddressSheet } from './components/address-sheet'
import { StoreSheet } from './components/store-sheet'
import { FeedbackSheet } from './components/feedback-sheet'
import { StoreSettingsSheet } from './components/store-settings-sheet'

export default function AjustesPage() {
  const phoneNumber = '+34601286447'
  const [isProfileSheetOpen, setIsProfileSheetOpen] = useState(false)
  const [isAddressSheetOpen, setIsAddressSheetOpen] = useState(false)
  const [isAddStoreOpen, setIsAddStoreOpen] = useState(false)
  const [isFeedbackSheetOpen, setIsFeedbackSheetOpen] = useState(false)
  const [isStoreSettingsOpen, setIsStoreSettingsOpen] = useState(false)

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
          label="Mi Dirección"  
          onClick={() => setIsAddressSheetOpen(true)} 
        />
        <MenuItem 
          icon={PackagePlus} 
          label="Crear mi Tienda" 
          onClick={() => setIsAddStoreOpen(true)} 
        />
        <MenuItem 
          icon={SlidersHorizontal} 
          label="Configuración de mi tienda" 
          onClick={() => setIsStoreSettingsOpen(true)}
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

      <AddressSheet
        isOpen={isAddressSheetOpen}
        onOpenChange={setIsAddressSheetOpen}
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
    </div>
  )
}
