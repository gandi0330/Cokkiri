/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';

import music from '../../../audios/voice-elephant.mp3';
import useAudio from '../../../hooks/useAudio';
import styles from './TheTimer.module.css';

let countDown;

const TheTimer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [show, setShow] = useState(false);
  const [start, setStart] = useState(false);
  const [stop, setStop] = useState(false);
  const [toggle] = useAudio(music);

  useEffect(() => {
    if (!start) {
      return;
    }
    if (start && !hours && !minutes && !seconds) {
      toggle();
      setShow(false);
      setStart(false);
    }
    countDown = setInterval(() => {
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
  }, [start, hours, minutes, seconds]);
  
  const onChangeHours = (e) => {
    setHours(parseInt(e.target.value, 10));
  };

  const onChangeMinutes = (e) => {
    setMinutes(parseInt(e.target.value, 10));
  };

  const onChangeSeconds = (e) => {
    setSeconds(parseInt(e.target.value, 10));
  };

  const onStart = () => {
    if (!hours && !minutes && !seconds) {
      return;
    }
    setShow(true);
    setStart(true);
  };

  const onCancel = () => {
    clearInterval(countDown);
    setShow(false);
    setStart(false);
  };

  const onStop = () => {
    setStop(true);
    clearInterval(countDown);
  };

  const onRestart = () => {
    countDown = setInterval(() => {
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
    setStop(false);
  };
  
  return (
    <div className={styles.wrapper}>
      <h4>타이머</h4>
      <div className={styles.content}>
        {!start && (
          <div>
            <input 
              type="number"
              value={hours}
              onChange={onChangeHours}
              max={24}
              min={0}
              placeholder="시"
            /><span className={styles.text}>시</span>
            <input type="number" value={minutes} onChange={onChangeMinutes} max={59} min={0} placeholder="분" /><span>분</span>
            <input type="number" value={seconds} onChange={onChangeSeconds} max={59} min={0} placeholder="초" /><span>초</span>
          </div>
        )}
        {show && <div className={styles.circle}>{hours > 0 ? <span>{hours} : </span> : null} {minutes < 10 ? `0${minutes}` : minutes} : {seconds < 10 ? `0${seconds}` : seconds}</div>}
      </div>
      <br />
      <div className={styles.buttons}>
        {start ? <button className={styles.cancel} type="button" onClick={onCancel}>취소</button> : <button className={styles.hidden} type="button">0</button>}
        {
          !start
            ? <button className={styles.start} type="button" onClick={onStart}>시작</button>
            : (stop
              ? <button className={styles.start} type="button" onClick={onRestart}>재게</button>
              : <button className={styles.stop} type="button" onClick={onStop}>일시정지</button>
            )
          }
      </div>
    </div>
  );
};

export default TheTimer;
