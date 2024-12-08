import Image from 'next/image'
import { Separator } from "@/components/ui/separator"

interface CategoryCardProps {
  id: string
  name: string
  description?: string
  subdescription?: string
  imageUrl: string
  onClick?: () => void
}

export function CategoryCard({ id, name, description, subdescription, imageUrl }: CategoryCardProps) {
  return (
    <div className="bg-white border-b border-gray-200 py-4 rounded-lg m-2 cursor-pointer hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        <div className="w-20 h-20 relative shrink-0 ml-2">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="rounded object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-base font-semibold text-gray-900 mb-3">{name}</h2>
          <p className="text-sm text-gray-500">{description}</p>
          <Separator />
          <p className="text-sm text-gray-600 mt-1">{subdescription}</p>
        </div>
      </div>
    </div>
  )
}
