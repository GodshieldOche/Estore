import nc from 'next-connect'
import dbConnect from '../../../../utils/dbConnect'
import errorHandler from '../../../../middleware/error'
import { isAuthenticatedUser, authorizeRoles } from '../../../../middleware/auth'
import { getAdminOrders } from '../../../../controllers/orderController'



const handler = nc({ errorHandler })


dbConnect()

handler.use(isAuthenticatedUser, authorizeRoles('admin')).get(getAdminOrders)


export default handler


