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
    <header className="flex justify-between items-center mb-4 pt-4 px-4">
      <Button variant="ghost" onClick={onSearchClick}>
        
      </Button>
      <h1 className="text-xl font-bold truncate max-w-[450px]">{title}</h1>
        <Button variant="ghost" size="icon" onClick={onAddClick}>
          <Plus className="h-6 w-6" />
        </Button>
    </header>
  )
}