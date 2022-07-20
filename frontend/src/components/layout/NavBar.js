import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NavBar = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/my-record">공부기록</NavLink>
      <NavLink to="/rooms">스터디 룸</NavLink>
      <NavLink to="/my-page">마이 페이지</NavLink>
      { !isLoggedIn && <button type="button"><NavLink to="/login">login</NavLink></button>}
      { isLoggedIn && <button type="button"><NavLink to="/logout">logout</NavLink></button>}
    </nav>
  );
};

export default NavBar;
