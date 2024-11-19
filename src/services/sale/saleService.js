import AxiosInstance from "../axiosInstance";

const getReports = async () => {
    try {
        const response = await AxiosInstance.get('/reporte/ventas');
        return response.data;
    } catch (error) {

    }
}

const getProductsSalesBetter = async () => {
    try {
        const response = await AxiosInstance.get('/reporte/mas-vendidos');
        return response.data;
    } catch (error) {

    }
}

const getSalesForClient = async (id) => {
    try {
        const response = await AxiosInstance.get(`/ventas/cliente/${id}`);
        return response.data;
    } catch (error) {

    }
}

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

const getSalesForCategory = async () => {
    try {
        const response = await AxiosInstance.get(`/reporte/ventas-por-categoria`);
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

export { getSales, getSalesForClient,getSalesForCategory, getSale, createSale, updateSale, deleteSale, getReports, getProductsSalesBetter };