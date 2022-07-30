import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillWarning } from 'react-icons/ai';

import styles from './Account.module.css';
import useValidation from '../../hooks/useValidation';
import { validateEmail, validatePassword } from './validationCheck';
import { login, addUserEmail, getUserInfo } from '../../store/authSlice';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginError, setloginError] = useState(null);

  const {
    value: email,
    hasError: emailHasError,
    errorMsg: emailErrorMsg,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useValidation([{ fn: validateEmail, msg: '이메일이 유효하지 않습니다.' }]);

  const {
    value: password,
    hasError: passwordHasError,
    errorMsg: passwordErrorMsg,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useValidation([{ fn: validatePassword, msg: '잘못된 비밀번호 입니다.' }]);

  // const onEmailChangeHandler = (event) => {
  //   emailChangeHandler(event);
  //   setloginError(null);
  // };
  // FIX 에러 메시지 제대로 뜨지 않는 중
  const onSubmit = (event) => {
    event.preventDefault();
    if (emailHasError || passwordHasError) return;

    dispatch(login({ email, password })).unwrap()
      .then(() => {
        // const accessToken = res?.accessToken;
        // setAuth({ accessToken, email });

        dispatch(getUserInfo({ email })).unwrap()
          .then(() => {
            navigate('/', { replace: true });
          })
          .catch(() => {
            // DB에 없는 이메일인 경우
            setloginError('아이디 또는 비밀번호를 잘못 입력했습니다.');
          });
      })
      .catch((err) => {
        if (err.statusCode === 401) {
          dispatch(addUserEmail({ email }));
          navigate('/signupEmail');
          return;
        }
        if (err.statusCode === 403 || err.statusCode === 404) {
          setloginError('아이디 또는 비밀번호를 잘못 입력했습니다.');
          console.error(err);
          return;
        }
        setloginError('에러가 발생했습니다.');
      });
  };

  return (
    <div className={styles.main}>
      <h2>로그인</h2>
      <form onSubmit={onSubmit}>
        <div className={`${styles.inputBox} ${emailHasError && styles.invalid}`}>
          { (emailHasError || loginError)
              && (
                <div className={styles.errorMsg}>
                  <AiFillWarning className={styles.icon} />
                  { emailErrorMsg || loginError }
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
        <Link className={styles.link} to="/signupDetail">회원가입</Link>
        {/* <Link className={styles.link} to="/changePassword">비밀번호 찾기</Link> */}
      </div>
    </div>
  );
};

export default LoginForm;
