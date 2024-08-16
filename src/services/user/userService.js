import AxiosInstance from "../axiosInstance";

const getUsers = async () => {
    try {
        const response = await AxiosInstance.get('/usuario');
        return response.data;
    } catch (error) {

    }
}

const getUser = async ( alrticleId ) => {
    try {
        const response = await AxiosInstance.get(`/usuario/${clientId}`);
        return response.data;
    } catch (error) {

    }
}

const createUser = async (newClient) => {
    try {
        const response = await AxiosInstance.post('/usuario', newClient);
        return response.data;
    } catch (error) {
        console.error('Error al crear usuario:', error);
        throw error;
    }
};
const createSell = async (newClient) => {
    try {
        const response = await AxiosInstance.post('/crear-vendedor', newClient);
        return response.data;
    } catch (error) {
        console.error('Error al crear vendedor:', error);
        throw error;
    }
};

const changePassword = async (user) => {
    try {
        const response = await AxiosInstance.post('/cambiar-contrasenia', user);
        return response.data;
    } catch (error) {
        console.error('Error al crear vendedor:', error);
        throw error;
    }
};

const updateUser = async (formData, clientId) => {
    try {
        const response = await AxiosInstance.put(`/usuario/${clientId}`, formData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const deleteUser = async (clientId) => {
    try {
        const response = await AxiosInstance.delete(`/usuario/${clientId}`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

export { getUsers, getUser, createUser, updateUser, deleteUser, createSell, changePassword};