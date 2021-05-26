import {Strategy, ExtractJwt, StrategyOptions} from "passport-jwt"
//import configJwt from "./jwtSecretKey"
import { getUserById } from "../database/UserDatabase";


var opts: StrategyOptions ={
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'somesecrettoken'
};

export default new Strategy(opts, async(payload, done) =>{
    try {
        const user = await getUserById(payload.id)
        if(user){
            return  done(null, user);
        }
        return done(null, false);
    } catch (error) {
        console.log(error)
    }
})
