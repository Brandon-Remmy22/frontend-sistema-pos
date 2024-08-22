import AxiosInstance from "../axiosInstance";

const getSales = async () => {
    try {
        const response = await AxiosInstance.get('/venta');
        return response.data;
    } catch (error) {

    }
}

const getSale = async (id) => {
    try {
        const response = await AxiosInstance.get(`/venta/${id}`);
        return response.data;
    } catch (error) {

    }
}

const createSale = async (formData) => {
    try {
        const response = await AxiosInstance.post('/venta', formData);
        return response.data;
    } catch (error) {
        console.error('Error al crear la catengoria:', error);
        throw error;
    }
};

const updateSale = async (formData, id) => {
    try {
        const response = await AxiosInstance.put(`/venta/${id}`, formData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const deleteSale = async (id) => {
    try {
        const response = await AxiosInstance.delete(`/venta/${id}`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

export { getSales, getSale, createSale, updateSale, deleteSale };