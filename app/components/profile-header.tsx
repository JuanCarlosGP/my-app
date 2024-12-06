import { User } from 'lucide-react'

export function ProfileHeader({ phoneNumber }: { phoneNumber: string }) {
  return (
    <div className="relative -mx-4 mb-6">
      <div className="h-48 bg-gradient-to-b from-blue-400 to-blue-500 rounded-b-3xl">
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-white"
        >
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-3">
            <User className="w-16 h-16 text-gray-400" />
          </div>
          <span className="text-lg font-medium">{phoneNumber}</span>
        </div>
      </div>
    </div>
  )
}

