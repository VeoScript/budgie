import '../styles/tailwind.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import NextJSProgress from '../lib/NextJSProgressbar'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <NextJSProgress />
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
