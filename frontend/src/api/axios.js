import axios from 'axios';

// const BASE_URL = 'http://i7c107.p.ssafy.io:8080';
// const BASE_URL = '';

export default axios.create({
  baseURL: '',
});

export const axiosPrivate = axios.create({
  baseURL: '',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
