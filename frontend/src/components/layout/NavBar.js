import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import classes from './NavBar.module.css';
import Elephant from '../../images/Elephant.png';
import { logout } from '../../store/authSlice';

const NavBar = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const email = localStorage.getItem('email');

  const logoutHandler = () => {
    dispatch(logout({ email })).unwrap()
      .then(() => {})
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
          {!isLoggedIn ? <Link to="/login">로그인</Link> 
            : <Link to="/logout" onClick={logoutHandler}>로그아웃</Link>}
        </li>
      </ul>
      <label htmlFor="navToggle" className={classes.navToggleLabel}>
        <span>{/*  */}</span>
      </label>
    </nav>
  );
};

export default NavBar;
