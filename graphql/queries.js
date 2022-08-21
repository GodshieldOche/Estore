import { gql } from "@apollo/client";



export const USERS = gql`
    query {
        users {
            _id
            name
            email
            password
            role
            cart {
            items {
                productId
                quantity
            }
            }
            shippingAddress {
            address
            city
            }
        }
    }
`