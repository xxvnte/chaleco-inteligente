import express from "express";
import authenticate from "../middlewares/auth.js";
import dotenv from "dotenv";
import {
  deleteUserAcount,
  loginUser,
  profileUser,
  registerUser,
  updateUser,
} from "../controllers/userController.js";

dotenv.config();

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user_profile/:id", authenticate, profileUser);
router.post("/update_user/:id", authenticate, updateUser);
router.post("/delete_user/:id", authenticate, deleteUserAcount);

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error al cerrar sesión:", err);
      return res.status(500).json({ message: "Error al cerrar sesión" });
    }

    res.clearCookie("token");
    res.clearCookie("connect.sid");
    res.json({ message: "Sesión cerrada exitosamente" });
  });
});

//eliminar luego de retoques en frontend para usar endpoint user_profile
router.get("/edit_user/:id", authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await getUserById(id);
    if (user) {
      return res.json(user);
    } else {
      return res.status(404).send("Usuario no encontrado");
    }
  } catch (error) {
    console.error("Error al obtener el usuario para editar:", error);
    res.status(500).send("Hubo un error al obtener el usuario para editar");
  }
});

export default router;
