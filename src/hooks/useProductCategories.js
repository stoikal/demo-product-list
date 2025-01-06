import { useEffect, useState } from 'react'
import ProductsService from '@/services/products'
import { useSnackbar } from 'notistack'

/**
 * @param {Object} category
 * @param {string} category.slug
 * @param {string} category.name
 * @param {string} category.url
 */
const mapCategories = (category) => ({
  value: category.slug,
  name: category.name
})

export function useProductCategories () {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = () => {
    setLoading(true)
    ProductsService.listCategory()
      .then(res => {
        setCategories(
          res.data.map(mapCategories)
        )
      })
      .catch(() => {
        enqueueSnackbar(
          'Failed to load categories!',
          { variant: 'error' }
        )
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return {
    data: categories,
    loading
  }
}
