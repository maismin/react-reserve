import { useState, useEffect } from 'react'
import { Button, Segment, Divider } from 'semantic-ui-react'
import calculateCartTotal from '../../utils/calculateCartTotal'

const CartSummary = ({ products }) => {
  const [cartAmount, setCartAmount] = useState(0)
  const [stripAmount, setStripeAmount] = useState(0)
  const [isCartEmpty, setCartEmpty] = useState(false)

  useEffect(() => {
    const { cartTotal, stripeTotal } = calculateCartTotal(products)
    setCartAmount(cartTotal)
    setStripeAmount(stripeTotal)
    setCartEmpty(products.length === 0)
  }, [products])

  return (
    <>
      <Divider />
      <Segment clearing size="large">
        <strong>Sub total:</strong> ${cartAmount}
        <Button
          icon="cart"
          disabled={isCartEmpty}
          color="teal"
          floated="right"
          content="Checkout"
        />
      </Segment>
    </>
  )
}

export default CartSummary
