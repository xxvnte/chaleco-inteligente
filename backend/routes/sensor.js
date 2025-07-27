import express from "express";
import authenticate from "../middlewares/auth.js";
import {
  sendSensorData,
  getSensorData,
} from "../controllers/sensorController.js";

const router = express.Router();

router.post("/send-sensor-data", sendSensorData);
router.get("/sensor-data/:id", authenticate, getSensorData);

export default router;
