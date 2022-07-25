import { useState } from 'react';

const useToggle = (defaultBoolValue) => {
  const [boolValue, setBoolValue] = useState(defaultBoolValue);

  const toggleValue = (value) => {
    setBoolValue((prevValue) => {
      return typeof value === 'boolean' ? value : !prevValue;
    });
  };

  return [boolValue, toggleValue];
};

export default useToggle;
