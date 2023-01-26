import client from './_client'
import Cookies from 'js-cookie'

export default {
  login ({ username, password }) {
    return client
      .post('/auth/login', { username, password })
      .then((res) => {
        Cookies.set('token', res.data.token)
      })
  },
  logout () {
    Cookies.remove('token')
  }
}
