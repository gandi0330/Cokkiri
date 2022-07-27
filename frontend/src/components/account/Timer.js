import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Timer = ({ min, sec }) => {
  const [minutes, setMinutes] = useState(parseInt(min, 10));
  const [seconds, setSeconds] = useState(parseInt(sec, 10));

  useEffect(() => {
    const countDown = setInterval(() => {
      if (parseInt(seconds, 10) > 0) {
        setSeconds(parseInt(seconds, 10) - 1);
      }
      if (parseInt(seconds, 10) === 0) {
        if (parseInt(minutes, 10) === 0) {
          clearInterval(countDown);
        } else {
          setMinutes(parseInt(minutes, 10) - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countDown);
  }, [minutes, seconds]);
  
  return (
    <div>
      {minutes} : {seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
};

Timer.propTypes = {
  min: PropTypes.number.isRequired,
  sec: PropTypes.number.isRequired,
};

export default Timer;
