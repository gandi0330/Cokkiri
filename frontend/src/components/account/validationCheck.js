export const validateEmail = (inputText) => {
  if (inputText.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
    return true;
  }
  return false;
};

export const validateNumber = (inputText) => {
  if (inputText.length !== 6) {
    return false;
  }
  if (inputText.match(/^[0-9]{1,6}$/)) {
    return true;
  }
  return false;
};

// Instagram
export const validateNickname = (inputText) => {
  if (inputText.match(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/)) {
    return true;
  }
  return false;
};

// The password length must be greater than or equal to 8
// The password must contain one or more uppercase characters
// The password must contain one or more lowercase characters
// The password must contain one or more numeric values
// The password must contain one or more special characters
export const validatePassword = (inputText) => {
  if (inputText.match(/(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)) {
    return true;
  }
  return false;
};
