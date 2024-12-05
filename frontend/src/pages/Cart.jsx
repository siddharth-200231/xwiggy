import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
} from '@mui/material'

function Cart() {
  const navigate = useNavigate()
  const [menuItems, setMenuItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = sessionStorage.getItem('userData')
        if (!userData) {
          navigate('/login')
          return
        }

        const { username } = JSON.parse(userData)
        
        // Fetch menu items
        const menuResponse = await api.get('/menu')
        setMenuItems(menuResponse.data)

        // Fetch cart items for the user
        const cartResponse = await api.get(`/getCarts?userId=${username}`)
        if (cartResponse.data && cartResponse.data.length > 0) {
          setCartItems(cartResponse.data)
          // Calculate total from cart items
          const cartTotal = calculateTotal(cartResponse.data[0], menuResponse.data)
          setTotal(cartTotal)
        } else {
          setError('Your cart is empty')
        }
      } catch (err) {
        setError('Failed to load cart')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [navigate])

  const calculateTotal = (cart, menuItems) => {
    if (!cart || !menuItems) return 0
    
    let total = 0
    total += cart.quantity1 * (menuItems[0]?.price || 0)
    total += cart.quantity2 * (menuItems[1]?.price || 0)
    total += cart.quantity3 * (menuItems[2]?.price || 0)
    total += cart.quantity4 * (menuItems[3]?.price || 0)
    total += cart.quantity5 * (menuItems[4]?.price || 0)
    total += cart.quantity6 * (menuItems[5]?.price || 0)
    return total
  }

  const handleCheckout = async () => {
    try {
      await api.post('/changeDB')
      sessionStorage.removeItem('cartItems')
      sessionStorage.removeItem('total')
      navigate('/checkout')
    } catch (err) {
      setError('Checkout failed')
      console.error(err)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menuItems.map((menuItem, index) => {
              const quantity = cartItems[0]?.[`quantity${index + 1}`] || 0
              if (quantity === 0) return null

              return (
                <TableRow key={index}>
                  <TableCell>{menuItem.item}</TableCell>
                  <TableCell align="right">₹{menuItem.price}</TableCell>
                  <TableCell align="center">{quantity}</TableCell>
                  <TableCell align="right">₹{menuItem.price * quantity}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 4, textAlign: 'right' }}>
        <Typography variant="h5" gutterBottom>
          Total: ₹{total}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCheckout}
          sx={{ mt: 2 }}
          disabled={total === 0}
        >
          Proceed to Checkout
        </Button>
      </Box>
    </Container>
  )
}

export default Cart 