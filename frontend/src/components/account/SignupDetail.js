import {
  useCallback, useEffect, useRef, useState,
} from 'react';
// import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AiFillWarning } from 'react-icons/ai';

import useInput from '../../hooks/useInput';
// import { signup } from '../../store/authSlice';
import styles from './Account.module.css';
import { validateEmail, validateNickname, validatePassword } from './validationCheck';

const SignupDetail = () => {
  const emailInput = useRef();
  const nicknameInput = useRef();
  const passwordInput = useRef();
  const passwordCheckInput = useRef();
  const submitBtn = useRef();

  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordCheck, setPasswordCheck] = useState('');
  
  const [emailError, setEmailError] = useState(false);
  const [nicknameError, setNicknameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordCheckError, setPasswordCheckError] = useState(false);

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
    setPasswordCheckError(password !== e.target.value);
  }, [password]);

  const certificateNumberDispatch = async () => {
    // await dispatch(signup());
    navigate('/login', { replace: true });
  };

  useEffect(() => {
    if (email === '') {
      return;
    }
    if (!validateEmail(email)) {
      setEmailError(true);
      emailInput.current.classList.add(styles.errorBox);
    } else {
      setEmailError(false);
      emailInput.current.classList.remove(styles.errorBox);
    }
  }, [email]);

  useEffect(() => {
    if (nickname === '') {
      return;
    }
    if (!validateNickname(nickname)) {
      setNicknameError(true);
      nicknameInput.current.classList.add(styles.errorBox);
    } else {
      setNicknameError(false);
      nicknameInput.current.classList.remove(styles.errorBox);
    }
  }, [nickname]);

  useEffect(() => {
    if (password === '') {
      return;
    }
    if (!validatePassword(password)) {
      setPasswordError(true);
      passwordInput.current.classList.add(styles.errorBox);
    } else {
      setPasswordError(false);
      passwordInput.current.classList.remove(styles.errorBox);
    }
  }, [password]);

  useEffect(() => {
    if (passwordCheck === '') {
      return;
    }
    if (validatePassword(passwordCheck) && password === passwordCheck) {
      setPasswordCheckError(false);
      passwordCheckInput.current.classList.remove(styles.errorBox);
    } else {
      setPasswordCheckError(true);
      passwordCheckInput.current.classList.add(styles.errorBox);
    }
  }, [password, passwordCheck]);

  useEffect(() => {
    if (email === '' || nickname === '' || password === '' || passwordCheck === '') {
      return;
    }
    if (!emailError && !nicknameError && !passwordError && !passwordCheckError) {
      submitBtn.current.classList.add(styles.successBtn);
      return;
    }
    submitBtn.current.classList.remove(styles.successBtn);
  }, [email, nickname, password, passwordCheck,
    emailError, nicknameError, passwordError, passwordCheckError]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    if (password !== passwordCheck) {
      setPasswordCheckError(true);
      return;
    }
    certificateNumberDispatch({
      email, password,
    });
  }, [email, password, passwordCheck]);

  return (
    <div className={styles.main}>
      <h2>회원가입</h2>
      <form>
        <div ref={emailInput} className={styles.inputBox}>
          { emailError
              && (
                <div className={styles.errorMsg}>
                  <AiFillWarning className={styles.icon} />
                  유효한 이메일를 입력해 주세요.
                </div>
              )}
          <label htmlFor="email">이메일</label>
          <input placeholder="이메일을 입력해 주세요." id="email" name="email" value={email} onChange={onChangeEmail} />
        </div>
        <br />
        <div ref={nicknameInput} className={styles.inputBox}>
          { nicknameError
              && (
                <div className={styles.errorMsg}>
                  <AiFillWarning className={styles.icon} />
                  유효한 닉네임을 입력해 주세요.
                </div>
              )}
          <label htmlFor="nickname">닉네임</label>
          <input placeholder="닉네임을 입력해 주세요." id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
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
        <br />
        <div ref={passwordCheckInput} className={styles.inputBox}>
          { passwordCheckError
                && (
                  <div className={styles.errorMsg}>
                    <AiFillWarning className={styles.icon} />
                    비밀번호가 일치하지 않습니다.
                  </div>
                )}
          <label htmlFor="passwordCheck">비밀번호 확인</label>
          <input type="password" placeholder="비밀번호를 다시 입력해 주세요." id="passwordCheck" name="passwordCheck" value={passwordCheck} onChange={onChangePasswordCheck} />
        </div>
        <button ref={submitBtn} type="submit" onClick={onSubmit}>회원가입</button>
      </form>
    </div>
  );
};

export default SignupDetail;
