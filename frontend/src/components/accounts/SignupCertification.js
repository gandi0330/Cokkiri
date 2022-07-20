import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useInput from '../../hooks/useInput';
import { certificateNumber } from '../../store/authSlice';

const SignupCertification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [number, onChangeNumber] = useInput('');

  const certificateNumberDispatch = async (data) => {
    await dispatch(certificateNumber(data));
    navigate('/signupDetail', { replace: true });
  };

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    certificateNumberDispatch(e.target.value);
  }, []);

  return (
    <>
      <h1>회원가입</h1>
      <p>인증번호가 귀하의 메일로 전송 되었습니다.</p>
      <p>이메일을 통해 온 인증번호 6자리를 입력하시면 가입이 계속됩니다.</p>
      <form>
        <label htmlFor="number">
          인증번호
          <input type="text" name="number" id="number" value={number} onChange={onChangeNumber} maxLength={6} />
        </label>
        <button type="submit" onClick={onSubmit}>인증번호 확인</button>
      </form>
      <p>이메일이 안보이시나요?</p>
      {' '}<p>1. 스팸 편지함 확인 해 보기</p>
      {' '}<p>2. 인증 메일 다시 보내기</p>
    </>
  );
};

export default SignupCertification;
