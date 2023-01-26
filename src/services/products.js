import client from './_client'

export default {
  list (params) {
    return client.get('/products', { params })
  }
}
