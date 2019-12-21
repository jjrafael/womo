import axios from 'axios';
import _get from 'lodash.get';

const axiosInstance = axios.create({
  baseURL: process.env.PLATFORM_API_URL
});

axiosInstance.interceptors.request.use(config => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(response => {
  return response;
}, error => {
  const customMessage = _get(error, 'response.data.message', 'Something went wrong.');
  error.apiMessage = customMessage;

  return Promise.reject(error);
});

export default axiosInstance;