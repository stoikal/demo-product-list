import client from './_client'

export default {
  list () {
    return client.get('/products')
  }
}
