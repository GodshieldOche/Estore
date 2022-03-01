import nc from 'next-connect'
import dbConnect from '../../../utils/dbConnect'
import errorHandler from '../../../middleware/error'
import { getFilterItems } from '../../../controllers/productsController'



const handler = nc({ errorHandler })


dbConnect()

handler.get(getFilterItems)

export default handler


