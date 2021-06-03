"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const passport_1 = __importDefault(require("passport"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = require("dotenv");
const passport_2 = __importDefault(require("./config/passport"));
const AuthRoutes_1 = __importDefault(require("./routes/AuthRoutes"));
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const UserRoutes_2 = __importDefault(require("./routes/public/UserRoutes"));
const SocialMediaRoutes_1 = __importDefault(require("./routes/SocialMediaRoutes"));
const ContactFormRoutes_1 = __importDefault(require("./routes/ContactFormRoutes"));
const SponsorRoutes_1 = __importDefault(require("./routes/SponsorRoutes"));
const PaypalRoutes_1 = __importDefault(require("./routes/PaypalRoutes"));
const AuthPrivateRoutes_1 = __importDefault(require("./routes/privates/AuthPrivateRoutes"));
const app = express_1.default();
dotenv_1.config();
app.set("port", 5000);
app.use(express_1.json());
app.use(morgan_1.default("dev"));
app.use(cors_1.default());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(passport_1.default.initialize());
passport_1.default.use(passport_2.default);
//public routes
app.use("/auth", AuthRoutes_1.default);
app.use("/user", passport_1.default.authenticate('jwt', { session: false }), UserRoutes_1.default);
app.use("/public/user", UserRoutes_2.default);
app.use("/socialmedia", SocialMediaRoutes_1.default);
app.use("/contact-form", ContactFormRoutes_1.default);
app.use("/sponsor", SponsorRoutes_1.default);
app.use("/paypal", PaypalRoutes_1.default);
app.use("/upload", express_1.default.static(path_1.default.resolve('uploads')));
//private routes
app.use("/private-auth", passport_1.default.authenticate('jwt', { session: false }), AuthPrivateRoutes_1.default);
app.listen(app.get("port"));
console.log(`Server on port ${app.get("port")}`);
