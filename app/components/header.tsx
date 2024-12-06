import { Search, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  title: string
  showAddButton?: boolean
  onAddClick?: () => void
  onSearchClick?: () => void
}

export function Header({ title, showAddButton = false, onAddClick, onSearchClick }: HeaderProps) {
  return (
    <header className="flex justify-between items-center mb-4">
      <Button variant="ghost" size="icon" onClick={onSearchClick}>
        <Search className="h-6 w-6" />
      </Button>
      <h1 className="text-xl font-bold">{title}</h1>
      {showAddButton ? (
        <Button variant="ghost" size="icon" onClick={onAddClick}>
          <Plus className="h-6 w-6" />
        </Button>
      ) : (
        <div className="w-10" /> // Espacio en blanco para mantener el centrado del título
      )}
    </header>
  )
}

