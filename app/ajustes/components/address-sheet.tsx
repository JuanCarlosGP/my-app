import { AddressForm, type AddressFormData } from '../../components/address-form'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

interface AddressSheetProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function AddressSheet({ isOpen, onOpenChange }: AddressSheetProps) {
  const handleAddressSubmit = (data: AddressFormData) => {
    console.log('Address form submitted:', data)
    onOpenChange(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent 
        side="right" 
        className="w-full h-full border-none md:w-[400px] lg:w-[540px] p-0 md:p-6"
      >
        <div className="h-full flex flex-col">
          <SheetHeader className="p-6 md:p-0">
            <SheetTitle className="text-xl font-bold text-black">
              Mi Dirección
            </SheetTitle>
            <SheetDescription className="text-gray-500">
              Administra tus direcciones aquí.
            </SheetDescription>
          </SheetHeader>
          
          <div className="flex-1 overflow-y-auto px-6 md:px-0">
            <AddressForm 
              isOpen={isOpen}
              onClose={() => onOpenChange(false)}
              onSave={handleAddressSubmit}
            />
          </div>

          <SheetFooter className="p-6 md:p-0">
            <SheetClose asChild>
              <Button 
                type="button"
                className="w-full md:w-auto"
                variant="default"
                onClick={() => onOpenChange(false)}
              >
                Cerrar
              </Button>
            </SheetClose>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  )
} 