"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Search } from "lucide-react"

export function SearchSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-sm cursor-pointer">
          <div className="p-2.5 bg-gray-100 rounded-full mb-2">
            <Search className="w-5 h-5 text-green-600" />
          </div>
          <span className="text-xs font-medium text-gray-700">Buscador</span>
        </div>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Buscador de Productos</SheetTitle>
        </SheetHeader>
        <div className="py-4">
          {/* Aquí puedes agregar el contenido de los productos recomendados */}
          <p>Contenido relacionado con el buscador...</p>
        </div>
      </SheetContent>
    </Sheet>
  )
} 