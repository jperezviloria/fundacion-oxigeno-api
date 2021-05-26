import {Request, Response} from "express"
import {updateNameAndSurnameUserById} from "../database/UserDatabase"


export const updateNameAndSurnameById = async(request: Request, response: Response) => {
  
  var user = {
    name : request.body.name,
    surname : request.body.surname,
    idUser : request.body.idUser
  };
  console.log(request.body);
  console.log(user);
  if(!user.idUser || !user.surname || !user.name){
    return response.json({
      "status":400,
      "message":"TO EXECUTE THIS FUNCTION YOU NEED SEND A ID"
  })}

  const userUpdated = await updateNameAndSurnameUserById(user);
  return response.json({
        "status":200,
        "data":userUpdated,
        "message":"USER WAS UPDATED"
    })
 
}

