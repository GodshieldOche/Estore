import nc from 'next-connect'
import dbConnect from '../../../utils/dbConnect'
import errorHandler from '../../../middleware/error'
import { postAudio } from '../../../controllers/productsController'
import { isAuthenticatedUser, authorizeRoles } from '../../../middleware/auth'



const handler = nc({ errorHandler })


dbConnect()

handler.use(isAuthenticatedUser, authorizeRoles('admin')).post(postAudio)

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '100mb',
        },
    },
}

export default handler


