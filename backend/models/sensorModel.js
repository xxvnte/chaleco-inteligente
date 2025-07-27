import { pool } from "../config/db.js";
import { getUserById } from "./userModel.js";

export const createSensorData = async (
  id_usuario,
  frecuencia_cardiaca,
  oximetro,
  latitud,
  longitud,
  fecha,
  tiempo
) => {
  try {
    await pool.query(
      "INSERT INTO datos_sensores (id_usuario, frecuencia_cardiaca, oximetro, latitud, longitud, fecha, tiempo) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [
        id_usuario,
        frecuencia_cardiaca,
        oximetro,
        latitud,
        longitud,
        fecha,
        tiempo,
      ]
    );
  } catch (error) {
    console.error("Error al enviar los datos del sensor:", error);
    throw error;
  }
};

export const getSensorDataByUserId = async (id_usuario) => {
  try {
    const user = await getUserById(id_usuario);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const saludData = await pool.query(
      "SELECT frecuencia_cardiaca, oximetro, tiempo FROM datos_sensores WHERE id_usuario = $1",
      [id_usuario]
    );
    const gpsData = await pool.query(
      "SELECT latitud, longitud, fecha, tiempo FROM datos_sensores WHERE id_usuario = $1",
      [id_usuario]
    );

    return {
      user,
      saludData: saludData.rows,
      gpsData: gpsData.rows,
    };
  } catch (error) {
    console.error("Error al obtener los datos del sensor:", error);
    throw error;
  }
};
