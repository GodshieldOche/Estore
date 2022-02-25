import Details from "../../components/Details";
import Layout from "../../components/layout/Layout";
import { getProdDetails } from "../../redux/features/product";
import { wrapper } from "../../redux/store";


export default function DetailsPage() {
    return (
        <Layout>
            <Details />
        </Layout>
    )
}


export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, params }) => {
    const prodId = params.prodId
    await store.dispatch(getProdDetails({ req, prodId }))
})