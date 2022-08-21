import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://estore-five.vercel.app/api/graphql",
    // uri: "http://localhost:3000/api/graphql",
    cache: new InMemoryCache(),
});

export default client;