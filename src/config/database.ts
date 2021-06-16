import { Pool} from 'pg'
import {config as dotenv} from "dotenv";
dotenv();

export const pool = new Pool({
    user:process.env.FUNDACION_OXIGENO_DATABASE_USERNAME,
    host:process.env.FUNDACION_OXIGENO_DATABASE_HOST,
    password:process.env.FUNDACION_OXIGENO_DATABASE_PASSWORD,
    database: process.env.FUNDACION_OXIGENO_DATABASE_NAME,
    port: 5432
});
