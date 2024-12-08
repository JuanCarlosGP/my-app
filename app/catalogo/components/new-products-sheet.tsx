"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { PlusCircle } from "lucide-react"

export function NewProductsSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-sm cursor-pointer">
          <div className="p-2.5 bg-gray-100 rounded-full mb-2">
            <PlusCircle className="w-5 h-5 text-blue-600" />
          </div>
          <span className="text-xs font-medium text-gray-700">Nuevo</span>
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