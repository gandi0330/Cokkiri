import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Timer = ({
  min, sec, onTimerZero,
}) => {
  const [minutes, setMinutes] = useState(parseInt(min, 10));
  const [seconds, setSeconds] = useState(parseInt(sec, 10));

  useEffect(() => {
    if (!minutes && !seconds) onTimerZero();

    const countDown = setInterval(() => {
      if (parseInt(seconds, 10) > 0) {
        setSeconds(parseInt(seconds, 10) - 1);
      }
      if (parseInt(seconds, 10) === 0) {
        setMinutes(parseInt(minutes, 10) - 1);
        setSeconds(59);
      }
    }, 1000);
    return () => clearInterval(countDown);
  }, [minutes, seconds]);
  
  return (
    <div>
      {minutes < 10 ? `0${minutes}` : minutes} : {seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
};

Timer.propTypes = {
  min: PropTypes.number.isRequired,
  sec: PropTypes.number.isRequired,
  onTimerZero: PropTypes.func.isRequired,
};

export default Timer;
