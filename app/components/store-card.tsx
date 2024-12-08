import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Separator } from "@/components/ui/separator"

interface StoreCardProps {
  id: string
  name: string
  description?: string
  subdescription?: string
  imageUrl: string
  onClick?: () => void
}

export function StoreCard({ id, name, description, subdescription, imageUrl }: StoreCardProps) {
  return (
    <Link href={`/catalogo/${id}`}>
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
          <div className="flex-1 min-w-0 mr-2">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-gray-900">{name}</h2>
              <ChevronRight className="h-7 w-7 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500 truncate">{description}</p>
            <Separator />
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{subdescription}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
