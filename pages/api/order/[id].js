import nc from 'next-connect'
import dbConnect from '../../../utils/dbConnect'
import errorHandler from '../../../middleware/error'
import { isAuthenticatedUser } from '../../../middleware/auth'
import { getOrderDetails, updatePaid } from '../../../controllers/orderController'



const handler = nc({ errorHandler })


dbConnect()


handler.get(getOrderDetails)

handler.use(isAuthenticatedUser).put(updatePaid)


export default handler


