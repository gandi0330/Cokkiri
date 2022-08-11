// // import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// // import { useNavigate } from 'react-router-dom';

// // import styles from './Account.module.css';
// import { signupEmail, getUserEmail } from '../../store/authSlice';

// const SignupEmail = () => {
//   // const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const email = useSelector(getUserEmail);

//   // const alertUser = (event) => {
//   //   event.preventDefault();
//   //   event.returnValue = '정말 나가시겠습니까?';
//   // };

//   // useEffect(() => {
//   //   window.addEventListener('beforeunload', alertUser);
//   //   return () => {
//   //     window.removeEventListener('beforeunload', alertUser);
//   //   };
//   // }, []);

//   const onSubmit = (event) => {
//     event.preventDefault();
//     if (!email) {
//       // navigate('/login', { replace: true });
//       return;
//     }
//     dispatch(signupEmail({ email })).unwrap()
//       .then(() => {
//         navigate('/signupCertification', { replace: true });
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   };

//   // const {
//   //   value: email,
//   //   hasError: emailHasError,
//   //   errorMsg: emailErrorMsg,
//   //   valueChangeHandler: emailChangeHandler,
//   //   inputBlurHandler: emailBlurHandler,
//   // } = useValidation([{ fn: validateEmail, msg: '유효한 이메일을 입력해 주세요.' }]);

//   // const onSubmit = useCallback((e) => {
//   //   e.preventDefault();
//   //   if (emailHasError) {
//   //     return;
//   //   }
//   //   dispatch(signupEmail({ email })).then(() => {
//   //     navigate('/signupCertification', { replace: true, state: { email } });
//   //   });
//   // }, [email, emailHasError]);

//   return (
//     // <div className={styles.main}>
//     // <h2>회원가입</h2>
//     <form onSubmit={onSubmit}>
//       {/* <div className={styles.inputBox}>
//         <label htmlFor="email">이메일</label>
//         <input name="email" id="email" value={email} disabled />
//       </div> */}
//       <button type="submit">인증번호 보내기</button>
//     </form>
//     // </div>
//   );
// };

// export default SignupEmail;
