import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AiFillWarning } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import styles from './Account.module.css';
import useValidation from '../../hooks/useValidation';
import { validateEmail, validateNickname, validatePassword } from './validationCheck';
import { signupDetail, addUserEmail } from '../../store/authSlice';

const SignupDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signupError, setSignupError] = useState(null);

  const {
    value: email,
    hasError: emailHasError,
    errorMsg: emailErrorMsg,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useValidation([{ fn: validateEmail, msg: '유효한 이메일을 입력해 주세요.' }]);
  
  const {
    value: nickname,
    hasError: nicknameHasError,
    errorMsg: nicknameErrorMsg,
    valueChangeHandler: nicknameChangeHandler,
    inputBlurHandler: nicknameBlurHandler,
  } = useValidation([{ fn: validateNickname, msg: '유효한 닉네임을 입력해 주세요.' }]);
  const {
    value: password,
    hasError: passwordHasError,
    errorMsg: passwordErrorMsg,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useValidation([{ fn: validatePassword, msg: '유효한 비밀번호를 입력해 주세요.' }]);
  
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordCheckError, setPasswordCheckError] = useState(false);

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
    setPasswordCheckError(password !== e.target.value);
  }, [password]);

  const onEmailChangeHandler = (event) => {
    emailChangeHandler(event);
    setSignupError(null);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (emailHasError || nicknameHasError || passwordHasError || passwordCheckError) {
      return;
    }

    dispatch(signupDetail({ email, nickname, password })).unwrap()
      .then(() => {
        dispatch(addUserEmail({ email }));
        navigate('/signupEmail', { replace: true });
      })
      .catch((err) => {
        if (err.statusCode === 409) {
          setSignupError('이미 존재하는 이메일입니다.');
        }
        console.error(err);
      });
  };

  return (
    <div className={styles.main}>
      <h2>회원가입</h2>
      <form onSubmit={onSubmit}>
        <div className={`${styles.inputBox} ${emailHasError && styles.invalid}`}>
          {(emailHasError || signupError)
          && (
            <div className={styles.errorMsg}>
              <AiFillWarning className={styles.icon} />
              {emailErrorMsg || signupError}
            </div>
          )}
          <label htmlFor="email">이메일</label>
          <input placeholder="이메일을 입력해 주세요." id="email" name="email" value={email} onChange={onEmailChangeHandler} onBlur={emailBlurHandler} />
        </div>
        <br />

        <div className={`${styles.inputBox} ${nicknameHasError && styles.invalid}`}>
          { nicknameHasError
              && (
                <div className={styles.errorMsg}>
                  <AiFillWarning className={styles.icon} />
                  {nicknameErrorMsg}
                </div>
              )}
          <label htmlFor="nickname">닉네임</label>
          <input placeholder="닉네임을 입력해 주세요." id="nickname" name="nickname" value={nickname} onChange={nicknameChangeHandler} onBlur={nicknameBlurHandler} />
        </div>
        <br />
        
        <div className={`${styles.inputBox} ${passwordHasError && styles.invalid}`}>
          { passwordHasError
              && (
                <div className={styles.errorMsg}>
                  <AiFillWarning className={styles.icon} />
                  {passwordErrorMsg}
                </div>
              )}
          <label htmlFor="password">비밀번호</label>
          <input type="password" placeholder="비밀번호를 입력해 주세요." id="password" name="password" value={password} onChange={passwordChangeHandler} onBlur={passwordBlurHandler} />
        </div>
        <br />
        <div className={`${styles.inputBox} ${passwordCheckError && styles.invalid}`}>
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
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default SignupDetail;
