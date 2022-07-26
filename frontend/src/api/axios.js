import axios from 'axios';

const BASE_URL = 'http://i7c107.p.ssafy.io:8080';

axios.defaults.baseURL = BASE_URL;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default axios;
