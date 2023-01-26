import { useState } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import AuthService from '@/services/auth'

export function useAuth () {
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const login = async (credentials) => {
    try {
      setLoading(true)
      const res = await AuthService.login(credentials)
      Cookies.set('token', res.data.token)
      router.push('/')
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    Cookies.remove('token')
    router.push('/')
  }

  return {
    login,
    logout,
    loading
  }
}
