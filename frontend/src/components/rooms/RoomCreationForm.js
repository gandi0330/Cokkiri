import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdWarning } from 'react-icons/md';

import Toggle from '../layout/Toggle';
import Dropdown from '../layout/Dropdown';

import classes from './RoomCreationForm.module.css';
import useValidation from '../../hooks/useValidation';
import useToggle from '../../hooks/useToggle';

const RoomCreationForm = () => {
  const navigate = useNavigate();

  const titleValidationObj = [
    {
      fn(value) {
        return value.trim() === '';
      },
      msg: '제목을 작성해 주세요.',
    },
    {
      fn(value) {
        return !(value.trim().length >= 5 && value.trim().length <= 15);
      },
      msg: '제목은 5글자 이상 15글자 이하여야 합니다.',
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
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
  } = useValidation(titleValidationObj);

  const {
    value: pwd,
    valueIsValid: pwdIsValid,
    hasError: pwdHasError,
    // reset: resetpwd,
    valueChangeHandler: pwdChangeHandler,
    inputBlurHandler: pwdBlurHandler,
  } = useValidation(titleValidationObj);

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

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(isAlarm, isTimer, isRoomPublic, selected);

    if (!titleIsValid || !descriptionIsValid || !pwdIsValid) {
      return;
    }

    formIsValid = false;
    navigate(`/roomDetail/${roomName}`, { replace: true });
  };

  const titleInputClasses = titleHasError ? classes.invalid : '';
  const descriptionInputClasses = descriptionHasError ? classes.invalid : '';
  const pwdInputClasses = pwdHasError ? classes.invalid : '';

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div>
        <div className={classes.title}>
          <h6>방 제목</h6>
          {titleHasError && (
            <span className={classes.titleError}>
              <MdWarning />
              {/* 유효한 방 제목을 입력해주세요. */}
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
              유효한 방 설명을 입력해주세요.
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
            />
            {pwdHasError && (
              <span className={classes.pwdError}>
                <MdWarning />
                유효한 패스워드를 입력해주세요.
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
