import config from "../../../config.json";

export const getSensorDataByUserId = async (userId, headers) => {
  try {
    const response = await fetch(`${config.api.url}/sensor-data/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      credentials: "include",
    });
    return response.json();
  } catch (error) {
    console.error("Error al obtener los datos del sensor:", error);
    throw error;
  }
};
