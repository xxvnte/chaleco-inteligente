import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool
  .connect()
  .then(() => {
    console.log("Conexión a la base de datos exitosa");
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
  });

export { pool };
