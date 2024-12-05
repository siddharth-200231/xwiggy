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
  Grid,
  Alert,
} from '@mui/material'

function Checkout() {
  const navigate = useNavigate()
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    nameOnCard: '',
  })
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.get('http://localhost:8080/changeDB')
      navigate('/success')
    } catch (err) {
      setError('Payment failed. Please try again.')
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Checkout
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Card Number"
                required
                value={paymentDetails.cardNumber}
                onChange={(e) => setPaymentDetails({
                  ...paymentDetails,
                  cardNumber: e.target.value
                })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Expiry Month"
                required
                value={paymentDetails.expiryMonth}
                onChange={(e) => setPaymentDetails({
                  ...paymentDetails,
                  expiryMonth: e.target.value
                })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Expiry Year"
                required
                value={paymentDetails.expiryYear}
                onChange={(e) => setPaymentDetails({
                  ...paymentDetails,
                  expiryYear: e.target.value
                })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="CVV"
                required
                value={paymentDetails.cvv}
                onChange={(e) => setPaymentDetails({
                  ...paymentDetails,
                  cvv: e.target.value
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name on Card"
                required
                value={paymentDetails.nameOnCard}
                onChange={(e) => setPaymentDetails({
                  ...paymentDetails,
                  nameOnCard: e.target.value
                })}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3 }}
          >
            Pay Now
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default Checkout 