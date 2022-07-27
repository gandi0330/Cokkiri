import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { getToken } from '../store/authSlice';

const BASE_URL = 'http://i7c107.p.ssafy.io:8080';

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default axios;
