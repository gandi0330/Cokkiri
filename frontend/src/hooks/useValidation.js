import { useState } from 'react';

const useValidation = (validationCheckFn) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  // const [errorMsg, setErrMsg] = useState(null);
  
  const valueIsValid = validationCheckFn(enteredValue);

  const hasError = !valueIsValid && isTouched;

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
    valueIsValid,
    hasError,
    // errorMsg,
    reset,
    valueChangeHandler,
    inputBlurHandler,
  };
};

export default useValidation;
