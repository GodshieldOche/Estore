import Layout from "../../../components/layout/Layout"
import { getSession } from 'next-auth/react'
import OrderDashboard from "../../../components/admin/Orders/OrderDashboard"


const AdminOrders = () => {
    return (
        <OrderDashboard />
    )
}




export default AdminOrders


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



