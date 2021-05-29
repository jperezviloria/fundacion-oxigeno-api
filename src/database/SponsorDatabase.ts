import {QueryResult} from "pg";
import {pool} from "../config/database";
import {SponsorRequest} from "../dto/request/SponsorRequest";
import {SponsorUpdateRequest} from "../dto/request/SponsorUpdateRequest";



export const saveSponsorDatabase = async(sponsor: SponsorRequest) =>{
    try{
      console.log(sponsor);
        const newUser : QueryResult = await pool.query(`INSERT INTO Sponsor (name, email, web, facebook, instagram, youtube, twitter ) VALUES ('${sponsor.name}','${sponsor.email}', '${sponsor.web}','${sponsor.facebook}','${sponsor.instagram}', '${sponsor.youtube}', '${sponsor.twitter}');`)
        return "saved"
    }catch(error){
        return "no saved"
    }
    
    
}

export const getAllSponsorDatabase = async() =>{
  try{
    const allSponsor = await pool.query(`SELECT * FROM Sponsor`);
    return allSponsor.rows
  }catch(error){
    console.log(error)
  }
}

export const getPhotoIdByIdSponsorDatabase = async(id: number) =>{
  try{
    const query = await pool.query(`SELECT publicId FROM Sponsor WHERE id = ${id}`);
    return query.rows[0].publicid
  }catch(error){
    console.log(error)
  }
}


export const updateSponsorToUploadImage = async(sponsor:any) =>{
    try{
      
        const query : QueryResult = await pool.query(`UPDATE Sponsor SET urlimage = '${sponsor.urlimage}', publicid = '${sponsor.publicid}' WHERE id = ${sponsor.id} ;`)
        return "updated"
    }catch(error){
        return "no updated"
    }
}
export const updateNameAndContactsSponsor = async(sponsor:SponsorUpdateRequest) =>{
    try{
      
        const query : QueryResult = await pool.query(`UPDATE Sponsor SET name = '${sponsor.name}', web = '${sponsor.web}' , email = '${sponsor.email}', facebook = '${sponsor.facebook}', instagram = '${sponsor.instagram}' , youtube = '${sponsor.youtube}', twitter = '${sponsor.twitter}' WHERE id = ${sponsor.id} ;`)
        return "updated"
    }catch(error){
        return "no updated"
    }
    
    
}
