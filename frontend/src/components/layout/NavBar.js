import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { MdOutlineAccountCircle } from 'react-icons/md';
import classes from './NavBar.module.css';
import Elephant from '../../images/Elephant.png';

const NavBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <nav className={classes.nav}>
      <ul>
        <div className={classes.navItems}>
          <li id="logo" className={classes.logo}>
            <img src={Elephant} alt="cokkiri logo" />
            <NavLink to="/">Co:kkiri</NavLink>
          </li>
          <li>
            <NavLink
              to="/my-record"
              className={classes.navItem}
              style={({ isActive }) => ({ color: isActive ? '#587291' : '#B3B6B7' })}
            >
              공부기록
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/rooms"
              className={classes.navItem}
              style={({ isActive }) => ({ color: isActive ? '#587291' : '#B3B6B7' })}
            >
              스터디 룸
            </NavLink>
          </li>
        </div>
        <li>
          {isLoggedIn && <Link to="/login">로그인</Link>}
          {!isLoggedIn && (
            <MdOutlineAccountCircle
              size="2.5rem"
              className={classes.accountIcon}
              onClick={() => setShowDropdown((prevState) => !prevState)}
            />
          )}
          {showDropdown && (
            <div className={classes.dropdown}>
              <div className={classes.dropdownMenu}>
                <div>닉네임: ssafyforever</div>
                <div>이메일: ssafy@naver.com</div>
                <Link to="/logout">비밀번호 변경</Link>
                <Link to="/logout">로그아웃</Link>
              </div>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
