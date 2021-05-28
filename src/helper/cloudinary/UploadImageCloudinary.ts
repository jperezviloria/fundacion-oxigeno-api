import cloudinary from "../../config/cloudinary"


export const uploadImage = async (file:any): Promise<any>=>{
  const imageUploaded = await cloudinary.uploader.upload(file);
  return imageUploaded;
}
