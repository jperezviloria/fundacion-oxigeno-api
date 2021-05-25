import {Strategy, ExtractJwt, StrategyOptions} from "passport-jwt"
import configJwt from "../config/jwtSecretKey"
import { getUserById } from "../database/UserDatabase";


const opts: StrategyOptions ={
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: configJwt.jwtSecret
};

export default new Strategy(opts, async(payload, done) =>{
    try {
        const user = await getUserById(payload.id)
        console.log("aqui")
        console.log(payload)
        console.log(payload.id)
        console.log(payload.email)
        console.log(user)
        if(user){
            return  done(null, user);
        }
        return done(null, false);
    } catch (error) {
        console.log(error)
    }
})
