import App from 'next/app'
import Layout from '../components/_App/Layout'
import axios from 'axios'
import { parseCookies } from 'nookies'
import { redirectUser } from '../utils/auth'
import baseUrl from '../utils/baseUrl'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const { token } = parseCookies(ctx)
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    if (!token) {
      // User isn't authenticated
      const isProtectedRoute =
        ctx.pathname === '/account' || ctx.pathname === '/create'
      if (isProtectedRoute) {
        redirectUser(ctx, '/login')
      }
    } else {
      // Get user account with token
      try {
        const url = `${baseUrl}/api/account`
        // To use jwt for authorization, it needs to be in the header
        const payload = { headers: { authorization: token } }
        const response = await axios.get(url, payload)
        const user = response.data
        pageProps.user = user
      } catch (error) {
        console.error('Error getting current user', error)
      }
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    )
  }
}

export default MyApp
