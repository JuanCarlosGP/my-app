import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

interface CustomSheetProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function CustomSheet({ isOpen, onOpenChange }: CustomSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent 
        side="right" 
        className="w-full h-full border-none md:w-[400px] lg:w-[540px] p-0 md:p-6"
      >
        <div className="h-full flex flex-col">
          <SheetHeader className="p-6 md:p-0">
            <SheetTitle className="text-xl font-bold text-black">
              Personalizar
            </SheetTitle>
            <SheetDescription className="text-gray-500">
              Personaliza la apariencia de tu aplicación.
            </SheetDescription>
          </SheetHeader>
          
          <div className="flex-1 overflow-y-auto px-6 md:px-0">
            <div className="grid gap-4 py-4">
              {/* Aquí irá el contenido de personalización */}
            </div>
          </div>

          <SheetFooter className="p-6 md:p-0">
            <SheetClose asChild>
              <Button 
                type="submit"
                className="w-full md:w-auto"
                variant="default"
              >
                Guardar cambios
              </Button>
            </SheetClose>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  )
} 