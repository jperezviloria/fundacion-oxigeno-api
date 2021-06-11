import Express, {json} from "express"
import cors from "cors"
import morgan from "morgan"
import passport from "passport"
import path from "path"
import {config as dotenv} from "dotenv"

import passportMiddleware from "./config/passport"

import AuthRoutes from "./routes/AuthRoutes"
import UserRoutes from "./routes/UserRoutes"
import PublicUserRoutes from "./routes/public/UserRoutes"
import SocialMediaRoutes from "./routes/SocialMediaRoutes"
import ContactFormRoutes from "./routes/ContactFormRoutes"
import SponsorRoutes from "./routes/SponsorRoutes"
import PaypalRoutes from "./routes/PaypalRoutes"
import EventPublicRoutes from "./routes/public/EventPublicRoutes"



import AuthPrivateRoutes from "./routes/privates/AuthPrivateRoutes"
import EventPrivateRoutes from "./routes/privates/EventPrivateRoutes"

const app = Express();
dotenv();


app.set("port", 5000);

app.use(json());
app.use(morgan("dev"));
app.use(cors());
app.use(Express.urlencoded({extended:false}))
app.use(passport.initialize())
passport.use(passportMiddleware);

//public routes
app.use("/auth", AuthRoutes);
app.use("/user",passport.authenticate('jwt', {session:false}), UserRoutes)
app.use("/public/user", PublicUserRoutes);
app.use("/socialmedia", SocialMediaRoutes);
app.use("/contact-form", ContactFormRoutes);
app.use("/sponsor", SponsorRoutes);
app.use("/paypal", PaypalRoutes)
app.use("/upload",Express.static(path.resolve('uploads')));
app.use("/public-event",EventPublicRoutes)


//private routes
app.use("/private-auth", passport.authenticate('jwt',{session:false}),AuthPrivateRoutes);
app.use("/private-event", passport.authenticate('jwt',{session:false}),EventPrivateRoutes);

app.listen(app.get("port"));
console.log(`Server on port ${app.get("port")}`);
