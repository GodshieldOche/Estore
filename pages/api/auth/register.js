import nc from 'next-connect'
import dbConnect from '../../../utils/dbConnect'
import { registerUser } from '../../../controllers/authController'
import errorHandler from '../../../middleware/error'


const handler = nc({ errorHandler })


dbConnect()

handler.post(registerUser)



export default handler