import { gql } from 'apollo-server-micro';



const typeDefs = gql`

type Item {
    productId: ID!
    quantity: Int!
}

type Items {
    items: [Item]!
}

type shippingAddress {
    address: String!
    city: String!
    postalCode: String!
    country: String!
}

type Review {
    name: String!
    rating: Int!
    comment: String!
    user: ID!
    createdAt: String!
}

type Image {
    url: String!
    public_id: String!
}

type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    imageUrl: String!
    role: String!
    cart: Items
    shippingAddress: shippingAddress
}

type Product {
    _id: ID!
    userId: ID!
    name: String!
    description: String!
    reviews: [Review]
    rating: Float!
    numReviews: Int!
    category: String!
    brand: String!
    price: Float!
    images: [Image!]!
    createdAt: String!
    updatedAt: String!
}

type Query {
    users: [User!]!
    latestProducts: [Product!]!
    products: [Product!]!
}

`


export {
    typeDefs
}