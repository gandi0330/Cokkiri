import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AiFillWarning } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import styles from './Account.module.css';
import useValidation from '../../hooks/useValidation';
import { validateEmail } from './validationCheck';
import { singupEmail } from '../../store/authSlice';

const SignupEmail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    value: email,
    hasError: emailHasError,
    errorMsg: emailErrorMsg,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useValidation([{ fn: validateEmail, msg: '유효한 이메일을 입력해 주세요.' }]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    if (emailHasError) {
      return;
    }
    dispatch(singupEmail({ email })).then(() => {
      navigate('/signupCertification', { replace: true, state: { email } });
    });
  }, [email, emailHasError]);

  return (
    <div className={styles.main}>
      <h2>회원가입</h2>
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
          <input placeholder="이메일을 입력해 주세요." name="email" id="email" value={email} onChange={emailChangeHandler} onBlur={emailBlurHandler} />
        </div>
        <button type="submit">인증번호 보내기</button>
      </form>
    </div>
  );
};

export default SignupEmail;
