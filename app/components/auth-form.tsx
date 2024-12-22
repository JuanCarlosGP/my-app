"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signIn, signUp } from '@/app/lib/auth'

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    wechat_id: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (isLogin) {
        await signIn(formData.email, formData.password)
      } else {
        const metadata = {
          name: formData.name,
          phone: formData.phone,
          wechat_id: formData.wechat_id
        }
        await signUp(formData.email, formData.password, metadata)
      }
    } catch (error) {
      console.error('Auth error:', error)
      alert('Error en autenticación')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <Input
        type="password"
        placeholder="Contraseña"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      
      {!isLogin && (
        <>
          <Input
            placeholder="Nombre"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            placeholder="Teléfono"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <Input
            placeholder="WeChat ID"
            value={formData.wechat_id}
            onChange={(e) => setFormData({ ...formData, wechat_id: e.target.value })}
          />
        </>
      )}

      <Button type="submit" className="w-full">
        {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
      </Button>

      <Button
        type="button"
        variant="link"
        onClick={() => setIsLogin(!isLogin)}
        className="w-full"
      >
        {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
      </Button>
    </form>
  )
} 