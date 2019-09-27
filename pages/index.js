import { useEffect } from 'react'
import axios from 'axios'

const Home = ({ products }) => {
  console.log(products)
  return <>home</>
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
