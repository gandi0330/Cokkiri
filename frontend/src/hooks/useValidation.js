import { useState, useEffect } from 'react';

const useValidation = (validationCheckObj) => {
  // validationCheckObj === 오류나는 조건으로 작성
  // [{fn:validationFn, msg:Errmsg}, ...]
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const [errorMsg, setErrMsg] = useState(null);
  const [valueIsValid, setValueIsValid] = useState(true);

  // let valueIsValid = true;

  useEffect(() => {
    if (!isTouched) return;
    for (const subObj of validationCheckObj) {
      if (subObj.fn(enteredValue)) {
        setValueIsValid(false);
        // valueIsValid = false;
        setErrMsg(subObj.msg);
        break;
      } else {
        setValueIsValid(true);
        setErrMsg(null);
      }
    }
  }, [enteredValue, isTouched]);
  
  // const valueIsValid = validationCheckFn(enteredValue);

  const hasError = !valueIsValid && isTouched;
  // console.log('hasError', hasError);

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue('');
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    setValue: setEnteredValue,
    valueIsValid,
    hasError,
    errorMsg,
    reset,
    valueChangeHandler,
    inputBlurHandler,
  };
};

export default useValidation;
