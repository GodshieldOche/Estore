import Layout from "../../components/layout/Layout";
import { getSession } from 'next-auth/react'
import ReviewBoard from "../../components/user/Pending Reviews/ReviewBoard";


export default function OrderPage() {
    return (
        <ReviewBoard />
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