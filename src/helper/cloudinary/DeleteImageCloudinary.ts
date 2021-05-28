import cloudinary from "../../config/cloudinary"
//import {getPhotoIdByIdUser} from "../../database/UserDatabase"

//const deletePhotoByIdWhenIWillUpdate = async(id: number) =>{

  //const photoIdFromDatabase = await getPhotoIdByIdUser(id);
  //await cloudinary.uploader.destroy(photoIdFromDatabase.rows[0].publicid);
  
//} 


export const deletePhotoByPublicIdOnCloudinary = async(publicId: string) =>{

  await cloudinary.uploader.destroy(publicId);
  
} 
