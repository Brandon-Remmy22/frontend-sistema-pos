import AxiosInstance from "../axiosInstance";

const getClients = async () => {
    try {
        const response = await AxiosInstance.get('/cliente');
        return response.data;
    } catch (error) {

    }
}

const getClientsSearch = async (buscar = null) => {
    try {
        const response = await AxiosInstance.get(buscar == null ? '/cliente-search' : `/cliente-search?buscar=${buscar}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getClient = async (alrticleId) => {
    try {
        const response = await AxiosInstance.get(`/cliente/${clientId}`);
        return response.data;
    } catch (error) {

    }
}

const createClient = async (newClient) => {
    try {
        const response = await AxiosInstance.post('/cliente', newClient);
        return response.data;
    } catch (error) {
        console.error('Error al crear la catengoria:', error);
        throw error;
    }
};

const updateClient = async (formData, clientId) => {
    try {
        const response = await AxiosInstance.put(`/cliente/${clientId}`, formData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const deleteClient = async (clientId) => {
    try {
        const response = await AxiosInstance.delete(`/cliente/${clientId}`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

export { getClients, getClientsSearch, getClient, createClient, updateClient, deleteClient };