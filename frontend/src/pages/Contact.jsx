import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Box,
  Alert,
} from '@mui/material'

function Contact() {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const userData = JSON.parse(sessionStorage.getItem('userData'))
      const response = await axios.post('http://localhost:8080/contact', {
        name: `${userData.firstname} ${userData.lastname}`,
        email: userData.email,
        message,
      })
      if (response.data) {
        setSuccess(true)
        setMessage('')
      }
    } catch (err) {
      setError('Failed to send message. Please try again.')
    }
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Contact Us
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Message sent successfully!
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            multiline
            rows={6}
            label="Your Message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
          >
            Send Message
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default Contact 