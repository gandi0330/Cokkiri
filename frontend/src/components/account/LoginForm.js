import { useCallback } from 'react';
// import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import useInput from '../../hooks/useInput';
// import { loginRequest } from '../../store/authSlice';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const loginDispatch = async (data) => {
    console.log(data);
    // await dispatch(loginRequest(data));
    navigate('/rooms', { replace: true });
  };

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    loginDispatch({
      email, password,
    });
  }, [email, password]);

  return (
    <div className={styles.main}>
      <h2>로그인</h2>
      <form>
        <div className={styles.inputBox}>
          <label htmlFor="email">이메일</label>
          <input type="email" placeholder="이메일을 입력해 주세요." id="email" name="email" value={email} onChange={onChangeEmail} />
        </div>
        <br />
        <div className={styles.inputBox}>
          <label htmlFor="password">비밀번호</label>
          <input type="password" placeholder="비밀번호를 입력해 주세요." id="password" name="password" value={password} onChange={onChangePassword} />
        </div>
        <button type="submit" onClick={onSubmit}>로그인</button>
      </form>
      <Link className={styles.link} to="/signupEmail">회원가입</Link>
    </div>
  );
};

export default LoginForm;
