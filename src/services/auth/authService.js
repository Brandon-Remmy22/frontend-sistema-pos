import AxiosInstance from "../axiosInstance";


const login = async (formData) => {
  try {
    console.log("iniciando sesion");
    const response = await AxiosInstance.post('/login', formData);
    return response.data;
  } catch (error) {
    console.error('Error al iniciar sesion:', error);
    throw error;
  }
};

const updateUser = async (formData, userId) => {
  try {
    const response = await AxiosInstance.put(`/user/${userId}`, formData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};





export { login, updateUser };