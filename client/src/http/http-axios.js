import axios from 'axios';

const $http = axios.create({
  baseURL: process.env.VUE_APP_SERVER_URL,
  withCredentials: true
});

$http.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
  return config;
})
export default $http;