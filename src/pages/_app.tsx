import type { AppProps } from 'next/app'
import type { FC } from 'react'
import '../styles/globals.css'
import initAxios from '@/libs/axios'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

initAxios()

const MyApp: FC = ({ Component, pageProps }: AppProps) => (
  <div>
    <Component {...pageProps} />
    <ToastContainer />
  </div>
)

export default MyApp
