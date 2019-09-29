import { Input } from 'semantic-ui-react'
import { useState } from 'react'

const AddProductToCart = () => {
  const [quantity, setQuantity] = useState(1)

  return (
    <Input
      type="number"
      min="1"
      value={quantity}
      onChange={event => setQuantity(Number(event.target.value))}
      placeholder="Quantity"
      action={{
        color: 'orange',
        content: 'Add to Cart',
        icon: 'plus cart',
      }}
    />
  )
}

export default AddProductToCart
