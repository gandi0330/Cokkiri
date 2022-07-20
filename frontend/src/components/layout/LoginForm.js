import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import useInput from '../../hooks/useInput';
import { login } from '../../store/authSlice';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const loginDispatch = async (data) => {
    await dispatch(login(data));
    navigate('/rooms', { replace: true });
  };

  const onClickBtn = useCallback((e) => {
    e.preventDefault();
    loginDispatch({
      email, password,
    });
  }, [email, password]);

  return (
    <>
      <form>
        <label htmlFor="email">이메일
          <input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
        </label>
        <label htmlFor="password">비밀번호
          <input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
        </label>
        <button type="submit" onClick={onClickBtn}>로그인</button>
      </form>
      <Link to="/signup">회원가입</Link>
    </>
  );
};

export default LoginForm;
