import User from '../models/User'
import Product from '../models/Products'

const resolvers = {
    Query: {
        users: async (_parent, _args, _context) => {
            if (_context) {
                console.log(_context)
            }
            const users = await User.find()
            return users
        },
        latestProducts: async (_parent, _args, _context) => { 
            const products = await Product.find().sort('-createdAt').limit(4)
            return products
        },
        products: async (_parent, _args, _context) => { 
            const products = await Product.find().sort('-createdAt')

            return products
        }
    }
}

export {
    resolvers
}