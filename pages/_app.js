import '../styles/globals.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Layout from "../components/layout/Layout";
import { wrapper } from '../redux/store'
import NextNprogress from 'nextjs-progressbar';
import Script from 'next/script'


function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <NextNprogress />
      <Script src="https://cdn.jsdelivr.net/npm/tw-elements/dist/js/index.min.js"></Script>
      <Component {...pageProps} />
    </Layout>
  )
}

export default wrapper.withRedux(MyApp)
