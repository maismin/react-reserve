import { Segment } from 'semantic-ui-react'
import { parseCookies } from 'nookies'
import axios from 'axios'
import CartItemList from '../components/Cart/CartItemList'
import CartSummary from '../components/Cart/CartSummary'
import baseUrl from '../utils/baseUrl'

const Cart = ({ user, products }) => {
  return (
    <Segment>
      <CartItemList user={user} products={products} />
      <CartSummary products={products} />
    </Segment>
  )
}

Cart.getInitialProps = async ctx => {
  const { token } = parseCookies(ctx)
  if (!token) {
    return { product: [] }
  }
  const url = `${baseUrl}/api/cart`
  const payload = { headers: { Authorization: token } }
  const response = await axios.get(url, payload)
  return { products: response.data }
}

export default Cart
