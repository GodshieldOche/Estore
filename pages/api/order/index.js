import nc from 'next-connect'
import dbConnect from '../../../utils/dbConnect'
import errorHandler from '../../../middleware/error'
import { isAuthenticatedUser } from '../../../middleware/auth'
import { getAllOrders, postOrder } from '../../../controllers/orderController'



const handler = nc({ errorHandler })


dbConnect()


handler.use(isAuthenticatedUser).post(postOrder)
handler.use(isAuthenticatedUser).get(getAllOrders)


export default handler


