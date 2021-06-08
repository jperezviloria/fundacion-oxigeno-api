import {Request, Response} from "express"
import {getEventById, getPhotoIdByIdEvent, saveTitleDescriptionAndDateEvent,saveYoutubeEvent, updateImageUrlAndPublicId} from "../database/EventDatabase"
import moment from "moment"
import cloudinary from "../config/cloudinary"
import fs from "fs-extra"

export const saveTitleDescriptionAndDateEventController = async(request:Request, response: Response) =>{

  const EventRequest = {
    title: request.body.title,
    description: request.body.description,
    date: moment(request.body.date).format(),
    enable: false
  }

  if(!EventRequest.title && !EventRequest.description){
    return response.json({
      message: "Necesitas colocar el titulo y la descripcion"
  })
  }

  const eventSaved = await saveTitleDescriptionAndDateEvent(EventRequest)

  return response.json({
    message: eventSaved
  })


}

export const uploadPhotosByIdEvent = async(request: Request, response:Response): Promise<Response> => {
    const id = request.params.id
    
    console.log(request.file)

    const result = await cloudinary.uploader.upload(request.file.path);
  
    const particularUser = await getEventById(parseInt(id))
    console.log(particularUser)
    if(particularUser.urlimage != null){
      await deletePhotoByIdWhenIWillUpdate(parseInt(id));
    }
    //await deletePhotoByIdWhenIWillUpdate(parseInt(id));
   
    console.log(result)
    
    const eventImage = {
        id : parseInt(id),
        imageurl: result.url,
        publicid: result.public_id
    }
    //await deletePhotoByIdWhenIWillUpdate(profile.id);
    const updatedEvent = await updateImageUrlAndPublicId(eventImage);
    
    await fs.unlink(request.file.path)

    return response.json({
        eventUpdated: updatedEvent,
        status: 200 
    })
}

const deletePhotoByIdWhenIWillUpdate = async(id: number) =>{

  const photoIdFromDatabase = await getPhotoIdByIdEvent(id);
  await cloudinary.uploader.destroy(photoIdFromDatabase.rows[0].publicid);
  
  

}



