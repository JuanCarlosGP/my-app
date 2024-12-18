import React, { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { StoreSelectorSheet } from './store-selector-sheet'
import { supabase } from '@/app/lib/supabase'
import { useAuth } from '@/app/providers/auth-provider'

interface HeaderPedidosProps {
  title: string
  onSearch: (term: string) => void
}

interface Store {
  id: string
  name: string
}

export function HeaderPedidos({ title, onSearch }: HeaderPedidosProps) {
  const [stores, setStores] = useState<Store[]>([])
  const [selectedStore, setSelectedStore] = useState<Store | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const { session } = useAuth()

  useEffect(() => {
    async function loadStores() {
      if (!session?.user?.id) return

      const { data, error } = await supabase
        .from('orders')
        .select(`
          store:stores (
            id,
            name
          )
        `)
        .eq('profile_id', session.user.id)
        .eq('status', 'draft')
        .single()

      if (error) {
        console.error('Error loading stores:', error)
        return
      }

      if (data?.store) {
        setStores([data.store])
        setSelectedStore(data.store)
      }
    }

    loadStores()
  }, [session?.user?.id])

  return (
    <header className="mb-4 pt-4 px-4">
      <h1 className="text-xl font-bold text-center">{title}</h1>
      {selectedStore && (
        <>
          <Button 
            variant="secondary" 
            onClick={() => setIsOpen(true)}
            className="mt-2 text-sm font-normal w-full"
          >
            {selectedStore.name}
          </Button>

          <div className="relative mt-4">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar productos..."
              className="pl-9 w-full"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </>
      )}

      <StoreSelectorSheet 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </header>
  )
} 