'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/app/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

interface RegisterForm {
  email: string
  password: string
  name: string
  phone: string
  wechat_id: string
}

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<RegisterForm>({
    email: '',
    password: '',
    name: '',
    phone: '',
    wechat_id: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
          data: {
            name: formData.name,
            phone: formData.phone,
            wechat_id: formData.wechat_id
          }
        }
      })

      if (error) {
        console.error('Error de registro:', error)
        throw error
      }

      if (data.user) {
        console.log('Usuario creado:', data.user)
        alert('Por favor, verifica tu cuenta a través del enlace enviado a tu correo electrónico')
        router.push('/login')
      } else {
        throw new Error('No se pudo crear el usuario')
      }
    } catch (err: unknown) {
      console.error('Error en el registro:', err)
      setError(err instanceof Error ? err.message : 'Error en el registro')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crear cuenta
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}
          <div className="rounded-md shadow-sm space-y-4">
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              name="password"
              type="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Input
              name="name"
              type="text"
              placeholder="Nombre completo"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              name="phone"
              type="tel"
              placeholder="Teléfono"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <Input
              name="wechat_id"
              type="text"
              placeholder="WeChat ID (opcional)"
              value={formData.wechat_id}
              onChange={handleChange}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Creando cuenta...' : 'Crear cuenta'}
          </Button>

          <div className="text-sm text-center">
            <Link 
              href="/login" 
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              ¿Ya tienes cuenta? Inicia sesión
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
} 