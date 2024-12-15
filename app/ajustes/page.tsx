'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/app/lib/supabase'
import { type Profile } from '@/app/lib/types'
import { MapPin, User, PackagePlus, MessageSquareHeart, SlidersHorizontal, ScrollText, Paintbrush, LogOut } from 'lucide-react'
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { signOut } from '@/app/lib/auth'

export default function AjustesPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isProfileSheetOpen, setIsProfileSheetOpen] = useState(false)
  const [isAddressesListOpen, setIsAddressesListOpen] = useState(false)
  const [isAddStoreOpen, setIsAddStoreOpen] = useState(false)
  const [isFeedbackSheetOpen, setIsFeedbackSheetOpen] = useState(false)
  const [isStoreSettingsOpen, setIsStoreSettingsOpen] = useState(false)
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false)
  const [isCustomSheetOpen, setIsCustomSheetOpen] = useState(false)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  const { selectAddress } = useAddresses()

  useEffect(() => {
    async function loadProfile() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user) {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()

          if (error) throw error
          setProfile(profile)
        }
      } catch (error) {
        console.error('Error loading profile:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [])

  if (loading) return <div>Cargando...</div>

  const handleAddressSelect = (address: any) => {
    if (address) {
      selectAddress(address.id)
    }
    setIsAddressesListOpen(false)
  }

  const handleLogout = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  return (
    <div className="bg-[#f5f5f5] min-h-screen max-w-3xl m-auto ">
      <ProfileHeader phoneNumber={profile?.phone || 'No disponible'} />
    
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

        <div className="pt-2">
          <MenuItem 
            icon={LogOut} 
            label="Cerrar sesión" 
            onClick={() => setShowLogoutDialog(true)}
            className="text-red-600"
          />
        </div>
      </div>

      <ProfileSheet 
        isOpen={isProfileSheetOpen}
        onOpenChange={setIsProfileSheetOpen}
        phoneNumber={profile?.phone || 'No disponible'}
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

      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cerrar sesión</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que quieres cerrar sesión?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setShowLogoutDialog(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleLogout}
            >
              Cerrar sesión
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
