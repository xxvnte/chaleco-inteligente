import { getSensorDataByUserIdApi } from "../network/api/sensorApi";

export const getSensorDataByUserId = async (userId, headers) => {
  try {
    const response = await getSensorDataByUserIdApi(userId, headers);
    return response;
  } catch (error) {
    console.error("Error al obtener los datos del sensor:", error);
    throw error;
  }
}