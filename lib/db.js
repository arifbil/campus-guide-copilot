import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "campus-guide-copilot", // sesuaikan dengan nama DB di pgAdmin
  password: "zxfar_7355608", // password postgres kamu
  port: 5432,
});

export default pool;