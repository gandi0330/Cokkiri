import { useCallback } from 'react';
// import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillWarning } from 'react-icons/ai';

// import { certificateNumber } from '../../store/authSlice';
import styles from './Account.module.css';
import Timer from './Timer';
import useValidation from '../../hooks/useValidation';
import { validateNumber } from './validationCheck';

const SignupCertification = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const {
    value: certificateNumber,
    hasError: certificateNumberHasError,
    errorMsg: certificateNumberErrorMsg,
    valueChangeHandler: certificateNumberChangeHandler,
    inputBlurHandler: certificateNumberBlurHandler,
  } = useValidation([{ fn: validateNumber, msg: '잘못된 인증번호를 입력하셨습니다.' }]);

  const certificateNumberDispatch = async (data) => {
    console.log(data);
    // await dispatch(certificateNumber(data));
    navigate('/signupDetail', { replace: true });
  };

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    if (certificateNumberHasError) {
      return;
    }
    certificateNumberDispatch(e.target.value);
  }, [certificateNumberHasError]);

  return (
    <div className={styles.main}>
      <h2>회원가입</h2>
      <p>인증번호가 귀하의 메일로 전송 되었습니다.</p>
      <p>이메일을 통해 온 인증번호 6자리를 입력하시면 가입이 계속됩니다.</p>
      <br />
      <form onSubmit={onSubmit}>
        <div className={`${styles.inputBox} ${certificateNumberErrorMsg && styles.invalid}`}>
          { certificateNumberHasError
              && (
                <span className={styles.errorMsg}>
                  <AiFillWarning className={styles.icon} />
                  잘못된 인증번호를 입력하셨습니다.
                </span>
              )}
          <span className={styles.timer}><Timer min={3} sec={0} /></span>
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
