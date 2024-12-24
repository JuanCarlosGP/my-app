"use client"

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import type { Address } from '../types/address'

export type { Address }

export function useAddresses() {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [activeAddressId, setActiveAddressId] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    fetchAddresses()
  }, [])

  const fetchAddresses = async () => {
    try {
      const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setAddresses(data || [])
      setIsLoaded(true)
    } catch (error) {
      console.error('Error fetching addresses:', error)
      setIsLoaded(true)
    }
  }

  const addAddress = async (address: Omit<Address, 'id'>) => {
    try {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) throw new Error('No authenticated user')

      const { data, error } = await supabase
        .from('addresses')
        .insert([{
          ...address,
          profile_id: userData.user.id
        }])
        .select()

      if (error) throw error
      fetchAddresses()
      return true
    } catch (error) {
      console.error('Error adding address:', error)
      return false
    }
  }

  const updateAddress = async (address: Address) => {
    try {
      const { error } = await supabase
        .from('addresses')
        .update(address)
        .eq('id', address.id)

      if (error) throw error
      fetchAddresses()
      return true
    } catch (error) {
      console.error('Error updating address:', error)
      return false
    }
  }

  const deleteAddress = async (id: string) => {
    try {
      const { error } = await supabase
        .from('addresses')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchAddresses()
      return true
    } catch (error) {
      console.error('Error deleting address:', error)
      return false
    }
  }

  const selectAddress = useCallback((addressId: string) => {
    setActiveAddressId(addressId)
    // Guardar en localStorage para persistencia
    localStorage.setItem('activeAddressId', addressId)
  }, [])

  const getActiveAddress = useCallback(() => {
    // Primero intentar obtener de state
    if (activeAddressId) {
      const address = addresses.find(addr => addr.id === activeAddressId)
      if (address) return address
    }

    // Si no hay en state, intentar obtener de localStorage
    const savedAddressId = localStorage.getItem('activeAddressId')
    if (savedAddressId) {
      const address = addresses.find(addr => addr.id === savedAddressId)
      if (address) {
        setActiveAddressId(savedAddressId)
        return address
      }
    }

    // Si no hay dirección activa, retornar la primera
    if (addresses.length > 0) {
      setActiveAddressId(addresses[0].id)
      localStorage.setItem('activeAddressId', addresses[0].id)
      return addresses[0]
    }

    return undefined
  }, [activeAddressId, addresses])

  return {
    addresses,
    addAddress,
    updateAddress,
    deleteAddress,
    reloadAddresses: fetchAddresses,
    selectAddress,
    getActiveAddress,
    isLoaded,
    activeAddressId
  }
} 