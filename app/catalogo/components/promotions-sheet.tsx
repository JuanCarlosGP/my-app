"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tag } from "lucide-react"

export function PromotionsSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-sm cursor-pointer">
          <div className="p-2.5 bg-gray-100 rounded-full mb-2">
            <Tag className="w-5 h-5 text-red-600" />
          </div>
          <span className="text-xs font-medium text-gray-700">Promoción</span>
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