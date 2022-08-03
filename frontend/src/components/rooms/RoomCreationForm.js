import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdWarning } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import Toggle from '../layout/Toggle';
import Dropdown from '../layout/Dropdown';

import classes from './RoomCreationForm.module.css';
import useValidation from '../../hooks/useValidation';
import useToggle from '../../hooks/useToggle';
import { makeRoom } from '../../store/roomSlice';

const RoomCreationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email } = useSelector((state) => state.auth);

  const titleValidationObj = [
    {
      fn: (value) => value.trim() === '',
      msg: '제목을 작성해 주세요.',
    },
    {
      fn: (value) => !(value.trim().length >= 5 && value.trim().length <= 15),
      msg: '제목은 5글자 이상 15글자 이하여야 합니다.',
    },
  ];

  const descriptionValidationObj = [
    {
      fn: (value) => value.trim() === '',
      msg: '방 설명을 작성해 주세요.',
    },
    {
      fn: (value) => value.trim().length > 200,
      msg: '방 설명은 200글자 미만이어야 합니다.',
    },
  ];
  
  const pwdValidationObj = [
    {
      fn: (value) => value.trim() === '',
      msg: '비밀번호를 작성해 주세요.',
    },
    {
      fn: (value) => value.trim().length > 10,
      msg: '비밀번호는 10글자 미만이어야 합니다.',
    },
  ];

  const {
    value: title,
    valueIsValid: titleIsValid,
    hasError: titleHasError,
    // reset: resetTitle,
    errorMsg: titleErrorMsg,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
  } = useValidation(titleValidationObj);

  const {
    value: description,
    valueIsValid: descriptionIsValid,
    hasError: descriptionHasError,
    // reset: resetdescription,
    errorMsg: descriptionErrorMsg,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
  } = useValidation(descriptionValidationObj);

  const {
    value: pwd,
    valueIsValid: pwdIsValid,
    hasError: pwdHasError,
    // reset: resetpwd,
    errorMsg: pwdErrorMsg,
    valueChangeHandler: pwdChangeHandler,
    inputBlurHandler: pwdBlurHandler,
  } = useValidation(pwdValidationObj);

  // const {
  //   value: title,
  //   valueIsValid: titleIsValid,
  //   hasError: titleHasError,
  //   // reset: resetTitle,
  //   errorMsg: titleErrorMsg,
  //   valueChangeHandler: titleChangeHandler,
  //   inputBlurHandler: titleBlurHandler,
  // } = useValidation((value) => value.trim() !== '');

  // const {
  //   value: description,
  //   valueIsValid: descriptionIsValid,
  //   hasError: descriptionHasError,
  //   // reset: resetdescription,
  //   valueChangeHandler: descriptionChangeHandler,
  //   inputBlurHandler: descriptionBlurHandler,
  // } = useValidation((value) => value.trim() !== '');

  // const {
  //   value: pwd,
  //   valueIsValid: pwdIsValid,
  //   hasError: pwdHasError,
  //   // reset: resetpwd,
  //   valueChangeHandler: pwdChangeHandler,
  //   inputBlurHandler: pwdBlurHandler,
  // } = useValidation((value) => value.trim() !== '');

  const [selected, setSelected] = useState(2);

  // const [isAlarm, setIsAlarm] = useToggle(false);
  // const [isTimer, setIsTimer] = useToggle(false);
  const [isRoomPublic, setIsRoomPublic] = useToggle(false);

  const dropdownOptions = [2, 4, 6];

  let formIsValid = false;

  if (titleIsValid && descriptionIsValid) {
    if (isRoomPublic && !pwdIsValid) formIsValid = false;
    if (!isRoomPublic) formIsValid = true;
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(isAlarm, isTimer, isRoomPublic, selected);

    if (!titleIsValid || !descriptionIsValid || !pwdIsValid) {
      return;
    }

    try {
      dispatch(makeRoom({ email, title, userLimit: 4 }));
    } catch (error) {
      console.error(error);
    }

    formIsValid = false;
    navigate(`/roomDetail/${roomName}`, { replace: true });
  };

  const titleInputClasses = titleHasError ? classes.invalid : '';
  const descriptionInputClasses = descriptionHasError ? classes.invalid : '';
  const pwdInputClasses = (isRoomPublic && pwdHasError) ? classes.invalid : '';

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div>
        <div className={classes.title}>
          <h6>방 제목</h6>
          {titleHasError && (
            <span className={classes.titleError}>
              <MdWarning />
              {titleErrorMsg}
            </span>
          )}
          <input
            type="text"
            placeholder="방 제목을 입력해 주세요."
            id="roomName"
            name="roomName"
            value={title}
            onChange={titleChangeHandler}
            onBlur={titleBlurHandler}
            className={titleInputClasses}
            autoComplete="off"
            required
          />
        </div>
        <div className={classes.description}>
          <h6>방 설명</h6>
          {descriptionHasError && (
            <span className={classes.descriptionError}>
              <MdWarning />
              {descriptionErrorMsg}
            </span>
          )}
          <textarea
            type="text"
            placeholder="방 설명을 입력해 주세요."
            id="roomContent"
            name="roomContent"
            value={description}
            onChange={descriptionChangeHandler}
            onBlur={descriptionBlurHandler}
            className={descriptionInputClasses}
            rows="4"
            autoomplete="off"
          />
        </div>
        <div className={classes.options}>
          <h6>방 옵션</h6>
          <div className={classes.optionPersonNum}>
            <span>인원</span>
            <Dropdown
              selected={selected}
              setSelected={setSelected}
              options={dropdownOptions}
            />
          </div>
          {/* <div className={classes.optionAlarm}>
            <span>알람</span>
            <Toggle
              tgId="alarm-toggle"
              tgHtmlFor="alarm-toggle"
              onToggle={() => setIsAlarm((event) => event.target.checked)}
            />
          </div>
          <div className={classes.optionTimer}>
            <span>타이머</span>
            <Toggle
              tgId="timer-toggle"
              tgHtmlFor="timer-toggle"
              onToggle={() => setIsTimer((event) => event.target.checked)}
            />
          </div> */}
          <div className={classes.optionPublic}>
            <div>
              <span>공개 여부</span>
              <Toggle
                tgId="roomPublic-toggle"
                tgHtmlFor="roomPublic-toggle"
                onToggle={() => setIsRoomPublic((event) => event.target.checked)}
              />
            </div>
            <input
              type="text"
              value={pwd}
              placeholder="방 비밀번호를 입력하세요."
              onChange={pwdChangeHandler}
              onBlur={pwdBlurHandler}
              className={pwdInputClasses}
              autoComplete="off"
              disabled={!isRoomPublic}
            />
            {isRoomPublic && pwdHasError && (
              <span className={classes.pwdError}>
                <MdWarning />
                {pwdErrorMsg}
              </span>
            )}
          </div>
        </div>
        <div className={classes.btn}>
          <button type="submit" className={classes.btnDetail} disabled={!formIsValid}>방 만들기</button>
        </div>
      </div>
    </form>
  );
};

export default RoomCreationForm;
