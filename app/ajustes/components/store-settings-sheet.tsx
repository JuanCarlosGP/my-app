'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

interface StoreSettingsSheetProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function StoreSettingsSheet({ isOpen, onOpenChange }: StoreSettingsSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Configuración de mi tienda</SheetTitle>
        </SheetHeader>
        
        {/* Aquí irá el contenido del formulario de configuración */}
        <div className="mt-4">
          {/* Contenido pendiente de implementar */}
        </div>
      </SheetContent>
    </Sheet>
  )
} 