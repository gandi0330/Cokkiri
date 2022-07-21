import { useCallback } from 'react';
// import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useInput from '../../hooks/useInput';
// import { reqCertificationNumber } from '../../store/authSlice';

const SignupEmail = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, onChangeEmail] = useInput('');

  const reqCertificationNumberDispatch = async () => {
    // await dispatch(reqCertificationNumber());
    navigate('/signupCertification', { replace: true });
  };

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    reqCertificationNumberDispatch();
  }, []);

  return (
    <>
      <h1>회원가입</h1>
      <form>
        <label htmlFor="email">
          이메일
          <input type="email" name="email" id="email" value={email} onChange={onChangeEmail} />
        </label>
        <button type="submit" onClick={onSubmit}>인증번호 보내기</button>
      </form>
    </>
  );
};

export default SignupEmail;
