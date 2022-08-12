/* eslint-disable react/forbid-prop-types */
import { useEffect, useState, useRef } from 'react';
import { AiOutlineAudioMuted, AiOutlineAudio } from 'react-icons/ai';
import { BiExit, BiBell, BiBellOff } from 'react-icons/bi';
import { FiShare, FiVideo, FiVideoOff } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { OpenVidu } from 'openvidu-browser';

import useAudio from '../../hooks/useAudio';
import styles from './VideoController.module.css';
import music from '../../audios/voice-elephant.mp3';
import YesNoModal from '../layout/YesNoModal';
import ExcitingElephant from '../icons/ExcitingElephant';

let OV;

const Controller = ({
  publisher, leaveSession, getToken, session, setMainStreamManager,
}) => {
  const audioBtn = useRef();
  const [toggle] = useAudio(music);
  const [audioActive, setAudioActive] = useState(true);
  const [videoActive, setVideoActive] = useState(true);
  const [bellActive, setBellActice] = useState(true);
  const [canExitRoom, setCanExitRoom] = useState(false);

  useEffect(() => {
    if (!session) {
      return;
    }
    if (bellActive) {
      session.on('signal:bell', () => {
        if (bellActive) {
          audioBtn.current.click();
        }
      });
    } else {
      session.off('signal:bell', () => {});
    }
    return () => {
      session.off('signal:bell', () => {});
    };
  }, [session, bellActive]);

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

  const handleShareClick = () => {
    OV = new OpenVidu();
    const sessionScreen = OV.initSession();
    getToken().then((token) => {
      sessionScreen.connect(token).then(() => {
        const newPublisher = OV.initPublisher('html-element-id', { videoSource: 'screen' });
        newPublisher.once('accessAllowed', () => {
          newPublisher.stream.getMediaStream().getVideoTracks()[0].addEventListener('ended', () => {
            console.log('User pressed the "Stop sharing" button');
            sessionScreen.disconnect();
          });
          sessionScreen.publish(newPublisher);
          setMainStreamManager(newPublisher);
        });
        newPublisher.once('accessDenied', () => {
          console.warn('ScreenShare: Access Denied');
        });
      }).catch(((error) => {
        console.warn('There was an error connecting to the session:', error.code, error.message);
      }));
    });
  };

  const handleBellClick = () => {
    setBellActice((prev) => !prev);
  };

  return (
    <>
      <YesNoModal
        open={canExitRoom}
        yes="나가기"
        no="취소"
        onNoClick={() => setCanExitRoom(false)}
        onYesClick={leaveSession}
        onClose={() => setCanExitRoom(false)}
      >
        <ExcitingElephant />
        <p>정말로 나가시겠습니까?</p>
      </YesNoModal>
      <div className={styles.buttonGroup}>
        <div className={styles.hidden}>
          <button ref={audioBtn} onClick={toggle} type="button" />
        </div>
        <div className={styles.button} onClick={handleMuteClick}>
          {audioActive ? <AiOutlineAudio /> : ( 
            <div className={styles.colorRed}><AiOutlineAudioMuted /></div>
          )}
        </div>
        <div className={styles.button} onClick={handelCameraClick}>
          {videoActive ? <FiVideo /> : <div className={styles.colorRed}><FiVideoOff /></div>}
        </div>
        <div className={styles.button} onClick={handleBellClick}>
          {bellActive ? <BiBell /> : <div className={styles.colorRed}><BiBellOff /></div>}
        </div>
        <div className={`${styles.button} ${styles.share__btn}`} onClick={handleShareClick}><FiShare /></div>
        <div className={`${styles.button} ${styles.exitButton}`} onClick={() => setCanEnterRoom(true)}><BiExit /></div>
      </div>
    </>
  );
};

Controller.propTypes = {
  publisher: PropTypes.object.isRequired,
  leaveSession: PropTypes.func.isRequired,
  getToken: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired,
  setMainStreamManager: PropTypes.func.isRequired,
};

export default Controller;
