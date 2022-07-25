import { useCallback } from 'react';
// import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillWarning } from 'react-icons/ai';

// import useInput from '../../hooks/useInput';
// import { loginRequest } from '../../store/authSlice';
import styles from './Account.module.css';
import useValidation from '../../hooks/useValidation';
import { validateEmail, validatePassword } from './validationCheck';

const LoginForm = () => {
  const navigate = useNavigate();
  // useSelector로 loginError 받아오기

  const loginDispatch = async (data) => {
    console.log(data);
    // await dispatch(loginRequest(data));
    navigate('/rooms', { replace: true });
  };

  const {
    value: email,
    hasError: emailHasError,
    errorMsg: emailErrorMsg,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useValidation([{ fn: validateEmail, msg: '유효한 이메일을 입력해 주세요.' }]);

  const {
    value: password,
    hasError: passwordHasError,
    errorMsg: passwordErrorMsg,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useValidation([{ fn: validatePassword, msg: '유효한 비밀번호를 입력해 주세요.' }]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    if (emailHasError || passwordHasError) {
      return;
    }
    loginDispatch({
      email, password,
    });
  }, [email, password, emailHasError, passwordHasError]);

  return (
    <div className={styles.main}>
      <h2>로그인</h2>
      <form onSubmit={onSubmit}>
        <div className={`${styles.inputBox} ${emailHasError && styles.invalid}`}>
          { emailHasError
              && (
                <div className={styles.errorMsg}>
                  <AiFillWarning className={styles.icon} />
                  { emailErrorMsg }
                </div>
              )}
          <label htmlFor="email">이메일</label>
          <input
            placeholder="이메일을 입력해 주세요."
            id="email"
            name="email"
            value={email}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
        </div>
        <br />
        <div className={`${styles.inputBox} ${passwordHasError && styles.invalid}`}>
          { passwordHasError
              && (
                <div className={styles.errorMsg}>
                  <AiFillWarning className={styles.icon} />
                  { passwordErrorMsg }
                </div>
              )}
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호를 입력해 주세요."
            id="password"
            name="password"
            value={password}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
          />
        </div>
        <button type="submit">로그인</button>
      </form>
      <div className={styles.formFooter}>
        <Link className={styles.link} to="/signupEmail">회원가입</Link>
        <Link className={styles.link} to="/">비밀번호 찾기</Link>
      </div>
    </div>
  );
};

export default LoginForm;
