import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Timer = ({
  hour, min, sec, onTimerZero,
}) => {
  const [hours, setHours] = useState(parseInt(hour, 10));
  const [minutes, setMinutes] = useState(parseInt(min, 10));
  const [seconds, setSeconds] = useState(parseInt(sec, 10));

  useEffect(() => {
    if (!hours && !minutes && !seconds) onTimerZero();

    const countDown = setInterval(() => {
      if (parseInt(seconds, 10) > 0) {
        setSeconds(parseInt(seconds, 10) - 1);
      }
      if (parseInt(seconds, 10) === 0) {
        if (parseInt(minutes, 10) === 0) {
          if (parseInt(hours, 10) > 0) {
            setHours(parseInt(hours, 10) - 1);
            setMinutes(59);
          }
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
      {hours > 0 ? <span>{hours} : </span> : null} {minutes < 10 ? `0${minutes}` : minutes} : {seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
};

Timer.propTypes = {
  hour: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  sec: PropTypes.number.isRequired,
  onTimerZero: PropTypes.func.isRequired,
};

export default Timer;
