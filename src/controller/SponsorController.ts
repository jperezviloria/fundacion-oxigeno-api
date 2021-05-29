import {Request, Response} from "express"
import {getAllSponsorDatabase, getPhotoIdByIdSponsorDatabase, saveSponsorDatabase, updateNameAndContactsSponsor, updateSponsorToUploadImage} from "../database/SponsorDatabase";
import {SponsorRequest} from "../dto/request/SponsorRequest";
import {SponsorUpdateRequest} from "../dto/request/SponsorUpdateRequest";
import {deletePhotoByPublicIdOnCloudinary} from "../helper/cloudinary/DeleteImageCloudinary";
import {uploadImage} from "../helper/cloudinary/UploadImageCloudinary";
import {deleteFilePath} from "../helper/fs-extra/DeleteFilePath";



export const saveSponsorController = async(request: Request, response: Response):Promise<Response> =>{


 
  var sponsor:SponsorRequest= {
    name : request.body.name,
    web: request.body.web,
    email: request.body.email,
    facebook : request.body.facebook,
    instagram: request.body.instagram,
    youtube : request.body.youtube,
    twitter: request.body.twitter
  };
  
  
  if(!sponsor.name){
    return response.json({
      "status":400,
      "message":"TO EXECUTE THIS FUNCTION YOU NEED SEND A NAME"
  })}

  
  const sponsorUpdated = await saveSponsorDatabase(sponsor);
  return response.json({
        "status":200,
        "data":sponsorUpdated,
        "message":"USER WAS UPDATED"
    })


}

export const getAllSponsorController =async (request:Request, response: Response) =>{
  const allSponsor = await getAllSponsorDatabase();
  return response.json({
    data: allSponsor
  })
}

export const uploadSponsorPhotosById = async(request: Request, response:Response): Promise<Response> => {
    const id = request.params.id
    
    console.log(request.file)
    const publicIdToDelete = await getPhotoIdByIdSponsorDatabase(parseInt(id));
    console.log(publicIdToDelete)
    await deletePhotoByPublicIdOnCloudinary(publicIdToDelete);
    const imageUploaded = await uploadImage(request.file.path);
  
    const socialMedia = {
        id : parseInt(id),
        urlimage: imageUploaded.url,
        publicid: imageUploaded.public_id
    }

    const updatedProfile = await updateSponsorToUploadImage(socialMedia);

    //await fs.unlink(request.file.path)
    await deleteFilePath(request.file.path);
    return response.json({
        sponsornameUpdated: updatedProfile,
        status: 200 
    })
}

export const updateNameAndContactsSponsorController = async(request: Request, response: Response) => {
  
  var sponsor : SponsorUpdateRequest= {
    name : request.body.name,
    email : request.body.email,
    id : request.body.id,
    web: request.body.web,
    facebook: request.body.facebook,
    instagram: request.body.instagram,
    youtube: request.body.youtube,
    twitter: request.body.twitter
  };
  console.log(request.body);
  console.log(sponsor);
  if(!sponsor.id || !sponsor.name){
    return response.json({
      "status":400,
      "message":"TO EXECUTE THIS FUNCTION YOU NEED SEND A ID"
  })}

  const sponsorUpdated = await updateNameAndContactsSponsor(sponsor);
  return response.json({
        "status":200,
        "data":sponsorUpdated,
        "message":"USER WAS UPDATED"
    })
 
}
