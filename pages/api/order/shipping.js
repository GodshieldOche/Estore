import nc from 'next-connect'
import dbConnect from '../../../utils/dbConnect'
import errorHandler from '../../../middleware/error'
import { isAuthenticatedUser } from '../../../middleware/auth'
import { getShippingAddress, updateShippingAddress } from '../../../controllers/orderController'



const handler = nc({ errorHandler })


dbConnect()


handler.use(isAuthenticatedUser).get(getShippingAddress)

handler.use(isAuthenticatedUser).put(updateShippingAddress)


export default handler


