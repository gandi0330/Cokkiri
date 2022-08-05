import axios from 'axios';
import useRefreshToken from '../hooks/useRefreshToken';

// const BASE_URL = 'https://i7c107.p.ssafy.io/api';
const BASE_URL = '';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('token') || '';
    if (config.headers) {
      config.headers = {
        ...config.headers,
        jwt: accessToken,
      };
    } else {
      config.headers = { ...config.headers };
    }
    return config;
  },
  (error) => {
    console.error(err);
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => { 
    const originalConfig = error?.config;
    const refresh = useRefreshToken();

    // console.log('error', error);
    // console.log('originalConfig', originalConfig);

    if (originalConfig.url !== '/user' && error?.response) {
      if (error.response.status === 401 && !originalConfig?.sent) {
        originalConfig.sent = true;
        try {
          const newAccessToken = await refresh();
          originalConfig.headers.jwt = newAccessToken;
          // console.log('refreshed');
          return axios(originalConfig); 
        } catch (err) {
          localStorage.removeItem('email');
          localStorage.removeItem('token');
          return Promise.reject(err);
        }
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
