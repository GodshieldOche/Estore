import SignIn from "../../components/auth/SIgnIn";
import Layout from "../../components/layout/Layout";
import { getSession } from 'next-auth/react'


export default function SignInPage() {
    return (
        <Layout>  
            <SignIn />
        </Layout>
    )
}


export async function getServerSideProps(context) {
    const { req } = context
    const session = await getSession({ req })

    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    return {
        props: {}
    }
}