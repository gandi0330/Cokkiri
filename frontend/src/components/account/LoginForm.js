import {
  useCallback, useEffect, useRef, useState,
} from 'react';
// import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillWarning } from 'react-icons/ai';

import useInput from '../../hooks/useInput';
// import { loginRequest } from '../../store/authSlice';
import styles from './Account.module.css';
import { validateEmail, validatePassword } from './validationCheck';

const LoginForm = () => {
  const emailInput = useRef();
  const passwordInput = useRef();
  const submitBtn = useRef();
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  // useSelector로 loginError 받아오기

  const loginDispatch = async (data) => {
    console.log(data);
    // await dispatch(loginRequest(data));
    navigate('/rooms', { replace: true });
  };

  useEffect(() => {
    if (email === '') {
      return;
    }
    if (validateEmail(email)) {
      setEmailError(false);
      emailInput.current.classList.remove(styles.errorBox);
      return;
    }
    setEmailError(true);
    emailInput.current.classList.add(styles.errorBox);
  }, [email]);

  useEffect(() => {
    if (password === '') {
      return;
    }
    if (validatePassword(password)) {
      setPasswordError(false);
      passwordInput.current.classList.remove(styles.errorBox);
      return;
    }
    setPasswordError(true);
    passwordInput.current.classList.add(styles.errorBox);
  }, [password]);
  
  useEffect(() => {
    if (email === '' || password === '') {
      return;
    }
    if (!emailError && !passwordError) {
      submitBtn.current.classList.add(styles.successBtn);
      return;
    }
    submitBtn.current.classList.remove(styles.successBtn);
  }, [email, password, emailError, passwordError]);

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
        <div ref={emailInput} className={styles.inputBox}>
          { emailError
              && (
                <div className={styles.errorMsg}>
                  <AiFillWarning className={styles.icon} />
                  유효한 이메일을 입력해 주세요.
                </div>
              )}
          <label htmlFor="email">이메일</label>
          <input type="email" placeholder="이메일을 입력해 주세요." id="email" name="email" value={email} onChange={onChangeEmail} />
        </div>
        <br />
        <div ref={passwordInput} className={styles.inputBox}>
          { passwordError
              && (
                <div className={styles.errorMsg}>
                  <AiFillWarning className={styles.icon} />
                  유효한 비밀번호를 입력해 주세요.
                </div>
              )}
          <label htmlFor="password">비밀번호</label>
          <input type="password" placeholder="비밀번호를 입력해 주세요." id="password" name="password" value={password} onChange={onChangePassword} />
        </div>
        <button ref={submitBtn} type="submit" onClick={onSubmit}>로그인</button>
      </form>
      <div className={styles.formFooter}>
        <Link className={styles.link} to="/signupEmail">회원가입</Link>
        <Link className={styles.link} to="/">비밀번호 찾기</Link>
      </div>
    </div>
  );
};

export default LoginForm;
