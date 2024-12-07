'use client'

import { useState } from 'react'
import { MapPin, User, PackagePlus, MessageSquareHeart } from 'lucide-react'
import { ProfileHeader } from '../components/profile-header'
import { MenuItem } from '../components/menu-item'
import { ProfileSheet } from './components/profile-sheet'
import { AddressSheet } from './components/address-sheet'
import { StoreSheet } from './components/store-sheet'
import { FeedbackSheet } from './components/feedback-sheet'

export default function AjustesPage() {
  const phoneNumber = '+34601286447'
  const [isProfileSheetOpen, setIsProfileSheetOpen] = useState(false)
  const [isAddressSheetOpen, setIsAddressSheetOpen] = useState(false)
  const [isAddStoreOpen, setIsAddStoreOpen] = useState(false)
  const [isFeedbackSheetOpen, setIsFeedbackSheetOpen] = useState(false)

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
          onClick={() => setIsAddStoreOpen(true)} 
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
    </div>
  )
}
