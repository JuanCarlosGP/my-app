import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { Store } from "@/app/context/cart-context"
import { useEffect, useState } from "react"

interface StoreSelectorSheetProps {
  isOpen: boolean
  onClose: () => void
}

export function StoreSelectorSheet({ isOpen, onClose }: StoreSelectorSheetProps) {
  const { getUniqueStores, selectedStoreId, setSelectedStoreId } = useCart()
  const [stores, setStores] = useState<Store[]>([])

  useEffect(() => {
    async function loadStores() {
      const storesList = await getUniqueStores()
      setStores(storesList)
    }
    if (isOpen) {
      loadStores()
    }
  }, [isOpen, getUniqueStores])

  const handleStoreSelect = (storeId: string) => {
    setSelectedStoreId(storeId)
    onClose()
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[50vh]">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-center">Cambiar Tienda</h2>
          <div className="space-y-2 px-4">
            {stores.map((store) => (
              <Button
                key={store.id}
                variant={selectedStoreId === store.id ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => handleStoreSelect(store.id)}
              >
                {store.name}
              </Button>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
} 