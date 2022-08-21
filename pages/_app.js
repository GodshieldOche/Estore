import '../styles/globals.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Layout from "../components/layout/Layout";
import { wrapper } from '../redux/store'
import NextNprogress from 'nextjs-progressbar';
import Script from 'next/script'
import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client'


function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <NextNprogress />
        <Script src="https://cdn.jsdelivr.net/npm/tw-elements/dist/js/index.min.js"></Script>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  )
}

export default wrapper.withRedux(MyApp)
