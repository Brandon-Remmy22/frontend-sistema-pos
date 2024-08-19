import AxiosInstance from "../axiosInstance";

const getCategories = async () => {
    try {
        const response = await AxiosInstance.get('/categoria');
        return response.data;
    } catch (error) {

    }
}

const getCategorie = async ( id ) => {
    try {
        const response = await AxiosInstance.get(`/categoria/${id}`);
        return response.data;
    } catch (error) {

    }
}

const createCategory = async (formData) => {
    try {
        const response = await AxiosInstance.post('/categoria', formData);
        return response.data;
    } catch (error) {
        console.error('Error al crear la catengoria:', error);
        throw error;
    }
};

const updateCategory = async (formData, id) => {
    try {
        const response = await AxiosInstance.put(`/categoria/${id}`, formData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const deleteCategory = async (id) => {
    try {
        const response = await AxiosInstance.delete(`/categoria/${id}`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

export { getCategories, getCategorie, createCategory, updateCategory, deleteCategory};