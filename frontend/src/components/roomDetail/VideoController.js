import { AiOutlineAudioMuted, AiOutlineAudio } from 'react-icons/ai';
import { BiBell, BiExit } from 'react-icons/bi';
import { FiShare, FiVideo, FiVideoOff } from 'react-icons/fi';

import styles from './VideoController.module.css';

const VideoController = () => {
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

export default VideoController;
