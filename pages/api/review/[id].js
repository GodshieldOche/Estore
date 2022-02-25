import nc from 'next-connect'
import dbConnect from '../../../utils/dbConnect'
import errorHandler from '../../../middleware/error'
import { isAuthenticatedUser, authorizeRoles } from '../../../middleware/auth'
import { updateIsReviewed } from '../../../controllers/orderController'
import { getReviews, postReview } from '../../../controllers/productsController'



const handler = nc({ errorHandler })


dbConnect()

handler.use(isAuthenticatedUser).post(postReview)

handler.use(isAuthenticatedUser).put(updateIsReviewed)

handler.use(isAuthenticatedUser).get(getReviews)

export default handler


