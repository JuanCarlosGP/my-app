import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

interface FeedbackSheetProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function FeedbackSheet({ isOpen, onOpenChange }: FeedbackSheetProps) {
  const [isFirstFocus, setIsFirstFocus] = useState(true)

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (isFirstFocus) {
      e.target.blur()
      setIsFirstFocus(false)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => {
      if (open) {
        setIsFirstFocus(true)
      }
      onOpenChange(open)
    }}>
      <SheetContent 
        side="right" 
        className="w-full h-full border-none md:w-[400px] lg:w-[540px] p-0 md:p-6"
      >
        <div className="h-full flex flex-col">
          <SheetHeader className="p-6 md:p-0">
            <SheetTitle className="text-xl font-bold text-black">
              Enviar opiniones
            </SheetTitle>
            <SheetDescription className="text-gray-500">
              Nos encantaría escuchar tu opinión sobre la aplicación.💖
            </SheetDescription>
          </SheetHeader>
          
          <div className="flex-1 overflow-y-auto px-6 md:px-0">
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="feedback" className="text-gray-700">
                  Tu opinión
                </Label>
                <Textarea 
                  id="feedback" 
                  placeholder="Cuéntanos qué podemos mejorar..." 
                  className="min-h-[150px] bg-white border-gray-200"
                  autoFocus={false}
                  autoComplete="off"
                  onFocus={handleFocus}
                />
              </div>
            </div>
          </div>

          <SheetFooter className="p-6 md:p-0">
            <SheetClose asChild>
              <Button 
                type="submit"
                className="w-full md:w-auto"
                variant="default"
              >
                Enviar opinión
              </Button>
            </SheetClose>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  )
} 