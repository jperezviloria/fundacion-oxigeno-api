import {Request, Response} from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {SignupRequest} from "../dto/request/SignupRequest"
import {LoginRequest} from "../dto/request/LoginRequest"
import jwtConfig from "../config/jwtSecretKey"
import {getUserByEmail, saveUser, getEmailUserByEmail, getPasswordUserByEmail} from "../database/UserDatabase"



const MESSAGE_SEND_COMPLETE_INFO: string = "Please. Send email, password, level and rol"
const MESSAGE_USER_EXIST: string = "The User already exist"
const MESSAGE_USER_DONT_EXIST: string = "The User doesn`t exist"
const MESSAGE_USER_SAVED: string = "The User was saved successfully"
const MESSAGE_CREATED_TOKEN: string = "Token created"
const MESSAGE_EMAIL_OR_PASSWORD_WRONG: string = "The Email or Password are wrong"



export const createToken = (user: any) =>{
    return jwt.sign({
        id: user.idUser,
        email: user.emailUser
    },
    jwtConfig.jwtSecret, {
        expiresIn: 86400
    })
}

export const signUp = async(req: Request, res: Response):Promise<Response> =>{
    
    var user: SignupRequest = {
        emailUser: req.body.emailUser,
        passwordUser: req.body.passwordUser,
        idRol: req.body.idRol, 
	enable: true
    }
    
    
    if(!user.emailUser || !user.passwordUser || !user.idRol){
        return res.json({
            "status":400,
            "message": MESSAGE_SEND_COMPLETE_INFO
        })
    }
    const existConsult = await existUserByEmail(res, user.emailUser)
    if(existConsult){
        return res.json({
            "status":400,
            "message":MESSAGE_USER_EXIST
        })    
    }

    await saveNewUser(res, user);
    return res.json({
        "status":201,
        "data":user,
        "message":MESSAGE_USER_SAVED
    })

    
}

export const signIn = async (req: Request, res: Response) =>{
    var user: LoginRequest = {
        email: req.body.email,
        password: req.body.password 
    }

    if(!user.email || !user.password){
        return res.json({
            "status":400,
            "message": MESSAGE_SEND_COMPLETE_INFO
        })
    }
    const existConsult = await existUserByEmail(res, user.email)
  
    if (!existConsult){
        return res.json({
            "status":400,
            "message":MESSAGE_USER_DONT_EXIST
        }) 
    }
    const passwordUserByEmail = await getPasswordUserByEmail(user.email)
    console.log(JSON.stringify(passwordUserByEmail))
    console.log(JSON.stringify(user.password))

    
    const isMatch = await comparePassword(user.password, passwordUserByEmail)
    const userToAuthenticate = await getUserByEmail(user.email);
    console.log(isMatch)
    if(isMatch){
        return res.json({
            "status":200,
            "message":MESSAGE_CREATED_TOKEN,
            "token": createToken(userToAuthenticate),
            "user":userToAuthenticate
        })  
    }

    return res.json({
        "status":400,
        "message":MESSAGE_EMAIL_OR_PASSWORD_WRONG
    }) 

}

export const saveNewUser = async(res: Response, user:SignupRequest)=>{
    try{
      console.log(user)
        const passwordEncripted = await encryptPassword(user)
        await saveUser(user, passwordEncripted)
	
    }catch(error){
        return res.json({
            "status":400,
            "message": MESSAGE_USER_EXIST
        })
    }
} 

const existUserByEmail = async(res: Response, externalEmail: string) =>{

    var emailFound = await getEmailUserByEmail(externalEmail);
    if(JSON.stringify(emailFound) == JSON.stringify(externalEmail)){
        return true
    }
    else{
        return false
    }
}

const encryptPassword = async(user:SignupRequest) =>{
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.passwordUser, salt);
    return hash;
}

const comparePassword = async(externalPassword: string, passwordFound: any): Promise<boolean> =>{
    const comparingPassword = await bcrypt.compare(externalPassword, passwordFound)
    console.log("aqui")
    console.log(comparingPassword)
    return comparingPassword;
}
