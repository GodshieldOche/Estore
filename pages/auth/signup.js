import SignUp from "../../components/auth/SignUp";
import Layout from "../../components/layout/Layout";
import { getProviders } from "next-auth/react";



export default function SignUpPage({providers}) {
    return (
        <Layout>
            <SignUp providers={providers} />
        </Layout>
    )
}


export async function getServerSideProps(context) {
    const providers = await getProviders();

    return {
        props: {
            providers,
        },
    };
}