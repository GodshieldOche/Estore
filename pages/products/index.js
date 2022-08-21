import Layout from "../../components/layout/Layout";
import Products from "../../components/Products";
import { getAllProducts, getFilters } from "../../redux/features/products";
import { wrapper } from "../../redux/store";
import { gql } from "apollo-server-micro";
import client from '../../apollo-client'


export default function SignInPage({products}) {
    return (
        <Layout>
            <Products />
        </Layout>
    )
}


export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, query }) => {
    const { keyword, category, brand } = query
    await store.dispatch(getFilters(req))
    await store.dispatch(getAllProducts({ req, keyword, category, brand }))
    const { data } = await client.query({
        query: gql`
            query products {
                products {
                    _id
                    name
                    images {
                        public_id
                        url
                    }
                    rating
                    numReviews
                    price
                }
            }
        `
    })


    return {
        props: {
            products: data.products
        }
    }
})