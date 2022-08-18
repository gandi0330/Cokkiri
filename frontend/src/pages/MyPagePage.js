import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MdWarning } from 'react-icons/md';
import {
  getUserInfo,
  getNickname,
  changeNickname,
  changePassword,
  deleteUser,
} from '../store/authSlice';
import YesNoModal from '../components/layout/YesNoModal';
import Modal from '../components/layout/Modal';
import useValidation from '../hooks/useValidation';
import { validateNickname, validatePassword } from '../components/account/validationCheck';
import ExcitingElephant from '../components/icons/ExcitingElephant';

import classes from './MyPagePage.module.css';

const MyPagePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email } = useParams();
  const originalNickname = useSelector(getNickname) || '';
  const [nameBtnDisabled, setNameBtnDisabled] = useState(false);
  const [pwdBtnDisabled, setPwdBtnDisabled] = useState(false);
  const [isPwdModalOpen, setIsPwdModalOpen] = useState(false);
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false);
  const [nameSuccessModalOpen, setNameSuccessModalOpen] = useState(false);
  const [pwdSuccessModalOpen, setPwdSuccessModalOpen] = useState(false);

  const {
    value: nickname,
    setValue: setNickname,
    hasError: nicknameHasError,
    errorMsg: nicknameErrMsg,
    valueChangeHandler: nicknameChangeHandler,
    inputBlurHandler: nicknameBlurHandler,
  } = useValidation([{ 
    fn: validateNickname, 
    msg: '닉네임은 5글자 이상 영어 대소문자, 숫자, _만 가능합니다.',
  }]);

  const {
    value: password,
    reset: resetPassword,
    hasError: pwdHasError,
    errorMsg: pwdErrorMsg,
    valueChangeHandler: pwdChangeHandler,
    inputBlurHandler: pwdBlurHandler,
  } = useValidation([{ 
    fn: validatePassword, 
    msg: '비밀번호는 영어 대문자, 소문자, 숫자, 특수문자(!@#$%^&*) 포함 8글자 이상입니다.',
  }]);

  useEffect(() => {
    try {
      dispatch(getUserInfo({ email })).catch((err) => console.error(err));
    } catch (err) {
      console.error(err);
      navigate('/login');
    }
    setNickname(originalNickname);
  }, []);

  useEffect(() => {
    setNickname(originalNickname);
  }, [originalNickname]);

  useEffect(() => {
    if (!email || email !== localStorage.getItem('email')) {
      navigate('/login');
    }
  }, [email]);

  const nicknameSubmitHandler = (event) => {
    event.preventDefault();

    if (nicknameHasError) return;

    setIsNameModalOpen(true);
  };

  const nameSendHandler = () => {
    setNameBtnDisabled(true);
    setTimeout(() => {
      setNameBtnDisabled(false);
    }, 2000);

    dispatch(changeNickname({ email, nickname }))
      .unwrap()
      .then(() => {
        setNickname(nickname);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsNameModalOpen(false));
    
    setIsNameModalOpen(false);
    setNameSuccessModalOpen(true);
  };

  const pwdSubmitHandler = (event) => {
    event.preventDefault();

    if (pwdHasError || password.trim()?.length === 0) return;

    setIsPwdModalOpen(true);
  };

  const pwdSendHandler = () => {
    setPwdBtnDisabled(true);
    setTimeout(() => {
      setPwdBtnDisabled(false);
    }, 2000);

    dispatch(changePassword({ email, password }))
      .unwrap()
      .then(() => {
        resetPassword();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsPwdModalOpen(false));

    setIsPwdModalOpen(false);
    setPwdSuccessModalOpen(true);
  };

  const userDeletionSubmitHandler = (event) => {
    event.preventDefault();

    if (!email || email !== localStorage.getItem('email')) return;

    setIsDeletionModalOpen(true);
  };

  const userDeleteHandler = () => {
    dispatch(deleteUser({ email }))
      .unwrap()
      .then(() => {
        localStorage.removeItem('email');
        localStorage.removeItem('token');
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setIsDeletionModalOpen(false);
        navigate('/');
      });
  };

  return (
    <>
      <Modal 
        open={nameSuccessModalOpen}
        onClose={() => setNameSuccessModalOpen(false)}
      >
        <ExcitingElephant />
        <p style={{ marginTop: '1rem' }}>닉네임이 성공적으로 변경되었습니다!</p>
      </Modal>
      <Modal 
        open={pwdSuccessModalOpen}
        onClose={() => setPwdSuccessModalOpen(false)}
      >
        <ExcitingElephant />
        <p style={{ marginTop: '1rem' }}>비밀번호가 성공적으로 변경되었습니다!</p>
      </Modal>
      <YesNoModal 
        open={isPwdModalOpen} 
        onClose={() => setIsPwdModalOpen(false)} 
        yes="변경하기"
        no="취소하기"
        onYesClick={() => pwdSendHandler()}
        onNoClick={() => setIsPwdModalOpen(false)} 
      >
        <p>정말 비밀번호를 변경하시겠습니까?</p>
      </YesNoModal>
      <YesNoModal 
        open={isNameModalOpen} 
        onClose={() => setIsNameModalOpen(false)} 
        yes="변경하기"
        no="취소하기"
        onYesClick={() => nameSendHandler()}
        onNoClick={() => setIsNameModalOpen(false)} 
      >
        <p>정말 닉네임을 변경하시겠습니까?</p>
      </YesNoModal>
      <YesNoModal 
        open={isDeletionModalOpen} 
        onClose={() => setIsDeletionModalOpen(false)} 
        yes="탈퇴하기"
        no="취소하기"
        onYesClick={() => userDeleteHandler()}
        onNoClick={() => setIsDeletionModalOpen(false)} 
      >
        <p>정말 탈퇴하시겠습니까?</p>
      </YesNoModal>
      <div className={classes.myPage}>
        <h3>마이 페이지</h3>
        <div className={classes.myPage__email}>
          <label htmlFor="email">이메일</label>
          <input type="text" value={email} disabled />
        </div>
        <form id="nickname-form" className={classes.myPage__nickname} onSubmit={nicknameSubmitHandler}>
          <label htmlFor="nickname">닉네임</label>
          {nicknameHasError && <span><MdWarning />{nicknameErrMsg}</span>}
          <input
            type="text"
            value={nickname}
            onChange={nicknameChangeHandler}
            onBlur={nicknameBlurHandler}
          />
          <button type="submit" disabled={nameBtnDisabled}>닉네임 변경</button>
        </form>
        <form id="password-form" className={classes.myPage__pwd} onSubmit={pwdSubmitHandler}>
          <label htmlFor="password">비밀번호</label>
          {pwdHasError && <span><MdWarning />{pwdErrorMsg}</span>}
          <input
            type="text"
            value={password}
            onChange={pwdChangeHandler}
            onBlur={pwdBlurHandler}
          />
          <button type="submit" disabled={pwdBtnDisabled}>비밀번호 변경</button>
        </form>
        <form id="deletion-form" className={classes.myPage__deletion} onSubmit={userDeletionSubmitHandler}>
          <button type="submit">회원 탈퇴</button>
        </form>
      </div>
    </>
  );
};

export default MyPagePage;
