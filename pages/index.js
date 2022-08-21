import Home from "../components/Home";
import Layout from "../components/layout/Layout";
import { wrapper } from "../redux/store"
import client from "../apollo-client";
import {gql} from 'apollo-server-micro'
import { useQuery } from "@apollo/client";
import { USERS } from "../graphql/queries";


export default function HomePage({ products }) {
  // console.log(products);
  const { loading, error, data } = useQuery(USERS)

  console.log(data)
  return (
    <Layout>
      <Home products={ products } />
    </Layout>
  )
}


export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, query }) => {
  const { data } = await client.query({
    query: gql`
      query latestProducts {
        latestProducts {
          _id
          name
          images {
            public_id
            url
          }
          rating
          numReviews
          price
        }
      }
    `,
  });

  return {
    props: {
      products: data.latestProducts,
    },
  };
})