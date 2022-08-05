import axios from 'axios';

// const BASE_URL = 'https://i7c107.p.ssafy.io/api';
const BASE_URL = '';

const useRefreshToken = () => {
  const refresh = async () => {
    const email = localStorage.getItem('email');
    if (email) {
      const response = await axios.get(`${BASE_URL}/user/refreshtoken/${email}`);
      localStorage.setItem('token', response.data.accessToken);
      return response.data.accessToken;
    }
    return '';
  };
  
  return refresh;
};

export default useRefreshToken;
