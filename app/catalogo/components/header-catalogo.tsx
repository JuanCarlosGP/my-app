import { Button } from '@/components/ui/button'

interface HeaderProps {
  title: string
  showAddButton?: boolean
  onAddClick?: () => void
  onSearchClick?: () => void
}

export function HeaderCatalogo({ title, showAddButton = false, onAddClick, onSearchClick }: HeaderProps) {
  return (
    <header className="flex justify-between items-center mb-4 pt-4 px-4">
      <h1 className="text-[1.1rem] font-bold truncate max-w-[450px] m-auto">{title}</h1>
    </header>
  )
}