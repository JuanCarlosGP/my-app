import { type LucideIcon } from 'lucide-react'

interface MenuItemProps {
  icon: LucideIcon
  label: string
  onClick?: () => void
}

export function MenuItem({ icon: Icon, label, onClick }: MenuItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors"
    >
      <Icon className="w-6 h-6 text-gray-500" />
      <span className="text-gray-700">{label}</span>
    </button>
  )
}

