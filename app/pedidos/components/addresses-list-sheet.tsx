"use client"

import { Sheet, SheetContent, SheetHeader, SheetClose, SheetTitle } from "@/components/ui/sheet"
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { ArrowLeft, Plus, MapPin, Trash2, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { PersonalDataSheet } from "./personal-data-sheet"
import { useAddresses } from "../../hooks/use-addresses"
import { type Address } from "@/app/lib/types"
import { supabase } from "../../lib/supabase"
import { toast } from "react-hot-toast"

interface AddressesListSheetProps {
  isOpen: boolean
  onClose: () => void
  onAddressSelect?: (address: Address | undefined) => void
}

export function AddressesListSheet({ isOpen, onClose, onAddressSelect }: AddressesListSheetProps) {
  const [isAddingAddress, setIsAddingAddress] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const { addresses, selectAddress, deleteAddress, isLoaded, reloadAddresses, getActiveAddress } = useAddresses()

  const handleAddressSelect = (address: Address) => {
    console.log('Selecting address:', address)
    selectAddress(address.id)
    console.log('Selected address ID:', address.id)
    onAddressSelect?.(address)
    onClose()
  }

  const handleDeleteAddress = async (e: React.MouseEvent, addressId: string) => {
    e.stopPropagation()
    if (window.confirm('¿Estás seguro de que quieres eliminar esta dirección?')) {
      console.log('Deleting address:', addressId)
      const success = await deleteAddress(addressId)
      if (success) {
        console.log('Address deleted successfully')
        await reloadAddresses()
        setRefreshKey(prev => prev + 1)
      } else {
        console.error('Failed to delete address')
      }
    }
  }

  useEffect(() => {
    if (isOpen) {
      reloadAddresses()
    }
  }, [isOpen, reloadAddresses])

  const handleNewAddressComplete = async () => {
    setIsAddingAddress(false)
    await reloadAddresses()
    setRefreshKey(prev => prev + 1)
  }

  const handlePersonalDataClose = () => {
    setIsAddingAddress(false)
    setEditingAddress(null)
  }

  const handleSheetClose = () => {
    const activeAddress = getActiveAddress()
    onAddressSelect?.(activeAddress)
    onClose()
  }

  const handleEditAddress = async (e: React.MouseEvent, address: Address) => {
    e.stopPropagation()
    try {
      // Hacer una consulta para obtener los datos más recientes de la dirección
      const { data: freshAddress, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('id', address.id)
        .single()

      if (error) throw error

      setEditingAddress(freshAddress)
      setIsAddingAddress(true)
    } catch (error) {
      console.error('Error al cargar la dirección:', error)
      toast.error('Error al cargar la dirección')
    }
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-md bg-[#f5f5f5] p-0">
          <SheetHeader>
            <SheetTitle>
              <VisuallyHidden>Mis Direcciones</VisuallyHidden>
            </SheetTitle>
          </SheetHeader>

          <div className="sticky top-0 bg-white/70 backdrop-blur-md z-10">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2">
                <SheetClose 
                  className="p-2 hover:bg-gray-100 rounded-full"
                  onClick={handleSheetClose}
                >
                  <ArrowLeft className="h-6 w-6" />
                </SheetClose>
              </div>
              
              <h2 className="font-semibold text-lg absolute left-1/2 -translate-x-1/2">
                Mis Direcciones
              </h2>
            </div>
          </div>

          <div className="p-4 space-y-4">
            <Button 
              onClick={() => setIsAddingAddress(true)} 
              variant="outline" 
              className="w-full flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Agregar nueva dirección
            </Button>

            {!isLoaded ? (
              <div className="text-center py-8 text-gray-500">
                <p>Cargando direcciones...</p>
              </div>
            ) : addresses.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No tienes direcciones guardadas</p>
              </div>
            ) : (
              <div className="space-y-3">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className="bg-white p-4 rounded-lg relative pr-20 cursor-pointer hover:bg-gray-50"
                    onClick={() => handleAddressSelect(address)}
                  >
                    <div>
                      <h3 className="font-medium">{address.company_name}</h3>
                      <p className="text-sm text-gray-500">{address.address}</p>
                      <p className="text-sm text-gray-500">{address.phone}</p>
                    </div>
                    
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                        onClick={(e) => handleEditAddress(e, address)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={(e) => handleDeleteAddress(e, address.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <PersonalDataSheet 
        isOpen={isAddingAddress}
        onClose={handlePersonalDataClose}
        onComplete={handleNewAddressComplete}
        editingAddress={editingAddress}
      />
    </>
  )
} 