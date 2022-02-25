import nc from 'next-connect'
import dbConnect from '../../../../utils/dbConnect'
import errorHandler from '../../../../middleware/error'
import { isAuthenticatedUser, authorizeRoles } from '../../../../middleware/auth'
import { adminOrderDetails, deleteOrder, updateDelivered } from '../../../../controllers/orderController'



const handler = nc({ errorHandler })


dbConnect()

handler.use(isAuthenticatedUser, authorizeRoles('admin')).get(adminOrderDetails)

handler.use(isAuthenticatedUser, authorizeRoles('admin')).put(updateDelivered)

handler.use(isAuthenticatedUser, authorizeRoles('admin')).delete(deleteOrder)


export default handler


