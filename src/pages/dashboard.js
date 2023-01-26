import { useState } from 'react'
import { useRouter } from 'next/router'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import ProductTable from '@/components/ProductTable'
import AuthService from '@/services/auth'
import { useProducts } from '@/hooks/useProducts'
import { useProductCategories } from '@/hooks/useProductCategories'

export default function Dashboard () {
  const [selectedCategory, setSelectedCategory] = useState('')

  const router = useRouter()

  const Products = useProducts()
  const Categories = useProductCategories()

  const handlePaginationChange = (pagination) => {
    const { limit, skip } = pagination
    Products.reload({ limit, skip, category: selectedCategory })
  }

  const handleCategoryChange = (e) => {
    const { limit } = Products.pagination

    setSelectedCategory(e.target.value)

    Products.reload({
      limit,
      skip: 0,
      category: e.target.value
    })
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

      <FormControl
        variant="standard"
        sx={{ m: 1, minWidth: 120 }}
        disabled={Categories.loading}
      >
        <InputLabel>Category</InputLabel>
        <Select
          value={selectedCategory}
          label="Category"
          onChange={handleCategoryChange}
        >
          <MenuItem value="">
            <em>none</em>
          </MenuItem>
          {Categories.data.map((category, index) => (

            <MenuItem
              key={index}
              value={category}
            >
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <ProductTable
        items={Products.data}
        pagination={Products.pagination}
        onPaginationChange={handlePaginationChange}
        loading={Products.loading}
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
