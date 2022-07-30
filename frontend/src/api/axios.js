import axios from 'axios';

const BASE_URL = '';

export default axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// axios.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem('token') || '';
//     if (config.headers) {
//       config.headers = {
//         ...config.headers,
//         jwt: accessToken,
//       };
//     } else {
//       config.headers = { ...config.headers };
//     }
//     return config;
//   },
//   (error) => {
//     console.error(err);
//     return Promise.reject(error);
//   },
// );

// axios.interceptors.response.use(
//   (response) => response,
//   async (error) => { 
//     const prevRequest = error?.config;
//     if (error?.response?.status === 403 && !prevRequest?.sent) {
//       prevRequest.sent = true;
//       const newAccessToken = await refresh();
//       prevRequest.headers.jwt = newAccessToken;
//       return axiosPrivate(prevRequest); 
//     }
//     return Promise.reject(error);
//   },
// );
