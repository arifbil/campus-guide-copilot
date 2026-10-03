import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "campus_guide", // sesuaikan dengan nama DB di pgAdmin
  password: "arif555provsql", //  postgres kamu
  port: 5432,
});

export default pool;