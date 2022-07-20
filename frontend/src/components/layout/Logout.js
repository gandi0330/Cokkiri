import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logout } from '../../store/authSlice';

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutDispatch = async () => {
    await dispatch(logout());
    navigate('/login', { replace: true });
  };

  useEffect(() => {
    logoutDispatch();
  }, []);
  return null;
};

export default Logout;
