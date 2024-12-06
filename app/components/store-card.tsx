import Image from 'next/image'

interface StoreCardProps {
  name: string
  phone: string
  description: string
  imageUrl: string
}

export function StoreCard({ name, phone, description, imageUrl }: StoreCardProps) {
  return (
    <div className="bg-white border-b border-gray-200 py-4">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 relative shrink-0">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="rounded object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-base font-semibold text-gray-900">{name}</h2>
          <p className="text-sm text-gray-500">Teléfono: {phone}</p>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
      </div>
    </div>
  )
} 