import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
import auth from '@/services/auth'
import logo from '@/assets/logo.png'
import { useSnackbar } from 'notistack'

export default function Login () {
  const [username, setUsername] = useState('kminchelle')
  const [password, setPassword] = useState('0lelplR')

  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()

  const submit = (e) => {
    e.preventDefault()

    auth.login({ username, password })
      .then((res) => {
        router.push('/')
      })
      .catch(() => {
        enqueueSnackbar('Incorrect username or password!', { variant: 'error' })
      })
  }

  return (
    <main>
      <Image
        src={logo}
        alt="logo"
        width={165}
        height={96}
      />

      <form onSubmit={submit}>
        <Typography variant="h5" component="h1">
          Login
        </Typography>

        <Typography variant="subtitle1">
          Please sign in to continue.
        </Typography>

        <TextField
          value={username}
          label="Username"
          variant="standard"
          onChange={(e) => setUsername(e.target.value)}
        />

        <br/>

        <TextField
          value={password}
          label="Password"
          type="password"
          variant="standard"
          onChange={(e) => setPassword(e.target.value)}
        />

        <br/>

        <LoadingButton
          variant="contained"
          disableElevation
          type="submit"
        >
          LOGIN
        </LoadingButton>
      </form>
    </main>
  )
}
