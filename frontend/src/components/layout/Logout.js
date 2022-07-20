import { useEffect } from 'react';

const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logout());
  }, []);
  return null;
};

export default Logout;
