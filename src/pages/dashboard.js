import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import products from '@/services/products'

export default function Dashboard () {
  const router = useRouter()

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = () => {
    products.list()
      .then(res => {
        console.log('===~res~===', res)
      })
      .catch(console.log)
  }

  const logout = () => {
    Cookies.remove('token')
    router.push('/')
  }

  return (
    <div>
      <h1>DASHBOARD</h1>
      <button onClick={logout}>logout</button>
    </div>
  )
}

export async function getServerSideProps (ctx) {
  const { cookies } = ctx.req

  if (!cookies.token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
