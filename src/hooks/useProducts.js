import { useEffect, useState } from 'react'
import ProductsService from '@/services/products'
import { useSnackbar } from 'notistack'

export function useProducts () {
  const [products, setProducts] = useState([])
  const [pagination, setPagination] = useState({
    limit: 10,
    skip: 0,
    totalCount: 0
  })
  const [loading, setLoading] = useState(false)

  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    const { limit, skip } = pagination
    loadProducts({ limit, skip })
  }, [])

  const loadProducts = (query) => {
    setLoading(true)
    ProductsService.list(query)
      .then(res => {
        setProducts(res.data.products)
        setPagination(
          {
            limit: Math.max(res.data.limit, 10),
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

  return {
    data: products,
    pagination,
    loading,
    reload: loadProducts
  }
}
