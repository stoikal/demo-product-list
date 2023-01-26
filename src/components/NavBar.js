import { useAuth } from '@/hooks/useAuth'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'

export default function NavBar () {
  const { logout } = useAuth()

  return (
    <AppBar position="static" sx={{ textAlign: 'center' }}>
      <Toolbar
        sx={{
          justifyContent: 'right'
        }}
      >
        <Button
          style={{ color: 'white', padding: '6px 16px' }}
          onClick={logout}
        >
          logout
        </Button>
      </Toolbar>
    </AppBar>
  )
}
