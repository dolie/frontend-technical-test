import type { AppProps } from 'next/app'
import type { FC, ReactElement, ReactNode } from 'react'
import '../styles/globals.css'
import initAxios from '@/libs/axios'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import type { NextPage } from 'next'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

initAxios()

const MyApp: FC = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? (page => page)

  return (
    <div className="bg-black text-white sm:text-xl w-full h-full">
      {getLayout(<Component {...pageProps} />)}
      <ToastContainer theme="dark" position="top-center" />
    </div>
  )
}

export default MyApp
