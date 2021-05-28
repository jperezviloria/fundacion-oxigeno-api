import {QueryResult} from "pg";
import {pool} from "../config/database";
import {SocialMediaCreation} from "../dto/request/SocialMediaCreation";

export const saveSocialMedia = async(socialMedia: SocialMediaCreation) =>{
    try{
      console.log(socialMedia);
        const newUser : QueryResult = await pool.query(`INSERT INTO SocialMedia (name, username, urlProfile) VALUES ( 
													 '${socialMedia.name}', 
													 '${socialMedia.username}',
													 '${socialMedia.urlProfile}');`)
        return "saved"
    }catch(error){
        return "no saved"
    }
    
    
}


export const updateSocialMediaToUploadImage = async(socialMedia:any) =>{
    try{
      
        const newUser : QueryResult = await pool.query(`UPDATE SocialMedia SET urlimage = '${socialMedia.urlimage}', publicid = '${socialMedia.publicid}' WHERE id = ${socialMedia.id} ;`)
        return "saved"
    }catch(error){
        return "no saved"
    }
    
    
}
export const updateSocialMediaToNameUsernameAndLink = async(socialMedia:any) =>{
    try{
      
        const newUser : QueryResult = await pool.query(`UPDATE SocialMedia SET name = '${socialMedia.name}', username = '${socialMedia.username}' , urlProfile = '${socialMedia.urlProfile}' WHERE id = ${socialMedia.id} ;`)
        return "updated"
    }catch(error){
        return "no updated"
    }
    
    
}


export const getPhotoIdByIdSocialMedia = async(id:number):Promise<QueryResult> =>{
    
      
        const query = await pool.query(`SELECT publicid FROM SocialMedia WHERE id = ${id} ;`)
        return query
    
    
}
