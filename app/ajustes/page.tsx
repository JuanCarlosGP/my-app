'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/app/lib/supabase'
import { type Profile } from '@/app/lib/types'
import { 
  MapPin, 
  User, 
  PackagePlus, 
  MessageSquareHeart, 
  SlidersHorizontal, 
  ScrollText, 
  Paintbrush, 
  LogOut,
  ChevronRight,
  Store
} from 'lucide-react'
import { ProfileHeader } from '../components/profile-header'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { signOut } from '@/app/lib/auth'
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ProfileSheet } from './components/profile-sheet'
import { StoreSheet } from './components/store-sheet'
import { FeedbackSheet } from './components/feedback-sheet'
import { StoreSettingsSheet } from './components/store-settings-sheet'
import { OrderHistorySheet } from './components/order-history-sheet'
import { CustomSheet } from './components/custom-sheet'
import { AddressesListSheet } from '../pedidos/components/addresses-list-sheet'
import { useAddresses } from '../hooks/use-addresses'
import { LoadingSpinner } from '@/app/components/loading'
import { MyStoresSheet } from './components/my-stores-sheet'

interface MenuSectionProps {
  title: string
  children: React.ReactNode
}

function MenuSection({ title, children }: MenuSectionProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-sm font-medium text-gray-500 px-4">{title}</h2>
      <Card>
        <CardContent className="p-0">
          {children}
        </CardContent>
      </Card>
    </div>
  )
}

interface MenuItemProps {
  icon: React.ElementType
  label: string
  onClick?: () => void
  disabled?: boolean
  labelClassName?: string
  className?: string
  description?: string
}

function MenuItem({ icon: Icon, label, onClick, disabled, labelClassName, className, description }: MenuItemProps) {
  return (
    <button
      className={`w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
          <Icon className="w-4 h-4" />
        </div>
        <div className="text-left">
          <span className={`block text-sm font-medium ${labelClassName}`}>{label}</span>
          {description && (
            <span className="text-xs text-gray-500">{description}</span>
          )}
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-400" />
    </button>
  )
}

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
  const [isMyStoresOpen, setIsMyStoresOpen] = useState(false)

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

  if (loading) return <LoadingSpinner />

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
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-6 mb-6 flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">
              {profile?.name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-semibold">{profile?.name || 'Usuario'}</h1>
            <p className="text-sm text-gray-500">{profile?.phone || 'Sin teléfono'}</p>
          </div>
        </div>

        <div className="space-y-6 px-4">
          <MenuSection title="Cuenta">
            <MenuItem
              icon={User}
              label="Editar Perfil"
              description="Modifica tus datos personales"
              onClick={() => setIsProfileSheetOpen(true)}
            />
            <Separator />
            <MenuItem
              icon={MapPin}
              label="Mis Direcciones"
              description="Gestiona tus direcciones de envío"
              onClick={() => setIsAddressesListOpen(true)}
            />
          </MenuSection>

          <MenuSection title="Actividad">
            <MenuItem
              icon={ScrollText}
              label="Historial de compras"
              description="Ver pedidos anteriores"
              onClick={() => setIsOrderHistoryOpen(true)}
            />
          </MenuSection>

          <MenuSection title="Personalización">
            <MenuItem
              icon={Store}
              label="Mis Tiendas"
              description="Gestionar tiendas guardadas"
              onClick={() => setIsMyStoresOpen(true)}
            />
            <Separator />
            <MenuItem
              icon={Paintbrush}
              label="Personalizar"
              description="Próximamente"
              disabled={true}
              labelClassName="line-through"
            />
            <Separator />
            <MenuItem
              icon={MessageSquareHeart}
              label="Enviar opiniones"
              description="Ayúdanos a mejorar"
              onClick={() => setIsFeedbackSheetOpen(true)}
            />
          </MenuSection>

          <MenuSection title="Negocio">
            <MenuItem
              icon={PackagePlus}
              label="Crear mi Tienda"
              description="Próximamente"
              disabled={true}
              labelClassName="line-through"
            />
            <Separator />
            <MenuItem
              icon={SlidersHorizontal}
              label="Configuración de mi tienda"
              description="Próximamente"
              disabled={true}
              labelClassName="line-through"
            />
          </MenuSection>

          <Card className="mt-6">
            <CardContent className="p-0">
              <MenuItem
                icon={LogOut}
                label="Cerrar sesión"
                onClick={() => setShowLogoutDialog(true)}
                className="text-red-600 hover:bg-red-50"
              />
            </CardContent>
          </Card>
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

      <MyStoresSheet
        isOpen={isMyStoresOpen}
        onOpenChange={setIsMyStoresOpen}
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
