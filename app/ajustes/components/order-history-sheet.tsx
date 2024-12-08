import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

interface OrderHistorySheetProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function OrderHistorySheet({ isOpen, onOpenChange }: OrderHistorySheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent 
        side="right" 
        className="w-full h-full border-none md:w-[400px] lg:w-[540px] p-0 md:p-6"
      >
        <div className="h-full flex flex-col">
          <SheetHeader className="p-6 md:p-0">
            <SheetTitle className="text-xl font-bold text-black">
              Historial de compras
            </SheetTitle>
          </SheetHeader>
          
          <div className="flex-1 overflow-y-auto px-6 md:px-0">
            <div className="mt-6 text-center text-muted-foreground">
              No hay compras registradas todavía
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
