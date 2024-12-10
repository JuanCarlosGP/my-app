"use client"

import { useState, useEffect, useCallback } from 'react'

export interface Address {
  id: string
  name: string
  address: string
  phone: string
}

export const useAddresses = () => {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [activeAddressId, setActiveAddressId] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const reloadAddresses = useCallback(() => {
    console.log('Reloading addresses...')
    const savedAddresses = localStorage.getItem('userAddresses')
    const activeId = localStorage.getItem('activeAddressId')
    
    if (savedAddresses) {
      const parsedAddresses = JSON.parse(savedAddresses)
      console.log('Loaded addresses:', parsedAddresses)
      setAddresses(parsedAddresses)
    }
    
    if (activeId) {
      console.log('Loaded active ID:', activeId)
      setActiveAddressId(activeId)
    }
  }, [])

  // Cargar direcciones y dirección activa al iniciar
  useEffect(() => {
    if (!isLoaded) {
      reloadAddresses()
      setIsLoaded(true)
    }
  }, [isLoaded, reloadAddresses])

  // Agregar nueva dirección
  const addAddress = (address: Omit<Address, 'id'>) => {
    try {
      const newAddress = {
        id: Date.now().toString(),
        ...address
      }
      
      const updatedAddresses = [...addresses, newAddress]
      setAddresses(updatedAddresses)
      localStorage.setItem('userAddresses', JSON.stringify(updatedAddresses))
      
      // Establecer como dirección activa
      setActiveAddressId(newAddress.id)
      localStorage.setItem('activeAddressId', newAddress.id)
      
      return newAddress
    } catch (error) {
      console.error('Error adding address:', error)
      return null
    }
  }

  // Seleccionar dirección activa
  const selectAddress = (addressId: string) => {
    try {
      console.log('Setting active address ID:', addressId)
      setActiveAddressId(addressId)
      localStorage.setItem('activeAddressId', addressId)
      // Forzar recarga de direcciones
      reloadAddresses()
    } catch (error) {
      console.error('Error selecting address:', error)
    }
  }

  // Obtener dirección activa
  const getActiveAddress = useCallback((): Address | undefined => {
    console.log('Getting active address. Active ID:', activeAddressId)
    console.log('Available addresses:', addresses)
    const address = addresses.find(addr => addr.id === activeAddressId)
    console.log('Found address:', address)
    return address
  }, [addresses, activeAddressId])

  // Borrar dirección
  const deleteAddress = (addressId: string) => {
    try {
      setAddresses(currentAddresses => {
        const updatedAddresses = currentAddresses.filter(addr => addr.id !== addressId)
        localStorage.setItem('userAddresses', JSON.stringify(updatedAddresses))
        return updatedAddresses
      })
      
      // Si la dirección borrada era la activa, limpiar activeAddressId
      if (activeAddressId === addressId) {
        setActiveAddressId(null)
        localStorage.removeItem('activeAddressId')
      }
      
      reloadAddresses()
      return true
    } catch (error) {
      console.error('Error deleting address:', error)
      return false
    }
  }

  return {
    addresses,
    addAddress,
    selectAddress,
    getActiveAddress,
    deleteAddress,
    isLoaded,
    reloadAddresses
  }
} 