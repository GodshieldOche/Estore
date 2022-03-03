import nc from 'next-connect'
import dbConnect from '../../../utils/dbConnect'
import errorHandler from '../../../middleware/error'
import { postAudio } from '../../../controllers/productsController'
import { isAuthenticatedUser, authorizeRoles } from '../../../middleware/auth'
import multer from "multer";
import path from "path";

export const config = {
    api: {
        bodyParser: false,
    },
}

const handler = nc({ errorHandler })


const upload = multer({ dest: 'public' })



let uploadFile = upload.single("audio");

dbConnect()

handler.use(isAuthenticatedUser, authorizeRoles('admin'), uploadFile).post(postAudio)



export default handler


