import { getSession } from 'next-auth/react'
import OrderDetails from "../../../components/admin/Orders/OrderDetails"


const AdminOrderDetails = () => {
    return (
        <OrderDetails />
    )
}




export default AdminOrderDetails


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



