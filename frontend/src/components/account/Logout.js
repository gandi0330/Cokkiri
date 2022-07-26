import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';

// import { logout } from '../../store/authSlice';

const Logout = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  useEffect(() => {
    navigate('/login', { replace: true });
    // 이메일을 넣어야함
    // dispatch(logout()).then(() => {
    //   navigate('/login', { replace: true });
    // });
  }, []);
  return <div>...로그아웃 중</div>;
};

export default Logout;
