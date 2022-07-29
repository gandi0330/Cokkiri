import { useSelector } from 'react-redux';
import axios from '../api/axios';
import { getAllUserState } from '../store/authSlice';

const useRefreshToken = () => {
  let { email } = useSelector(getAllUserState);

  const refresh = async () => {
    if (!email) email = localStorage.getItem('email');
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
