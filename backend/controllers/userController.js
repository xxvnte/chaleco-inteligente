import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
  createUser,
  getUserById,
  getUserByName,
  verifyPassword,
  updateUser,
  deleteUser,
  editUser,
} from "../models/userModel.js";

dotenv.config();

const router = express.Router();

export const registerUser = async (req, res) => {
  const { nombre, contacto_de_confianza, clave, edad, peso, genero, estatura } =
    req.body;

  try {
    await createUser(
      nombre,
      contacto_de_confianza,
      clave,
      edad,
      peso,
      genero,
      estatura
    );

    const user = await getUserByName(nombre);

    res.status(200).json({
      success: true,
      message: "Usuario creado exitosamente",
      userId: user.id_usuario,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Hubo un error al crear el usuario",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  const { nombre, clave } = req.body;

  try {
    if (await verifyPassword(nombre, clave)) {
      const token = jwt.sign(
        { id: user.rows[0].id_usuario },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 1000 * 60 * 60 * 24 * 7,
        domain:
          process.env.NODE_ENV === "production" ? ".onrender.com" : undefined,
      });

      req.session.isAuthenticated = true;
      req.session.userId = user.rows[0].id_usuario;

      res.status(200).json({
        success: true,
        userId: user.rows[0].id_usuario,
        token: token,
      });
    } else {
      res.status(401).send("Nombre o clave incorrectos");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Hubo un error al iniciar sesión",
      error: error.message,
    });
  }
};

export const profileUser = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.session;

  if (parseInt(id, 10) !== parseInt(userId, 10)) {
    return res.status(403).send("No tienes permiso para ver estos datos");
  }

  try {
    const user = await getUserById(id);
    if (user) {
      return res.status(200).json({
        success: true,
        message: "Usuario encontrado",
        user: user,
      });
    } else {
      throw new Error("Usuario no encontrado");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Hubo un error al obtener el perfil del usuario",
      error: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  const { username, num_emergencia, clave, edad, peso, altura } = req.body;
  const { id } = req.params;

  try {
    await editUser(id, username, num_emergencia, clave, edad, peso, altura);

    res.status(200).json({
      success: true,
      message: "Perfil actualizado",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Hubo un error al actualizar el perfil",
      error: error.message,
    });
  }
};

export const deleteUserAcount = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.session;

  if (parseInt(id, 10) !== parseInt(userId, 10)) {
    return res.status(403).send("No tienes permiso para eliminar este usuario");
  }

  try {
    await deleteUser(id);

    req.session.destroy(() => {
      res.clearCookie("token");
      res.status(200).send("Cuenta eliminada");
    });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    res.status(500).send("Hubo un error al eliminar el usuario");
  }
};

export default router;
