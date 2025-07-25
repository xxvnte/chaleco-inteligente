import config from "../../../config.json";

export const registerUserApi = async (formData) => {
  try {
    const response = await fetch(`${config.api.url}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    return response.json();
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    throw error;
  }
};

export const loginUserApi = async (formData) => {
  try {
    const response = await fetch(`${config.api.url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });
    return response.json();
  } catch (error) {
    console.error("Error al ingresar el usuario:", error);
    throw error;
  }
};

export const profileUserApi = async (userId, headers) => {
  try {
    const response = await fetch(`${config.api.url}/user_profile/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      credentials: "include",
    });
    return response.json();
  } catch (error) {
    console.error("Error al obtener el perfil del usuario:", error);
    throw error;
  }
};

export const updateUserApi = async (userId, formData, headers) => {
  try {
    const response = await fetch(`${config.api.url}/update_user/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });
    return response.json();
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    throw error;
  }
};

export const deleteUserApi = async (userId, headers) => {
  try {
    const response = await fetch(`${config.api.url}/delete_user/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      credentials: "include",
    });
    return response.json();
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    throw error;
  }
};
