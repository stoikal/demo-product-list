import client from './_client'

export default {
  list ({ limit, skip, category }) {
    let path = '/products'

    if (category) {
      path += `/category/${category}`
    }

    return client.get(path, { params: { limit, skip } })
  },

  listCategory () {
    return client.get('/products/categories')
  }
}
