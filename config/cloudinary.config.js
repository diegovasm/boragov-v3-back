import {v2 as cloudinary} from 'cloudinary'
import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

cloudinary.config({

    // Criar a conta no cloudinary, buscar as informações e salvar 
    //no arquivo .env
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

const storage = new CloudinaryStorage({

    cloudinary,
    params:{
        allowed_formats:["jpg", "png"],
        folder: "boragov-gallery"
    }
})

export default multer ({storage})