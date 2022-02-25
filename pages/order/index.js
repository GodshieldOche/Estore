import Layout from "../../components/layout/Layout";
import { getSession } from 'next-auth/react'
import Order from "../../components/order/Order";

export default function OrderPage() {
    return (
        <Order />
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