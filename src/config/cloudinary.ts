import {v2 as cloudinary} from "cloudinary"
import {config as dotenv} from "dotenv"
dotenv();
    
cloudinary.config({
    cloud_name:process.env.FUNDACION_OXIGENO_CLOUD_NAME_CLOUDINARY,
    api_key:process.env.FUNDACION_OXIGENO_API_KEY_CLOUDINARY,
    api_secret: process.env.FUNDACION_OXIGENO_API_SECRET_CLOUDINARY
});

export default cloudinary;
