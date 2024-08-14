import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// AxiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response && error.response.status === 401) {
//       localStorage.removeItem('token');
//     }
//     return Promise.reject(error);
//   }
// );
export default AxiosInstance;
