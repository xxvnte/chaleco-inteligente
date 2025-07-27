import {
  createSensorData,
  getSensorDataByUserId,
} from "../models/sensorModel.js";

export const sendSensorData = async (req, res) => {
  const {
    id_usuario,
    frecuencia_cardiaca,
    oximetro,
    latitud,
    longitud,
    fecha,
    tiempo,
  } = req.body;

  try {
    await createSensorData(
      id_usuario,
      frecuencia_cardiaca,
      oximetro,
      latitud,
      longitud,
      fecha,
      tiempo
    );

    res.status(200).json({
      success: true,
      message: "Datos del sensor enviados exitosamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Hubo un error al enviar los datos del sensor",
      error: error.message,
    });
  }
};

export const getSensorData = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.session;

  if (parseInt(id, 10) !== parseInt(userId, 10)) {
    return res
      .status(403)
      .json({ error: "No tienes permiso para ver estos datos" });
  }

  try {
    const sensorData = await getSensorDataByUserId(id);

    res.status(200).json({
      success: true,
      message: "Datos del sensor obtenidos exitosamente",
      sensorData: sensorData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Hubo un error al obtener los datos del sensor",
      error: error.message,
    });
  }
};
