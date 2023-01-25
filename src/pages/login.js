import { useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import auth from '@/services/auth'

export default function Login () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const submit = (e) => {
    e.preventDefault()

    auth.login({ username, password })
      .then((res) => {
        Cookies.set('token', res.data.token)
        router.push('/')
      })
      .catch(() => {
        alert('wrong password')
      })
  }

  return (
    <div>
      <div>Login</div>

      <form onSubmit={submit}>
        <div>
          <label>
            <span>Username</span>
            <br />
            <input
              value={username}
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            <span>Password</span>
            <br />
            <input
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>

        <button type="submit">LOGIN</button>
      </form>
    </div>
  )
}
