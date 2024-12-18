"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { QuickAccessButton } from "./quick-access-button"
import { Sparkles } from "lucide-react"

export function NewProductsSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div>
          <QuickAccessButton
            icon={<Sparkles className="w-5 h-5 text-blue-600" />}
            label="Novedades"
            color="bg-blue-50"
          />
        </div>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Nuevos Productos</SheetTitle>
        </SheetHeader>
        <div className="py-4">
          {/* Aquí puedes agregar el contenido de los nuevos productos */}
          <p>Contenido de nuevos productos...</p>
        </div>
      </SheetContent>
    </Sheet>
  )
} 