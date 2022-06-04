import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pg;

const databaseConfig = {
    connectionString: process.env.SQL_URI,
    ssl: {
        rejectUnauthorized: false
    }
}

const connectionSQL = new Pool(databaseConfig);

export default connectionSQL;