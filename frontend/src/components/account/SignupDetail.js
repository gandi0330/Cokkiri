import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillWarning } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import Timer from './Timer';
import useValidation from '../../hooks/useValidation';
import { 
  validateEmail, validateNickname, validatePassword, validateNumber,
} from './validationCheck';
import { fetchAuthToken, getIsEmailSend, signup } from '../../store/authSlice';
import styles from './Account.module.css';

const SignupDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signupError, setSignupError] = useState(null);
  const isEmailSend = useSelector(getIsEmailSend);
  const [sendAuthFailMsg, setSendAuthFailMsg] = useState(null);
  const [failMsg, setFailMsg] = useState(null);

  const alertUser = (event) => {
    event.preventDefault();
    event.returnValue = '정말 나가시겠습니까?';
  };

  useEffect(() => {
    window.addEventListener('beforeunload', alertUser);
    return () => {
      window.removeEventListener('beforeunload', alertUser);
    };
  }, []);

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
  } = useValidation([{ fn: validateNickname, msg: '닉네임은 5글자 이상 영어 대소문자, 숫자, _만 가능합니다.' }]);

  const {
    value: password,
    hasError: passwordHasError,
    errorMsg: passwordErrorMsg,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useValidation([{ fn: validatePassword, msg: '비밀번호는 영어 대문자, 소문자, 숫자, 특수문자(!@#$%^&*) 포함 8글자 이상입니다.' }]);

  const {
    value: certificateNumber,
    hasError: certificateNumberHasError,
    reset: resetCertificateNumber,
    errorMsg: certificateNumberErrorMsg,
    valueChangeHandler: certificateNumberChangeHandler,
    inputBlurHandler: certificateNumberBlurHandler,
  } = useValidation([{ fn: validateNumber, msg: '잘못된 인증번호를 입력하셨습니다.' }]);
  
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

  const requestAuthToken = () => {
    setSendAuthFailMsg(null);
    resetCertificateNumber();

    if (emailHasError) {
      setSendAuthFailMsg('이메일을 다시 확인해주세요.');
      return;
    }

    if (nicknameHasError) {
      setSendAuthFailMsg('닉네임을 다시 확인해주세요.');
      return;
    }

    if (passwordHasError) {
      setSendAuthFailMsg('비밀번호를 다시 확인해주세요.');
      return;
    }

    if (passwordCheckError) {
      setSendAuthFailMsg('비밀번호 확인을 다시 확인해주세요.');
      return;
    }

    dispatch(fetchAuthToken({ email }))
      .unwrap()
      .then()
      .catch(() => {
        setSendAuthFailMsg('인증번호 요청 과정에서 에러가 발생했습니다. 다시 시도해 주세요.');
      });
  };

  const onTimerZero = () => {
    setFailMsg('시간이 초과되었습니다. 다시 시도해 주세요.');
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (emailHasError || nicknameHasError 
      || passwordHasError || passwordCheckError 
      || certificateNumberHasError) {
      return;
    }
    // dispatch(addUserForSignup({ email, nickname, pwd: password }));
    // navigate('/signupEmail', { replace: true });
    dispatch(signup({ 
      email, authToken: certificateNumber, nickname, password,
    })).unwrap()
      .then(() => {
        navigate('/login', { replace: true });
      })
      .catch((err) => {
        if (err.statusCode === 409) {
          setFailMsg('이미 존재하는 이메일입니다.');
        } else if (err.statusCode === 401) {
          setFailMsg('인증번호를 잘못 입력하셨습니다.');
        } else {
          setFailMsg('에러가 발생했습니다.');
        }
      });
  };

  return (
    <div className={styles.main}>
      <h2>회원가입</h2>
      <form onSubmit={onSubmit}>
        
        {(emailHasError || signupError) && (
          <div className={styles.errorMsg}>
            <AiFillWarning className={styles.icon} />
            {emailErrorMsg || signupError}
          </div>
        )}

        <div className={`${styles.inputBox} ${emailHasError && styles.invalid}`}>
          <label htmlFor="email">이메일</label>
          <input placeholder="이메일을 입력해 주세요." id="email" name="email" value={email} onChange={onEmailChangeHandler} onBlur={emailBlurHandler} />
        </div>

        {nicknameHasError && (
          <div className={styles.errorMsg}>
            <AiFillWarning className={styles.icon} />
            {nicknameErrorMsg}
          </div>
        )}

        <div className={`${styles.inputBox} ${nicknameHasError && styles.invalid}`}>
          <label htmlFor="nickname">닉네임</label>
          <input placeholder="닉네임을 입력해 주세요." id="nickname" name="nickname" value={nickname} onChange={nicknameChangeHandler} onBlur={nicknameBlurHandler} />
        </div>
        
        {passwordHasError && (
          <div className={styles.errorMsg}>
            <AiFillWarning className={styles.icon} />
            {passwordErrorMsg}
          </div>
        )}

        <div className={`${styles.inputBox} ${passwordHasError && styles.invalid}`}>
          <label htmlFor="password">비밀번호</label>
          <input type="password" placeholder="비밀번호를 입력해 주세요." id="password" name="password" value={password} onChange={passwordChangeHandler} onBlur={passwordBlurHandler} />
        </div>

        {passwordCheckError && (
          <div className={styles.errorMsg}>
            <AiFillWarning className={styles.icon} />
            비밀번호가 일치하지 않습니다.
          </div>
        )}

        <div className={`${styles.inputBox} ${passwordCheckError && styles.invalid}`}>
          <label htmlFor="passwordCheck">비밀번호 확인</label>
          <input type="password" placeholder="비밀번호를 다시 입력해 주세요." id="passwordCheck" name="passwordCheck" value={passwordCheck} onChange={onChangePasswordCheck} />
        </div>

        {sendAuthFailMsg && (
          <div className={styles.errorMsg}>
            <AiFillWarning className={styles.icon} />
            {sendAuthFailMsg}
          </div>
        )}

        {!isEmailSend && (
          <button type="button" onClick={requestAuthToken} className={styles.authToken__btn}>
            인증번호 보내기
          </button>
        )}
        
        {isEmailSend && (
          <>
            <div className={styles.authToken__msg}>
              <span>인증번호가 귀하의 메일로 전송 되었습니다.</span>
              <span>이메일 인증번호 6자리를 입력해주세요.</span>
            </div>

            {(certificateNumberHasError || failMsg) && (
              <span className={styles.errorMsg}>
                <AiFillWarning className={styles.icon} />
                {failMsg || ('잘못된 인증번호를 입력하셨습니다.')}
              </span>
            )}

            <div className={`${styles.inputBox} ${certificateNumberErrorMsg && styles.invalid}`}>

              <span className={styles.timer}>
                <Timer min={3} sec={0} onTimerZero={onTimerZero} />
              </span>
              
              <label htmlFor="number">인증번호</label>
              
              <input 
                placeholder="인증번호를 입력해 주세요." 
                name="number" 
                id="number" 
                value={certificateNumber} 
                onChange={certificateNumberChangeHandler} 
                onBlur={certificateNumberBlurHandler} 
                maxLength={6} 
              />

            </div>
            {/* <button type="button" onClick={checkAuthTokenHandler}>인증번호 확인</button> */}
            <div className={styles.formFooter}>
              <span>인증번호를 받지 못하셨나요?</span>
              <button type="button" onClick={requestAuthToken}>인증번호 재전송</button>
            </div>
          </>
        )}
        {isEmailSend && <button type="submit" className={styles.formBtn}>회원가입</button>}
      </form>
    </div>
  );
};

export default SignupDetail;
