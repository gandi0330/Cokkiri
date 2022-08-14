/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';

import music from '../../../audios/voice-elephant.mp3';
import useAudio from '../../../hooks/useAudio';
import styles from './TheTimer.module.css';
import ExcitingElephant from '../../icons/ExcitingElephant';
import Modal from '../../layout/Modal';

let countDown;

const TheTimer = () => {
  const [toggle] = useAudio(music);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [show, setShow] = useState(false);
  const [start, setStart] = useState(false);
  const [stop, setStop] = useState(false);
  const [isNoInputTime, setIsNoInputTime] = useState(false);

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
    const tmpHour = +(e.target.value);
    if (!tmpHour || (tmpHour && tmpHour < 0)) {
      setHours(0);
    }

    if (tmpHour && tmpHour >= 0 && tmpHour <= 24) {
      setHours(tmpHour);
    }

    if (tmpHour && tmpHour > 24) {
      setHours(24);
    }
  };

  const onChangeMinutes = (e) => {
    const tmpMin = +(e.target.value);
    if (!tmpMin || (tmpMin && tmpMin < 0)) {
      setMinutes(0);
    }

    if (tmpMin && tmpMin >= 0 && tmpMin <= 59) {
      setMinutes(tmpMin);
    }

    if (tmpMin && tmpMin > 59) {
      setMinutes(59);
    }
  };

  const onChangeSeconds = (e) => {
    const tmpSec = +(e.target.value);
    if (!tmpSec || (tmpSec && tmpSec < 0)) {
      setSeconds(0);
    }

    if (tmpSec && tmpSec >= 0 && tmpSec <= 59) {
      setSeconds(tmpSec);
    }

    if (tmpSec && tmpSec > 59) {
      setSeconds(59);
    }
  };

  const onStart = () => {
    if (!hours && !minutes && !seconds) {
      setIsNoInputTime(true);
      return;
    }
    setShow(true);
    setStart(true);
  };

  const onCancel = () => {
    clearInterval(countDown);
    setShow(false);
    setStart(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
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
      <Modal open={isNoInputTime} onClose={() => setIsNoInputTime(false)}>
        <p>시 분 초를 입력해주세요!</p>
      </Modal>
      <div className={styles.timer__header}>
        <ExcitingElephant />
        <h4>타이머</h4>
      </div>
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
              required
            /><span className={styles.text}>시</span>
            <input type="number" value={minutes} onChange={onChangeMinutes} max={59} min={0} placeholder="분" required /><span>분</span>
            <input type="number" value={seconds} onChange={onChangeSeconds} max={59} min={0} placeholder="초" required /><span>초</span>
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
              ? <button className={styles.start} type="button" onClick={onRestart}>재개</button>
              : <button className={styles.stop} type="button" onClick={onStop}>일시정지</button>
            )
          }
      </div>
    </div>
  );
};

export default TheTimer;
