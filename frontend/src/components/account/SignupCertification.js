import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillWarning } from 'react-icons/ai';

import styles from './Account.module.css';
import Timer from './Timer';
import useValidation from '../../hooks/useValidation';
import { validateNumber } from './validationCheck';
import { signupCertification, getUserEmail } from '../../store/authSlice';

const SignupCertification = () => {
  // TODO 새로고침 시 메인 페이지로 보내기

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector(getUserEmail);
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

  const onTimerZero = () => {
    setFailMsg('시간이 초과되었습니다. 다시 시도해 주세요.');
  };
  
  const {
    value: certificateNumber,
    hasError: certificateNumberHasError,
    errorMsg: certificateNumberErrorMsg,
    valueChangeHandler: certificateNumberChangeHandler,
    inputBlurHandler: certificateNumberBlurHandler,
  } = useValidation([{ fn: validateNumber, msg: '잘못된 인증번호를 입력하셨습니다.' }]);

  const onSubmit = (event) => {
    event.preventDefault();
    if (certificateNumberHasError) {
      return;
    }

    dispatch(signupCertification({ email, number: certificateNumber })).unwrap()
      .then(() => {
        navigate('/login', { replace: true });
      })
      .catch((err) => {
        console.log(err);
        if (err.statusCode === 404) {
          navigate('/login', { replace: true });
          return;
        }
        setFailMsg('인증번호를 잘못 입력하셨습니다.');
      });
  };

  return (
    <div className={styles.main}>
      <h2>회원가입</h2>
      <p>인증번호가 귀하의 메일로 전송 되었습니다.</p>
      <p>이메일 인증번호 6자리를 입력해주세요.</p>
      <br />
      <form onSubmit={onSubmit}>
        <div className={`${styles.inputBox} ${certificateNumberErrorMsg && styles.invalid}`}>
          { (certificateNumberHasError || failMsg)
              && (
                <span className={styles.errorMsg}>
                  <AiFillWarning className={styles.icon} />
                  {failMsg || ('잘못된 인증번호를 입력하셨습니다.')}
                </span>
              )}
          <span className={styles.timer}><Timer min={3} sec={0} onTimerZero={onTimerZero} /></span>
          <label htmlFor="number">인증번호</label>
          <input placeholder="인증번호를 입력해 주세요." name="number" id="number" value={certificateNumber} onChange={certificateNumberChangeHandler} onBlur={certificateNumberBlurHandler} maxLength={6} />
        </div>
        <button type="submit">인증번호 확인</button>
      </form>
      <div className={styles.formFooter}>
        <span>인증번호를 받지 못하셨나요?</span>
        <Link className={styles.link} to="/signupEmail">인증번호 재전송</Link>
      </div>
    </div>
  );
};

export default SignupCertification;
