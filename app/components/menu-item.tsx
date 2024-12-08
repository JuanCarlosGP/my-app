import { LucideIcon } from 'lucide-react'

interface MenuItemProps {
  icon: LucideIcon
  label: string
  onClick?: () => void
  className?: string
  disabled?: boolean
  labelClassName?: string
}

export function MenuItem({ 
  icon: Icon, 
  label, 
  onClick, 
  className = "",
  labelClassName = "",
  disabled = false 
}: MenuItemProps) {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-center gap-4 px-4 py-3 hover:bg-gray-100 transition-colors
        ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
        ${className}`}
    >
      <Icon className="w-6 h-6" />
      <span className={labelClassName}>{label}</span>
    </button>
  )
}

