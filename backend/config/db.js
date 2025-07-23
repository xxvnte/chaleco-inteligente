import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  //connectionString: process.env.DATABASE_URL,
  user: "postgres",
  host: "localhost",
  database: "tics",
  password: "postgres",
  port: 5432,
});

pool
  .connect()
  .then(() => {
    console.log("Conexión a la base de datos con Pool exitosa");
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
  });

export { pool };
