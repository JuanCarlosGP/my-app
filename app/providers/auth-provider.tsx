'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { getSession, type Session } from '@/app/lib/auth'

interface AuthContextType {
  session: Session | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    async function checkSession() {
      try {
        const session = await getSession()
        setSession(session)

        const isPublicRoute = ['/login', '/register'].includes(pathname)
        
        if (!session && !isPublicRoute) {
          router.push('/login')
        } else if (session && isPublicRoute) {
          router.push('/')
        }
      } catch (error) {
        console.error('Error checking session:', error)
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [pathname, router])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
        <p>Cargando...</p>
      </div>
    </div>
  }

  const isPublicRoute = ['/login', '/register'].includes(pathname)
  if (!session && !isPublicRoute) {
    return null // No renderizar nada si no hay sesión y no es una ruta pública
  }

  return (
    <AuthContext.Provider value={{ session, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext) 