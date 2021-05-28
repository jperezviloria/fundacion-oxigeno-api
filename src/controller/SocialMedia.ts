import {Request, Response} from "express"
import {uploadImage} from "../helper/cloudinary/UploadImageCloudinary"
import {deletePhotoByPublicIdOnCloudinary} from "../helper/cloudinary/DeleteImageCloudinary"
import {deleteFilePath} from "../helper/fs-extra/DeleteFilePath"
import {SocialMediaCreation} from "../dto/request/SocialMediaCreation"
import {getPhotoIdByIdSocialMedia, saveSocialMedia, updateSocialMediaToNameUsernameAndLink, updateSocialMediaToUploadImage} from "../database/SocialMediaDatabase"


export const saveSocialMediaController = async(request: Request, response: Response):Promise<Response> =>{

 
  var socialMedia :SocialMediaCreation= {
    name : request.body.name,
    username : request.body.username,
    urlProfile : request.body.urlprofile
  };
  console.log(request.body);
  console.log(socialMedia);
  if(!socialMedia.name || !socialMedia.username || !socialMedia.urlProfile){
    return response.json({
      "status":400,
      "message":"TO EXECUTE THIS FUNCTION YOU NEED SEND A ID"
  })}

  const socialMediaUpdated = await saveSocialMedia(socialMedia);
  return response.json({
        "status":200,
        "data":socialMediaUpdated,
        "message":"USER WAS UPDATED"
    })


}


export const uploadPhotosById = async(request: Request, response:Response): Promise<Response> => {
    const id = request.params.id
    
    console.log(request.file)
    const publicIdToDelete = await getPhotoIdByIdSocialMedia(parseInt(id));
    await deletePhotoByPublicIdOnCloudinary(publicIdToDelete.rows[0].publicid);
    const imageUploaded = await uploadImage(request.file.path);
  
    const socialMedia = {
        id : parseInt(id),
        urlimage: imageUploaded.url,
        publicid: imageUploaded.public_id
    }

    const updatedProfile = await updateSocialMediaToUploadImage(socialMedia);

    //await fs.unlink(request.file.path)
    await deleteFilePath(request.file.path);
    return response.json({
        usernameUpdated: updatedProfile,
        status: 200 
    })
}


export const updateNameSurnameAndLinkById = async(request: Request, response: Response) => {
  
  var user = {
    name : request.body.name,
    username : request.body.username,
    id : request.body.id,
    urlProfile: request.body.urlProfile
  };
  console.log(request.body);
  console.log(user);
  if(!user.id || !user.username || !user.name || !user.urlProfile){
    return response.json({
      "status":400,
      "message":"TO EXECUTE THIS FUNCTION YOU NEED SEND A ID"
  })}

  const userUpdated = await updateSocialMediaToNameUsernameAndLink(user);
  return response.json({
        "status":200,
        "data":userUpdated,
        "message":"USER WAS UPDATED"
    })
 
}
