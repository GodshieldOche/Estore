import nc from 'next-connect'
import dbConnect from '../../../utils/dbConnect'
import errorHandler from '../../../middleware/error'
import { prodDetails } from '../../../controllers/productsController'



const handler = nc({ errorHandler })


dbConnect()

handler.get(prodDetails)

export default handler


