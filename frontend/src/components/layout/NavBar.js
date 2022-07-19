import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/my-record">공부기록</NavLink>
      <NavLink to="/rooms">스터디 룸</NavLink>
      <NavLink to="/my-page">마이 페이지</NavLink>
      <button type="button"><NavLink to="/login">login</NavLink></button>
      <button type="button"><NavLink to="/logout">logout</NavLink></button>
      <NavLink to="/signup">signup</NavLink>
    </nav>
  );
};

export default NavBar;
