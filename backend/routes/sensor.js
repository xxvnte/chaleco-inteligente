import express from "express";
import authenticate from "../middlewares/auth.js";
import dotenv from "dotenv";
import {
  sendSensorData,
  getSensorData,
  getSaludData,
  getGpsData,
} from "../controllers/sensorController.js";

dotenv.config();

const router = express.Router();

//router.post("/sensor_data", sendSensorData);
router.get("/sensor-data/:id", authenticate, getSensorData);
router.get("/api/saludData", authenticate, getSaludData);
router.get("/api/gpsData", authenticate, getGpsData);

export default router;
