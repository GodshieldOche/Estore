import Layout from "../../components/layout/Layout";
import Products from "../../components/Products";
import { getAllProducts, getFilters } from "../../redux/features/products";
import { wrapper } from "../../redux/store";


export default function SignInPage() {
    return (
        <Layout>
            <Products />
        </Layout>
    )
}


export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, query }) => {
    const { keyword, category, brand } = query
    await store.dispatch(getAllProducts({req, keyword, category, brand}))
    await store.dispatch(getFilters(req))
})