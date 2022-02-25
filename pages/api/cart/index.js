import nc from 'next-connect'
import dbConnect from '../../../utils/dbConnect'
import errorHandler from '../../../middleware/error'
import { isAuthenticatedUser} from '../../../middleware/auth'
import { addToCart, deleteCartItems, getCartItems } from '../../../controllers/cartController'



const handler = nc({ errorHandler })


dbConnect()

handler.use(isAuthenticatedUser).post(addToCart)
handler.use(isAuthenticatedUser).get(getCartItems)
handler.use(isAuthenticatedUser).delete(deleteCartItems)


export default handler


