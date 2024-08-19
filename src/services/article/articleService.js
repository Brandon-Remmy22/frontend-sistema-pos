import AxiosInstance from "../axiosInstance";

const getArticles = async () => {
    try {
        const response = await AxiosInstance.get('/producto');
        return response.data;
    } catch (error) {

    }
}

const getArticle = async ( articleId ) => {
    try {
        const response = await AxiosInstance.get(`/producto/${articleId}`);
        return response.data;
    } catch (error) {

    }
}

const createArticle = async (newArticle) => {
    try {
        const response = await AxiosInstance.post('/producto', newArticle);
        return response.data;
    } catch (error) {
        console.error('Error al crear la catengoria:', error);
        throw error;
    }
};

const updateArticle = async (formData, articleId) => {
    try {
        const response = await AxiosInstance.put(`/producto/${articleId}`, formData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const deleteArticle = async (articleId) => {
    try {
        const response = await AxiosInstance.delete(`/producto/${articleId}`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

export { getArticles, getArticle, createArticle, updateArticle, deleteArticle};