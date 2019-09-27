import mongoose from 'mongoose'
import shortid from 'shortid'

const { Number, String } = mongoose.Schema.Types

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  sku: {
    type: String,
    unique: true,
    default: shortid.generate(),
  },
  description: {
    type: String,
    required: true,
  },
  mediaUrl: {
    type: String,
    required: true,
  },
})

/* Since we are using a serverless configuration
 * we need to check that the model hasn't already been
 * generated
 */

export default mongoose.models.Product ||
  mongoose.model('Product', ProductSchema)
