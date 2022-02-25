import Home from "../components/Home";
import Layout from "../components/layout/Layout";
import { getLatestProducts } from "../redux/features/latestProducts";
import { wrapper } from "../redux/store"


export default function HomePage() {
  return (
    <Layout>
      <Home />
    </Layout>
  )
}


export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, query }) => {
  await store.dispatch(getLatestProducts(req))
})