import {
  useCallback, useEffect, useRef, useState,
} from 'react';
// import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AiFillWarning } from 'react-icons/ai';

import useInput from '../../hooks/useInput';
// import { reqCertificationNumber } from '../../store/authSlice';
import styles from './Account.module.css';
import { validateEmail } from './validationCheck';

const SignupEmail = () => {
  const inputBox = useRef();
  const submitBtn = useRef();
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, onChangeEmail] = useInput('');
  const [emailError, setEmailError] = useState(false);

  const reqCertificationNumberDispatch = async () => {
    // await dispatch(reqCertificationNumber());
    navigate('/signupCertification', { replace: true });
  };

  useEffect(() => {
    if (email === '') {
      return;
    }
    if (validateEmail(email)) {
      setEmailError(false);
      inputBox.current.classList.remove(styles.errorBox);
      submitBtn.current.classList.add(styles.successBtn);
      return;
    }
    setEmailError(true);
    inputBox.current.classList.add(styles.errorBox);
    submitBtn.current.classList.remove(styles.successBtn);
  }, [email]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    if (!emailError) {
      reqCertificationNumberDispatch();
    }
  }, [emailError]);

  return (
    <div className={styles.main}>
      <h2>회원가입</h2>
      <form onSubmit={onSubmit}>
        <div ref={inputBox} className={styles.inputBox}>
          { emailError
            && (
              <div className={styles.errorMsg}>
                <AiFillWarning className={styles.icon} />
                유효한 이메일을 입력해 주세요.
              </div>
            )}
          <label htmlFor="email">이메일</label>
          <input placeholder="이메일을 입력해 주세요." name="email" id="email" value={email} onChange={onChangeEmail} />
        </div>
        <button ref={submitBtn} type="submit">인증번호 보내기</button>
      </form>
    </div>
  );
};

export default SignupEmail;
