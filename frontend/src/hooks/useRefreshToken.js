import axios from 'axios';

const useRefreshToken = () => {
  const refresh = async () => {
    const email = localStorage.getItem('email');
    if (email) {
      const response = await axios.get(`/user/refreshtoken/${email}`);
      localStorage.setItem('token', response.data.accessToken);
      return response.data.accessToken;
    }
    return '';
  };
  
  return refresh;
};

export default useRefreshToken;
