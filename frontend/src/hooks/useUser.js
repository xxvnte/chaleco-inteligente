import {
  registerUserApi,
  loginUserApi,
  profileUserApi,
  updateUserApi,
  deleteUserApi,
} from "../network/api/userApi";

export const registerUser = async (formData) => {
  try {
    const response = await registerUserApi(formData);
    return response;
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    throw error;
  }
};

export const loginUser = async (formData) => {
  try {
    const response = await loginUserApi(formData);
    return response;
  } catch (error) {
    console.error("Error al ingresar el usuario:", error);
    throw error;
  }
};

export const profileUser = async (userId, headers) => {
  try {
    const response = await profileUserApi(userId, headers);
    return response;
  } catch (error) {
    console.error("Error al obtener el perfil del usuario:", error);
    throw error;
  }
};

export const updateUser = async (userId, formData, headers) => {
  try {
    const response = await updateUserApi(userId, formData, headers);
    return response;
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    throw error;
  }
};

export const deleteUser = async (userId, headers) => {
  try {
    const response = await deleteUserApi(userId, headers);
    return response;
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    throw error;
  }
};
