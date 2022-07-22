import {
  useCallback, useEffect, useRef, useState,
} from 'react';
// import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillWarning } from 'react-icons/ai';

import useInput from '../../hooks/useInput';
// import { certificateNumber } from '../../store/authSlice';
import styles from './Account.module.css';
import { validateNumber } from './validationCheck';
import Timer from './Timer';

const SignupCertification = () => {
  const inputBox = useRef();
  const submitBtn = useRef();
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [number, onChangeNumber] = useInput('');
  const [certificationError, setCertificationError] = useState(false);

  const certificateNumberDispatch = async (data) => {
    console.log(data);
    // await dispatch(certificateNumber(data));
    navigate('/signupDetail', { replace: true });
  };

  useEffect(() => {
    if (number === '') {
      return;
    }
    if (validateNumber(number)) {
      inputBox.current.classList.remove(styles.errorBox);
      submitBtn.current.classList.add(styles.successBtn);
      setCertificationError(false);
      return;
    }
    inputBox.current.classList.add(styles.errorBox);
    submitBtn.current.classList.remove(styles.successBtn);
    setCertificationError(true);
  }, [number]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    if (!certificationError) {
      certificateNumberDispatch(e.target.value);
    }
  }, [certificationError]);

  return (
    <div className={styles.main}>
      <h2>회원가입</h2>
      <p>인증번호가 귀하의 메일로 전송 되었습니다.</p>
      <p>이메일을 통해 온 인증번호 6자리를 입력하시면 가입이 계속됩니다.</p>
      <br />
      <form>
        <div ref={inputBox} className={styles.inputBox}>
          { certificationError
              && (
                <span className={styles.errorMsg}>
                  <AiFillWarning className={styles.icon} />
                  잘못된 인증번호를 입력하셨습니다.
                </span>
              )}
          <span className={styles.timer}><Timer min={3} sec={0} /></span>
          <label htmlFor="number">인증번호</label>
          <input placeholder="인증번호를 입력해 주세요." name="number" id="number" value={number} onChange={onChangeNumber} maxLength={6} />
        </div>
        <button ref={submitBtn} type="submit" onClick={onSubmit}>인증번호 확인</button>
      </form>
      <div className={styles.formFooter}>
        <span>인증번호를 받지 못하셨나요?</span>
        <Link className={styles.link} to="/signupEmail">인증번호 재전송</Link>
      </div>
    </div>
  );
};

export default SignupCertification;
