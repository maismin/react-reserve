import { useEffect } from 'react'
import axios from 'axios'

const Home = () => {
  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    const url = 'http://localhost:3000/api/products'
    const response = await axios.get(url)
    console.log(response.data)
  }

  return <>home</>
}

export default Home
