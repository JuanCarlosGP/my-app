"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { QuickAccessButton } from "./quick-access-button"
import { Tag } from "lucide-react"

export function PromotionsSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div>
          <QuickAccessButton
            icon={<Tag className="w-5 h-5 text-rose-600" />}
            label="Promociones"
            color="bg-rose-50"
          />
        </div>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Promociones</SheetTitle>
        </SheetHeader>
        <div className="py-4">
          {/* Aquí puedes agregar el contenido de las promociones */}
          <p>Contenido de promociones...</p>
        </div>
      </SheetContent>
    </Sheet>
  )
} 