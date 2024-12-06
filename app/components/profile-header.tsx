import { User } from 'lucide-react'

export function ProfileHeader({ phoneNumber }: { phoneNumber: string }) {
  return (
    <div className="">
      <div className="h-48 bg-gradient-to-b from-blue-400 to-blue-500 rounded-b-3xl flex flex-col items-center justify-center text-white">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-3">
          <User className="w-16 h-16 text-gray-400" />
        </div>
        <span className="text-lg font-medium">{phoneNumber}</span>
      </div>
    </div>
  )
}
