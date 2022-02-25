import nc from 'next-connect'
import dbConnect from '../../utils/dbConnect'
import errorHandler from '../../middleware/error'
import { allProducts, getLatest } from '../../controllers/productsController'


const handler = nc({ errorHandler })


dbConnect()

handler.get(allProducts)



export default handler