import Layout from "../../components/layout/Layout";
import { getSession } from 'next-auth/react'
import ProfileBoard from "../../components/user/Profile/ProfileBoard";


export default function ProfilePage() {
    return (
        <ProfileBoard/>
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