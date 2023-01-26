import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import Typography from '@mui/material/Typography'
import productsService from '@/services/products'
import ProductTable from '@/components/ProductTable'
import AuthService from '@/services/auth'

export default function Dashboard () {
  const [products, setProducts] = useState([])
  const [pagination, setPagination] = useState({
    limit: 10,
    skip: 0,
    totalCount: 0
  })
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    const { limit, skip } = pagination
    loadProducts({ limit, skip })
  }, [])

  const loadProducts = (query) => {
    setLoading(true)
    productsService.list(query)
      .then(res => {
        setProducts(res.data.products)
        setPagination(
          {
            limit: res.data.limit,
            skip: res.data.skip,
            totalCount: res.data.total
          }
        )
      })
      .catch(() => {
        enqueueSnackbar(
          'Failed to load products!',
          { variant: 'error' }
        )
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handlePaginationChange = (pagination) => {
    const { limit, skip } = pagination
    loadProducts({ limit, skip })
  }

  const logout = () => {
    AuthService.logout()
    router.push('/')
  }

  return (
    <div>
      <button onClick={logout}>logout</button>
      <Typography variant="h5" component="h1">
        Product List
      </Typography>
      <ProductTable
        items={products}
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
        loading={loading}
      />
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
