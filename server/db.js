import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_STRING;


const pool = new Pool({
    connectionString: connectionString
  });
  
  export default pool;