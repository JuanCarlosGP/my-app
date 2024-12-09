import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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

interface ProfileSheetProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  phoneNumber: string
}

export function ProfileSheet({ isOpen, onOpenChange, phoneNumber }: ProfileSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent 
        side="right" 
        className="w-full h-full border-none lg:w-[540px] p-0"
      >
        <div className="h-full flex flex-col">
          <SheetHeader className="p-6 ">
            <SheetTitle className="text-xl font-bold text-black">
              Editar perfil
            </SheetTitle>
            <SheetDescription className="text-gray-500">
              Modifica los datos de tu perfil aquí. Haz clic en guardar cuando termines.
            </SheetDescription>
          </SheetHeader>
          
          <div className="flex-1 overflow-y-auto px-6 ">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right text-gray-700">
                  Nombre
                </Label>
                <Input 
                  id="name" 
                  placeholder="Tu nombre" 
                  className="col-span-3 bg-white border-gray-200" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right text-gray-700">
                  Teléfono
                </Label>
                <Input 
                  id="phone" 
                  value={phoneNumber} 
                  disabled 
                  className="col-span-3 bg-gray-50 border-gray-200" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="passwd" className="text-right text-gray-700">
                  Contraseña
                </Label>
                <Input 
                  id="passwd" 
                  type="password" 
                  placeholder="Tu contraseña" 
                  className="col-span-3 bg-white border-gray-200"
                />
              </div>
            </div>
          </div>

          <SheetFooter className="p-6 ">
            <SheetClose asChild>
              <Button 
                type="submit"
                className="w-full "
                variant="default"
              >
                Guardar perfil
              </Button>
            </SheetClose>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  )
} 