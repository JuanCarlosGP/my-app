import { Input } from '@/components/ui/input'

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="mb-4 pt-4 px-4">
      <h1 className="text-xl font-bold text-center">{title}</h1>
    </header>
  )
}