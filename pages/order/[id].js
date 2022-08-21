import Layout from "../../components/layout/Layout";
import Pay from "../../components/order/Pay";
import { getOrderDetails } from "../../redux/features/order";
import { wrapper } from "../../redux/store"

export default function PayPage() {
    return (
        <Layout>
            <Pay />
        </Layout>
    )
}



// export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, params }) => {
//     const id = params?.id
//     await store.dispatch(getOrderDetails({ req, id }))
// })