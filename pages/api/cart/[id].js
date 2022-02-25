import nc from 'next-connect'
import dbConnect from '../../../utils/dbConnect'
import errorHandler from '../../../middleware/error'
import { isAuthenticatedUser } from '../../../middleware/auth'
import { deleteCartItem } from '../../../controllers/cartController'



const handler = nc({ errorHandler })


dbConnect()

handler.use(isAuthenticatedUser).delete(deleteCartItem)


export default handler


