import nc from 'next-connect'
import dbConnect from '../../utils/dbConnect'
import errorHandler from '../../middleware/error'
import { getLatest } from '../../controllers/productsController'


const handler = nc({ errorHandler })


dbConnect()


handler.get(getLatest)



export default handler