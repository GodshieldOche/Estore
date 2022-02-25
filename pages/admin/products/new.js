import Layout from "../../../components/layout/Layout"
import NewProduct from "../../../components/admin/Products/NewProduct"
import { getSession } from 'next-auth/react'


const NewProductPage = () => {
    return (
        <NewProduct />
    )
}




export default NewProductPage


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



