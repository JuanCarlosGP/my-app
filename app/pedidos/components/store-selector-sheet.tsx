import { Button } from '@/components/ui/button'
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { useCart } from "@/hooks/use-cart"

interface StoreSelectorSheetProps {
  isOpen: boolean
  onClose: () => void
}

export function StoreSelectorSheet({ isOpen, onClose }: StoreSelectorSheetProps) {
  const { getUniqueStores, selectedStoreId, setSelectedStoreId } = useCart()
  const uniqueStores = getUniqueStores()

  const handleStoreSelect = (storeId: string) => {
    setSelectedStoreId(storeId)
    onClose()
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[100%]">
        <div className="space-y-4 py-4">
          <h2 className="text-lg font-semibold text-center">Cambiar Tienda</h2>
          <div className="space-y-2 px-4">
            {uniqueStores.map((store) => (
              <Button
                key={store.id}
                variant={selectedStoreId === store.id ? "default" : "ghost"}
                className="w-full justify-start text-left"
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