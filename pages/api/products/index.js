import nc from 'next-connect'
import dbConnect from '../../../utils/dbConnect'
import errorHandler from '../../../middleware/error'
import { adminProducts, createProduct } from '../../../controllers/productsController'
import { isAuthenticatedUser, authorizeRoles } from '../../../middleware/auth'



const handler = nc({ errorHandler })


dbConnect()

handler.use(isAuthenticatedUser, authorizeRoles('admin')).get(adminProducts)
handler.use(isAuthenticatedUser, authorizeRoles('admin')).post(createProduct)

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '100mb',
        },
    },
}

export default handler


