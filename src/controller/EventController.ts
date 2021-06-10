import {Request, Response} from "express"
import {changeStatusEventById, deleteEventById, deleteYoutubeEventById, getAllEvents, getAllEventsWithJoin, getEventById, getEventsWithFalseState, getEventsWithTrueState, getPhotoIdByIdEvent, getYoutubeLinksById, saveTitleDescriptionAndDateEvent,saveYoutubeEvent, updateImageUrlAndPublicId, updateLinkYoutubeEventById, updateNameYoutubeEventById, updatePositionYoutubeEventById} from "../database/EventDatabase"
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



  export const getAllPrivatesEventsController = async(request: Request, response: Response) =>{
    const allContactForms = await getAllEvents();
    console.log(allContactForms)
    return response.json({ data: allContactForms})
  }


  export const getPrivatesEventsWithFalseStateController = async(request: Request, response: Response) =>{
    const allContactForms = await getEventsWithFalseState();
    console.log(allContactForms)
    return response.json({ data: allContactForms})
  }


export const deleteEventControllerById = async(request: Request, response: Response) =>{
   
    const id = request.params.id;
    const result = await deleteEventById(parseInt(id));
    return response.json({ data: result})
  }
export const changeStatusEventController = async(request: Request, response: Response) =>{
   
    const id = request.params.id;
    const result = await changeStatusEventById(parseInt(id));
    return response.json({ data: result})
  }


export const saveYoutubeLinkController = async(request:Request, response: Response) =>{

  const YoutubeLinkRequest = {
    name: request.body.name,
    idEvent: request.body.idEvent,
    link:request.body.link,
    position: request.body.position
  }

  if(!YoutubeLinkRequest.name && !YoutubeLinkRequest.idEvent && !YoutubeLinkRequest.link && !YoutubeLinkRequest.position){
    return response.json({
      message: "Faltan datos"
  })
  }

  const youtubeLinkSaved = await saveYoutubeEvent(YoutubeLinkRequest)

  return response.json({
    message: youtubeLinkSaved
  })


}
export const getAllEventsWithJoinController = async(request: Request, response: Response) =>{
   
    const id = request.params.id;
    const result = await getAllEventsWithJoin(parseInt(id));
    return response.json({ data: result})
  }

export const getAllEventsWithYoutubeLinksController = async(request: Request, response: Response) =>{
   
    const id = request.params.id;
    const event = await getEventById(parseInt(id));
    const youtubeLinks = await getYoutubeLinksById(parseInt(id))
    const eventWithYoutubeLink = {
      title: event.title,
      dates: event.dates,
      youtubeLink : youtubeLinks
    }
    //console.log(eventWithYoutubeLink)
    return response.json({ data: eventWithYoutubeLink})
  }

const filteringEventWithinImageUrl = (event:any) =>{
  if(event.imageurl && event.enable && event.title && event.description){
    return event
  }
}

const iteratingYoutubeLinks = async(events: any[]):Promise<any[]> =>{
  
  var allEventsWithYoutubeLinks:any[] = []
 events.map(async particularEvent =>{
      const youtubeLinks = await getYoutubeLinksById(particularEvent.id)
      const eventWithYoutubeLink = {
      imageurl: particularEvent.imageurl,
      title: particularEvent.title,
      dates: particularEvent.dates,
      description: particularEvent.description,
      youtubeLink : youtubeLinks
    }  
    //console.log(eventWithYoutubeLink)
   // allEventsWithYoutubeLinks.push(eventWithYoutubeLink)
   allEventsWithYoutubeLinks = [...allEventsWithYoutubeLinks, eventWithYoutubeLink]

    })
    console.log("aaaaaaaaaa")
    return allEventsWithYoutubeLinks
}
export const getAllEventsWithYoutubeLinksPublicController = async(request: Request, response: Response) =>{
   
    
    const events = await getEventsWithTrueState();
    if(!events){
      return response.json({
	message:"having error in getAllEventsWithYoutubeLinksPublicController"
      })
    }
    const eventsFiltered = events.filter(filteringEventWithinImageUrl)
    /*
    const allEventsWithYoutubeLinks = new Array()
    
    eventsFiltered.map(async particularEvent =>{
      const youtubeLinks = await getYoutubeLinksById(particularEvent.id)
      const eventWithYoutubeLink = {
      imageurl: particularEvent.imageurl,
      title: particularEvent.title,
      dates: particularEvent.dates,
      description: particularEvent.description,
      youtubeLink : youtubeLinks
    }  
    console.log(eventWithYoutubeLink)
    allEventsWithYoutubeLinks.push(eventWithYoutubeLink)

    })
    */
   const result = await iteratingYoutubeLinks(eventsFiltered)
    console.log("ADDDDD")
    console.log(result)
    return response.json({ data: result})
  }
export const updateOnlyPositionYoutubeLinkById = async(request: Request, response: Response) =>{

    const youtubeLink = {
      id: request.body.id,
      position: request.body.position
    }
    const result = await updatePositionYoutubeEventById(youtubeLink);
    return response.json({ data: result})
  }

export const deleteYoutubeLinkByIdController = async(request: Request, response: Response) =>{
   
    const id = request.params.id;
    const result = await deleteYoutubeEventById(parseInt(id));
    return response.json({ data: result})
  }

export const updateOnlyNameYoutubeLinkByIdController = async(request: Request, response: Response) =>{
   const youtubeLink = {
      id: request.body.id,
      name: request.body.name
    }
    const result = await updateNameYoutubeEventById(youtubeLink);
    return response.json({ data: result})
    
  }

export const updateOnlyLinkYoutubeLinkByIdController = async(request: Request, response: Response) =>{
   const youtubeLink = {
      id: request.body.id,
      link: request.body.link
    }
    const result = await updateLinkYoutubeEventById(youtubeLink);
    return response.json({ data: result})
   
  }


