import { useState } from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import NavBar from '@/components/NavBar'
import ProductTable from '@/components/ProductTable'
import { useProducts } from '@/hooks/useProducts'
import { useProductCategories } from '@/hooks/useProductCategories'

export default function Dashboard () {
  const [selectedCategory, setSelectedCategory] = useState('')

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

  return (
    <>
      <NavBar />

      <Container sx={{ p: 3 }}>
        <Typography variant="h5" component="h1" mb={2}>
          Product List
        </Typography>

        <Box mb={3}>
          <TextField
            select
            variant="standard"
            label="Category"
            sx={{ minWidth: 120 }}
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
          </TextField>
        </Box>

        <ProductTable
          items={Products.data}
          pagination={Products.pagination}
          onPaginationChange={handlePaginationChange}
          loading={Products.loading}
        />
      </Container>
    </>
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
