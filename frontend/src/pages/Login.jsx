import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from '@mui/material'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Redirect if already logged in
    const userData = sessionStorage.getItem('userData')
    if (userData) {
      const user = JSON.parse(userData)
      navigate(user.merchant ? '/merchant' : '/menu')
    }
  }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', formData)
      
      if (response.data.user) {
        sessionStorage.setItem('token', response.data.token)
        sessionStorage.setItem('userData', JSON.stringify(response.data.user))
        
        const redirectTo = location.state?.from || (response.data.user.merchant ? '/merchant' : '/menu')
        navigate(redirectTo, { replace: true })
      } else {
        setError('Login failed. Please try again.')
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please try again.'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login to SpringFood
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            required
            disabled={loading}
            value={formData.username}
            onChange={(e) => setFormData({
              ...formData,
              username: e.target.value
            })}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            required
            disabled={loading}
            value={formData.password}
            onChange={(e) => setFormData({
              ...formData,
              password: e.target.value
            })}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ mt: 3 }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
          <Button
            fullWidth
            variant="outlined"
            size="large"
            disabled={loading}
            sx={{ mt: 2 }}
            onClick={() => navigate('/register')}
          >
            Register
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default Login 