import { QueryResult } from "pg"
import { pool } from "../config/database"
import { User } from "../model/User"
import  {SignupRequest} from "../dto/request/SignupRequest"

export const getAllUsers = async () =>{

    const allUsers :QueryResult  = await pool.query(`SELECT * FROM Users`)
    return allUsers.rows
}

export const uploadImageInformationProfileById = async(profile:any) =>{
  try{
  const profileUpdated: QueryResult = await pool.query(`UPDATE Users SET urlimage = '${profile.urlimage}', publicId = '${profile.publicid}' WHERE id = ${profile.id} RETURNING * ;`)
  return profileUpdated.rows[0]
  }catch(error){
    console.log(error);
  }
}

export const getUserFiltered = async(email: string, level: number, rol: string):Promise<QueryResult> =>{
    const usersFiltered : QueryResult = await pool.query(`EXEC GetFilteredUser @emailUser = ${email},@levelUser = ${level},@rol = ${rol}`)
    console.log(usersFiltered)
    return usersFiltered
}

export const getPhotoIdByIdUser = async(idUser: number):Promise<QueryResult> =>{
    const query= await pool.query(`SELECT publicid FROM Users WHERE id = ${idUser}`)
    return query
}

export const getUserById = async(idUser: number):Promise<QueryResult> =>{
    const query= await pool.query(`SELECT * FROM Users WHERE id = ${idUser}`)
    return query.rows[0]
}

export const getUserByEmail = async(emailUser: string):Promise<QueryResult> =>{
    const query : QueryResult = await pool.query(`SELECT * FROM Users WHERE email = '${emailUser}'`)
    return query.rows[0]
}

export const getUsersByLevel = async(idLevel: number):Promise<QueryResult> =>{
    const query : QueryResult= await pool.query(`SELECT * FROM Users WHERE level = ${idLevel}`)
    return query
}

export const getEmailUserByEmail = async(emailUser: string) =>{
    try{
        const query : QueryResult= await pool.query(`SELECT email FROM Users WHERE email = '${emailUser}'`)
        return query.rows[0].email
    }catch(error){
       return "" 
    }
}
export const getPasswordUserByEmail = async(emailUser: string)=>{
    try{
        const query : QueryResult= await pool.query(`SELECT password FROM Users WHERE email = '${emailUser}'`)
    return query.rows[0].password;
    }catch(error){
        return ""
    }
}

export const saveUser = async(user:SignupRequest , passwordEncripted:any) =>{
    try{
      console.log(user);
        const newUser : QueryResult = await pool.query(`INSERT INTO Users (email, password, idrol, enable) VALUES ( 
													 '${user.emailUser}', 
													 '${passwordEncripted}',
													 ${user.idRol},
													 ${user.enable});`)
        return "saved"
    }catch(error){
        return "no saved"
    }
    
    
}


export const updateNameAndSurnameUserById = async(user:any) =>{
    try{
      console.log(user);
        const query : QueryResult = await pool.query(`UPDATE Users SET name = '${user.name}', surname = '${user.surname}' WHERE id = ${user.idUser} ;`)
        return query.rows[0]
    }catch(error){
        return "NO UPDATED"
    }
    
    
}
