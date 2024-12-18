interface QuickAccessButtonProps {
  icon: React.ReactNode
  label: string
  color: string
}

export function QuickAccessButton({ icon, label, color }: QuickAccessButtonProps) {
  return (
    <div className="flex-1 flex flex-col items-center py-5 hover:bg-gray-50 transition-colors cursor-pointer">
      <div className={`p-3 ${color} rounded-xl mb-2.5 transition-transform hover:scale-105`}>
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-600">{label}</span>
    </div>
  )
} 