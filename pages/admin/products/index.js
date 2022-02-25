import Layout from "../../../components/layout/Layout"
import ProductDashboard from "../../../components/admin/Products/ProductDashboard"
import { getSession } from 'next-auth/react'


const AdminProducts = () => {
    return (
        <ProductDashboard />
    )
}




export default AdminProducts


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



