import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// Default config for axios instance
const axiosParams = {
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api/'
      : 'http://localhost:3000/api/',
};

//Create axios instance
const axiosInstance = axios.create(axiosParams);

//Main API function
const api = (axios: AxiosInstance) => {
  return {
    get: <T>(url: string, config: AxiosRequestConfig = {}) =>
      axios.get<T>(url, config),
  };
};

export default api(axiosInstance);
