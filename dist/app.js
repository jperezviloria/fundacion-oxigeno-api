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
const passport_2 = __importDefault(require("./config/passport"));
const AuthRoutes_1 = __importDefault(require("./routes/AuthRoutes"));
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const UserRoutes_2 = __importDefault(require("./routes/public/UserRoutes"));
const app = express_1.default();
app.set("port", 5000);
app.use(express_1.json());
app.use(morgan_1.default("dev"));
app.use(cors_1.default());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(passport_1.default.initialize());
passport_1.default.use(passport_2.default);
app.use("/auth", AuthRoutes_1.default);
app.use("/user", passport_1.default.authenticate('jwt', { session: false }), UserRoutes_1.default);
app.use("/public/user", UserRoutes_2.default);
app.listen(app.get("port"));
console.log(`Server on port ${app.get("port")}`);
