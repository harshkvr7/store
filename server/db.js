import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

const connectionString = "postgresql://postgres.bzuscjyhoqdfljpfcsyv:zFNcnFphBtGW8lJR@aws-0-ap-south-1.pooler.supabase.com:6543/postgres";


const pool = new Pool({
    connectionString: connectionString
  });
  
  export default pool;