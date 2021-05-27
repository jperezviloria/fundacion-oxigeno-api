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

const app = Express();
dotenv();


app.set("port", 5000);

app.use(json());
app.use(morgan("dev"));
app.use(cors());
app.use(Express.urlencoded({extended:false}))
app.use(passport.initialize())
passport.use(passportMiddleware);

app.use("/auth", AuthRoutes);
app.use("/user",passport.authenticate('jwt', {session:false}), UserRoutes)
app.use("/public/user", PublicUserRoutes);
app.use("/upload",Express.static(path.resolve('uploads')));

app.listen(app.get("port"));
console.log(`Server on port ${app.get("port")}`);
