import client from './_client'

export default {
  login ({ username, password }) {
    return client.post('/auth/login', { username, password })
  }
}
