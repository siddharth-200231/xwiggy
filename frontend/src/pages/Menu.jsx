import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from '@mui/material'

function Menu() {
  const navigate = useNavigate()
  const [menuItems, setMenuItems] = useState([])
  const [quantities, setQuantities] = useState([])
  const [total, setTotal] = useState(0)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const userData = sessionStorage.getItem('userData')
    if (!userData) {
      navigate('/login')
      return
    }

    fetchMenu()
  }, [navigate])

  const fetchMenu = async () => {
    try {
      const response = await axios.get('http://localhost:8080/menu')
      setMenuItems(response.data)
      setQuantities(new Array(response.data.length).fill(0))
    } catch (err) {
      setError('Failed to load menu items')
    }
  }

  const handleQuantityChange = (index, value) => {
    const newQuantities = [...quantities]
    newQuantities[index] = Math.max(0, Math.min(value, menuItems[index].quantity))
    setQuantities(newQuantities)
  }

  const handleAddToCart = async () => {
    try {
      setLoading(true)
      const cartItems = quantities.map((quantity, index) => ({
        quantity1: quantity,
        quantity2: 0,
        quantity3: 0,
        quantity4: 0,
        quantity5: 0,
        quantity6: 0
      }))

      if (cartItems.every(item => item.quantity1 === 0)) {
        setError('Please select at least 1 item')
        return
      }

      const response = await axios.post('http://localhost:8080/addToCart', cartItems)
      if (response.data) {
        // Calculate total
        const newTotal = menuItems.reduce((sum, item, index) => {
          return sum + (item.price * quantities[index])
        }, 0)
        setTotal(newTotal)
        sessionStorage.setItem('cartTotal', newTotal.toString())
        
        // Show success message or navigate to cart
        navigate('/cart')
      }
    } catch (err) {
      setError('Failed to add items to cart')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Menu
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Grid container spacing={3}>
        {menuItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={item.url}
                alt={item.item}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {item.item}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Price: ₹{item.price}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Available: {item.quantity}
                </Typography>
                <TextField
                  type="number"
                  label="Quantity"
                  value={quantities[index]}
                  onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 0)}
                  InputProps={{ 
                    inputProps: { min: 0, max: item.quantity },
                    disabled: loading 
                  }}
                  fullWidth
                  margin="normal"
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        {total > 0 && (
          <Typography variant="h5" gutterBottom>
            Cart Total: ₹{total}
          </Typography>
        )}
        <Button
          variant="contained"
          size="large"
          onClick={handleAddToCart}
          disabled={loading}
          sx={{ mr: 2 }}
        >
          {loading ? 'Adding to Cart...' : 'Add to Cart'}
        </Button>
      </Box>
    </Container>
  )
}

export default Menu