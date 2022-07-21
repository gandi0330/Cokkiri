import { useCallback } from 'react';
// import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useInput from '../../hooks/useInput';
// import { signup } from '../../store/authSlice';

const SignupDetail = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordCheck, onChangePasswordCheck] = useInput('');

  const certificateNumberDispatch = async () => {
    // await dispatch(signup());
    navigate('/login', { replace: true });
  };

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    if (password !== passwordCheck) {
      return alert('비밀번호가 다릅니다!');
    }
    certificateNumberDispatch({
      email, password,
    });
    return undefined;
  }, [email, password, passwordCheck]);

  return (
    <form>
      <label htmlFor="email">이메일
        <input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
      </label>
      <label htmlFor="password">비밀번호
        <input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
      </label>
      <label htmlFor="passwordCheck">비밀번호 확인
        <input type="password" id="passwordCheck" name="passwordCheck" value={passwordCheck} onChange={onChangePasswordCheck} />
      </label>
      <button type="submit" onClick={onSubmit}>회원가입</button>
    </form>
  );
};

export default SignupDetail;
