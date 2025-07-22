import { pool } from "../config/db.js";
import bcrypt from "bcryptjs";

export const createUser = async (
  nombre,
  contacto_de_confianza,
  clave,
  edad,
  peso,
  genero,
  estatura
) => {
  try {
    const hashedPassword = await bcrypt.hash(clave, 10);

    return await pool.query(
      "INSERT INTO usuario_info (username, edad, peso, altura, sexo, clave, num_emergencia) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id_usuario",
      [
        nombre,
        edad,
        peso,
        estatura,
        genero,
        hashedPassword,
        contacto_de_confianza,
      ]
    );
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const user = await pool.query(
      "SELECT * FROM usuario_info WHERE id_usuario = $1",
      [id]
    );
    return user.rows[0];
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    throw error;
  }
};

export const getUserByName = async (nombre) => {
  try {
    const user = await pool.query(
      "SELECT * FROM usuario_info WHERE username = $1",
      [nombre]
    );
    return user.rows[0];
  } catch (error) {
    console.error("Error al obtener el usuario por nombre:", error);
    throw error;
  }
};

export const verifyPassword = async (nombre, clave) => {
  try {
    const user = await getUserByName(nombre);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    await bcrypt.compare(clave, user.clave);
    return true;
  } catch (error) {
    console.error("Error al verificar la contraseña:", error);
    throw error;
  }
};

export const editUser = async (
  id,
  username,
  num_emergencia,
  clave,
  edad,
  peso,
  altura
) => {
  try {
    const user = await pool.query(
      "SELECT sexo FROM usuario_info WHERE id_usuario = $1",
      [id]
    );
    const genero = user.rows[0].sexo;

    let hashedPassword;
    if (clave) {
      hashedPassword = await bcrypt.hash(clave, 10);
    }

    await pool.query(
      "UPDATE usuario_info SET username = $2, num_emergencia = $3, clave = COALESCE($4, clave), edad = $5, peso = $6, sexo = $7, altura = $8 WHERE id_usuario = $1",
      [id, username, num_emergencia, hashedPassword, edad, peso, genero, altura]
    );

    return true;
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    await pool.query("DELETE FROM datos_sensores WHERE id_usuario = $1", [id]);
    await pool.query("DELETE FROM usuario_info WHERE id_usuario = $1", [id]);
    return true;
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    throw error;
  }
};
