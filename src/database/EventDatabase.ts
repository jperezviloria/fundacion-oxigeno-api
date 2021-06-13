import { QueryResult } from "pg"
import { pool } from "../config/database"



export const saveTitleDescriptionAndDateEvent = async (event:any) =>{

      try{
      console.log(event);
        const newEvent : QueryResult = await pool.query(`INSERT INTO Events (title, description, dates, enable) VALUES ( 
													 '${event.title}', 
													 '${event.description}',
													 '${event.date}',
													 ${event.enable})
													 RETURNING *;`)
        return newEvent.rows[0]
    }catch(error){
        return "no saved"
    }
}



export const deleteEventById = async (id:number) =>{
  try{
    
    const event : QueryResult = await pool.query(` DELETE FROM Events WHERE id = ${id}`)
    return "deleted"
  }catch(error){
    return "not deleted"
  }
}
export const getEventById = async (id:number) =>{
  try{
    
    const event : QueryResult = await pool.query(`SELECT * FROM Events WHERE id = ${id}`)
    return event.rows[0]
  }catch(error){
    return "not updated"
  }
}
export const getPhotoIdByIdEvent = async(idEvent: number):Promise<QueryResult> =>{
    const query= await pool.query(`SELECT publicid FROM Events WHERE id = ${idEvent}`)
    return query
}
export const updateImageUrlAndPublicId = async (data:any) =>{
  try{
    console.log(data)
    const image : QueryResult = await pool.query(`UPDATE Events SET imageurl = '${data.imageurl}', publicid = '${data.publicid}' WHERE id = ${data.id}`)
    return "updated"
  }catch(error){
    return "not updated"
  }
}

export const saveYoutubeEvent = async (event:any) =>{

      try{
      console.log(event);
        const newUser : QueryResult = await pool.query(`INSERT INTO Eventyoutube (name, idEvent, link, position) VALUES ( '${event.name}', ${event.idEvent}, '${event.link}', ${event.position} );`)
        return "saved"
    }catch(error){
        return "no saved"
    }
}
export const deleteYoutubeEventById = async (id:number) =>{
  try{
    
    const event : QueryResult = await pool.query(` DELETE FROM Eventyoutube WHERE id = ${id}`)
    return "deleted"
  }catch(error){
    return "not deleted"
  }
}
export const updateYoutubeEventById = async (youtubeevent:any) =>{

      try{
      console.log(event);
        const eventUpdated : QueryResult = await pool.query(`UPDATE Eventyoutube SET name = '${youtubeevent.name}', idEvent = ${youtubeevent.idevent}, link = '${youtubeevent.link}', position = ${youtubeevent.position} WHERE id = ${youtubeevent.id}`)
      return "updated"
    }catch(error){
        return "no updated"
    }
}


export const changeStatusEventById = async (id: number) =>{
  try{
    const query : QueryResult = await pool.query(`UPDATE Events SET enable = true WHERE id = ${id}` )
    return "changed"
  }catch(error){
    console.log(error);
  }
}

export const getAllEvents = async () =>{
  try{
    const allContactForms : QueryResult = await pool.query(`SELECT * FROM Events ORDER BY dates DESC ` )
    return allContactForms.rows
  }catch(error){
    console.log(error);
  }
}


export const getEventsWithFalseState = async () =>{
  try{
    const allContactForms : QueryResult = await pool.query(`SELECT * FROM Events WHERE enable = false ORDER BY dates DESC ` )
    return allContactForms.rows
  }catch(error){
    console.log(error);
  }
}


export const getEventsWithTrueState = async () =>{
  try{
    const allContactForms : QueryResult = await pool.query(`SELECT * FROM Events WHERE enable = true ORDER BY dates DESC ` )
    return allContactForms.rows
  }catch(error){
    console.log(error);
  }
}

export const getAllEventsWithJoin = async (idEvent:number) =>{
  try{
    const allContactForms : QueryResult = await pool.query(`SELECT * FROM Events as ev JOIN EventYoutube as ey ON ev.id = ey.idEvent AND ev.id = ${idEvent} ORDER BY ey.position , ey.id` )
    return allContactForms.rows
  }catch(error){
    console.log(error);
  }
}
export const getYoutubeLinksById = async (id:number) =>{
  try{
    
    const event : QueryResult = await pool.query(`SELECT * FROM eventyoutube WHERE idEvent = ${id} ORDER BY position DESC, id DESC`)
    return event.rows
  }catch(error){
    return "not updated"
  }
}


export const updateNameYoutubeEventById = async (youtubeevent:any) =>{

      try{
        const eventUpdated : QueryResult = await pool.query(`UPDATE Eventyoutube SET name = '${youtubeevent.name}' WHERE id = ${youtubeevent.id}`)
      return "updated"
    }catch(error){
        return "no updated"
    }
}


export const updateLinkYoutubeEventById = async (youtubeevent:any) =>{

      try{
        const eventUpdated : QueryResult = await pool.query(`UPDATE Eventyoutube SET link = '${youtubeevent.link}' WHERE id = ${youtubeevent.id}`)
      return "updated"
    }catch(error){
        return "no updated"
    }
}


export const updatePositionYoutubeEventById = async (youtubeevent:any) =>{

      try{
        const eventUpdated : QueryResult = await pool.query(`UPDATE Eventyoutube SET position = ${youtubeevent.position} WHERE id = ${youtubeevent.id}`)
      return "updated"
    }catch(error){
        return "no updated"
    }
}
