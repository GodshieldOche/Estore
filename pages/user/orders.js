import Layout from "../../components/layout/Layout";
import { getSession } from 'next-auth/react'
import OrderBaord from "../../components/user/Orders/OrderBaord";


export default function OrderPage() {
    return (
        <OrderBaord />
    )
}


export async function getServerSideProps(context) {
    const { req } = context
    const session = await getSession({ req })

    if (!session) {
        return {
            redirect: {
                destination: '/auth/signin',
                permanent: false
            }
        }
    }
    return {
        props: {}
    }
}