import nc from 'next-connect'
import dbConnect from '../../utils/dbConnect'
import { currentUser } from '../../controllers/authController'
import errorHandler from '../../middleware/error'
import { isAuthenticatedUser } from '../../middleware/auth'


const handler = nc({ errorHandler })


dbConnect()

handler.use(isAuthenticatedUser).get(currentUser)



export default handler