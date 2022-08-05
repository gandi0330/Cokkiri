import { useState } from 'react';
import { AiOutlineAudioMuted, AiOutlineAudio } from 'react-icons/ai';
import { BiBell, BiExit } from 'react-icons/bi';
import { FiShare, FiVideo, FiVideoOff } from 'react-icons/fi';
import PropTypes from 'prop-types';

import styles from './VideoController.module.css';

const Controller = ({ publisher, leaveSession }) => {
  const [audioActive, setAudioActive] = useState(true);
  const [videoActive, setVideoActive] = useState(true);

  const handleMuteClick = () => {
    const state = !publisher.stream.audioActive;
    publisher.publishAudio(state);
    setAudioActive(state);
  };

  const handelCameraClick = () => {
    const state = !publisher.stream.videoActive;
    publisher.publishVideo(state);
    setVideoActive(state);
  };

  return (
    <div className={styles.buttonGroup}>
      <div className={styles.button} onClick={handleMuteClick}>
        {audioActive ? <AiOutlineAudio size="24" /> : <AiOutlineAudioMuted size="24" />}
      </div>
      <div className={styles.button} onClick={handelCameraClick}>
        {videoActive ? <FiVideo size="24" /> : <FiVideoOff size="24" />}
      </div>
      <div className={styles.button}><BiBell size="24" /></div>
      <div className={styles.button}><FiShare size="24" /></div>
      <div className={`${styles.button} ${styles.exitButton}`} onClick={leaveSession}><BiExit size="24" /></div>
    </div>
  );
};

Controller.propTypes = {
  publisher: PropTypes.func.isRequired,
  leaveSession: PropTypes.func.isRequired,
};

export default Controller;
