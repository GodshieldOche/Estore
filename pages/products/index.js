import Layout from "../../components/layout/Layout";
import Products from "../../components/Products";
import { getAllProducts } from "../../redux/features/products";
import { wrapper } from "../../redux/store";
// import 'tw-elements';


export default function SignInPage() {
    return (
        <Products />
    )
}


// export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, query }) => {
//     await store.dispatch(getAllProducts(req))
// })