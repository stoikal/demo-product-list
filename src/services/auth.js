import client from './_client'
import Cookies from 'js-cookie'

export default {
  login ({ username, password }) {
    return client.post('/auth/login', { username, password })
  },
  logout () {
    Cookies.remove('token')
  }
}
