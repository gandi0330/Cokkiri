import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import classes from './NavBar.module.css';
import Elephant from '../../images/Elephant.png';
import { 
  getLoggedIn, logout, 
  resetUser,
} from '../../store/authSlice';
// import useRefreshToken from '../../hooks/useRefreshToken';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';

const NavBar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getLoggedIn);
  // const email = useSelector(getUserEmail);
  // const refresh = useRefreshToken();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const getUserInfo = async () => {
    const res = await axiosPrivate.get(`/user/info/${auth.email}`);
    console.log(res);
  };

  const logoutHandler = () => {
    dispatch(logout({ email })).unwrap()
      .then(() => {
        dispatch(resetUser);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <nav className={classes.nav}>
      <i id="logo" className={classes.logo}>
        <img src={Elephant} alt="코끼리 로고" />
        <Link to="/">Co:kkiri</Link>
      </i>
      <input type="checkbox" id="navToggle" className={classes.navToggle} />
      <ul>
        <li>
          <Link to="/my-record">공부 기록</Link>
        </li>
        <li>
          <Link to="/rooms">스터디 룸</Link>
        </li>
        <li> 
          {/* FIX url 수정 필요 */}
          <Link to="/rooms">마이 페이지</Link>
        </li>
        <li>
          {isLoggedIn && <Link to="/login">로그인</Link>}
          {!isLoggedIn && (
            <>
              {/* <div><span>kkiri</span>님</div>
              <div><span>이메일: </span>ssafy@naver.com</div>
              <Link to="/logout">비밀번호 변경</Link> */}
              <button type="button" onClick={logoutHandler}>로그아웃</button>
            </>
          )}
        </li>
        <li>
          <button type="button" onClick={() => getUserInfo()}>refresh</button>
        </li>
      </ul>
      <label htmlFor="navToggle" className={classes.navToggleLabel}>
        <span>{/*  */}</span>
      </label>
    </nav>
  );
};

export default NavBar;
