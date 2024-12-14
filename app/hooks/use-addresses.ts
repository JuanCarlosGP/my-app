"use client"

import { useState, useEffect, useCallback } from 'react'

export interface Address {
  id: string
  name: string
  address: string
  phone: string
  nif?: string
  postalCode?: string
  city?: string
  province?: string
  email?: string
}

export const useAddresses = () => {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [activeAddressId, setActiveAddressId] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Función auxiliar para obtener direcciones del localStorage
  const getStoredAddresses = useCallback((): Address[] => {
    const savedAddresses = localStorage.getItem('userAddresses')
    return savedAddresses ? JSON.parse(savedAddresses) : []
  }, [])

  // Función auxiliar para guardar direcciones en localStorage
  const saveAddressesToStorage = useCallback((newAddresses: Address[]) => {
    localStorage.setItem('userAddresses', JSON.stringify(newAddresses))
  }, [])

  const reloadAddresses = useCallback(async () => {
    console.log('Reloading addresses...')
    // Cargar direcciones
    const storedAddresses = getStoredAddresses()
    setAddresses(storedAddresses)
    console.log('Loaded addresses:', storedAddresses)

    // Cargar dirección activa
    const activeId = localStorage.getItem('activeAddressId')
    console.log('Loaded active ID:', activeId)
    setActiveAddressId(activeId)

    // Validar que la dirección activa existe
    if (activeId && !storedAddresses.some(addr => addr.id === activeId)) {
      console.log('Active address not found, clearing active ID')
      localStorage.removeItem('activeAddressId')
      setActiveAddressId(null)
    }
  }, [getStoredAddresses])

  // Cargar direcciones y dirección activa al iniciar
  useEffect(() => {
    if (!isLoaded) {
      reloadAddresses()
      setIsLoaded(true)
    }
  }, [isLoaded, reloadAddresses])

  // Agregar nueva dirección
  const addAddress = useCallback((address: Omit<Address, 'id'>) => {
    try {
      const newAddress = {
        id: Date.now().toString(),
        ...address
      }
      
      const currentAddresses = getStoredAddresses()
      const updatedAddresses = [...currentAddresses, newAddress]
      
      // Guardar en localStorage y actualizar estado
      saveAddressesToStorage(updatedAddresses)
      setAddresses(updatedAddresses)
      
      // Establecer como dirección activa
      localStorage.setItem('activeAddressId', newAddress.id)
      setActiveAddressId(newAddress.id)
      
      return newAddress
    } catch (error) {
      console.error('Error adding address:', error)
      return null
    }
  }, [getStoredAddresses, saveAddressesToStorage])

  // Seleccionar dirección activa
  const selectAddress = useCallback((addressId: string) => {
    try {
      const storedAddresses = getStoredAddresses()
      if (storedAddresses.some(addr => addr.id === addressId)) {
        localStorage.setItem('activeAddressId', addressId)
        setActiveAddressId(addressId)
      }
    } catch (error) {
      console.error('Error selecting address:', error)
    }
  }, [getStoredAddresses])

  // Obtener dirección activa
  const getActiveAddress = useCallback((): Address | undefined => {
    const storedAddresses = getStoredAddresses()
    const address = storedAddresses.find(addr => addr.id === activeAddressId)
    console.log('Getting active address:', { activeAddressId, address })
    return address
  }, [activeAddressId, getStoredAddresses])

  // Borrar dirección
  const deleteAddress = useCallback(async (addressId: string) => {
    try {
      const currentAddresses = getStoredAddresses()
      const updatedAddresses = currentAddresses.filter(addr => addr.id !== addressId)
      
      // Actualizar localStorage
      saveAddressesToStorage(updatedAddresses)
      
      // Actualizar estado
      setAddresses(updatedAddresses)
      
      // Si la dirección borrada era la activa, limpiar activeAddressId
      if (activeAddressId === addressId) {
        localStorage.removeItem('activeAddressId')
        setActiveAddressId(null)
      }
      
      return true
    } catch (error) {
      console.error('Error deleting address:', error)
      return false
    }
  }, [activeAddressId, getStoredAddresses, saveAddressesToStorage])

  const updateAddress = useCallback((address: Address) => {
    try {
      const currentAddresses = getStoredAddresses()
      const updatedAddresses = currentAddresses.map(addr => 
        addr.id === address.id ? address : addr
      )
      saveAddressesToStorage(updatedAddresses)
      setAddresses(updatedAddresses)
      return address
    } catch (error) {
      console.error('Error updating address:', error)
      return null
    }
  }, [getStoredAddresses, saveAddressesToStorage])

  return {
    addresses,
    addAddress,
    selectAddress,
    getActiveAddress,
    deleteAddress,
    isLoaded,
    reloadAddresses,
    updateAddress,
  }
} 