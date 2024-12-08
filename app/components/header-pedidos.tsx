import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface HeaderPedidosProps {
  title: string
}

export function HeaderPedidos({ title }: HeaderPedidosProps) {
  return (
    <header className="flex justify-between items-center mb-4 pt-4 px-4">
      <div className="w-10" />
      <h1 className="text-xl font-bold truncate max-w-[450px]">{title}</h1>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <ArrowUpDown className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[96%]">
          <div className="space-y-4 py-4">
            <h2 className="text-lg font-semibold">Historial de Pedidos</h2>
            {/* Aquí puedes agregar el contenido del Sheet */}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}