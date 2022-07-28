import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get(`/user/refreshtoken/${auth.email}`, { withCredentials: true });
    // console.log(response.data.accessToken);
    setAuth((prevState) => {
      // console.log('refresh', JSON.stringify(prevState));
      return { ...prevState, accessToken: response.data.accessToken };
    });

    return response.data.accessToken;
  };
  
  return refresh;
};

export default useRefreshToken;
