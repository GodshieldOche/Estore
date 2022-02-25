import Layout from "../../components/layout/Layout";
import { getSession } from 'next-auth/react'
import AdminDashBoard from '../../components/admin/AdminDashBoard'



export default function AdminDashBoardPage() {
    return (
        <AdminDashBoard />
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