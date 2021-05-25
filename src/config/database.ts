import { Pool} from 'pg'

export const pool = new Pool({
    user:'userdb',
    host:'localhost',
    password:'passdb',
    database: 'oxigeno',
    port: 5432
});
