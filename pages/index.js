import { useEffect } from 'react'
import axios from 'axios'
import ProductList from '../components/Index/ProductList'

const Home = ({ products }) => {
  return <ProductList products={products} />
}

Home.getInitialProps = async () => {
  // fetch data on server
  // return response data as an object
  // this object is merged with existing props
  const url = 'http://localhost:3000/api/products'
  const response = await axios.get(url)
  return { products: response.data }
}

export default Home
