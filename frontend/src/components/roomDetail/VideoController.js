/* eslint-disable react/forbid-prop-types */
import {
  useEffect, useState,
} from 'react';
import { AiOutlineAudioMuted, AiOutlineAudio } from 'react-icons/ai';
import { BiExit } from 'react-icons/bi';
import { FiShare, FiVideo, FiVideoOff } from 'react-icons/fi';
import { GiSoundOn, GiSoundOff } from 'react-icons/gi';
import PropTypes from 'prop-types';
import { OpenVidu } from 'openvidu-browser';
import { useSelector, useDispatch } from 'react-redux';

import useAudio from '../../hooks/useAudio';
import styles from './VideoController.module.css';
import music from '../../audios/voice-elephant.mp3';
import YesNoModal from '../layout/YesNoModal';
import ExcitingElephant from '../icons/ExcitingElephant';
import { clickAuido, clickCamera, clickSound } from '../../store/roomSlice';

let OV;

const Controller = ({
  publisher, leaveSession, getToken, session, setMainStreamManager, subscribers, getSessionScreen,
}) => {
  const dispatch = useDispatch();
  // const audioBtn = useRef();
  const [toggle] = useAudio(music);
  // const [audioActive, setAudioActive] = useState(true);
  // const [videoActive, setVideoActive] = useState(true);
  // const [soundActive, setSoundActive] = useState(true);
  const [canExitRoom, setCanExitRoom] = useState(false);
  const [doneShare, setDoneShare] = useState(false);
  const { nickname } = useSelector((state) => state.auth);
  const { audioActive, cameraActive, soundActive } = useSelector((state) => state.room);

  useEffect(() => {
    if (!session) {
      return;
    }
    session.on('signal:bell', () => {
      toggle();
      // audioBtn.current.onClick();
    });
    return () => {
      session.off('signal:bell', () => {});
    };
  // eslint-disable-next-line no-underscore-dangle
  }, [session.ee._events['signal:bell']]);

  const handleMuteClick = () => {
    const state = !publisher.stream.audioActive;
    publisher.publishAudio(state);
    dispatch(clickAuido(state));
  };

  const handelCameraClick = () => {
    const state = !publisher.stream.videoActive;
    publisher.publishVideo(state);
    // setVideoActive(state);
    dispatch(clickCamera(state));
  };

  const handleShareClick = () => {
    if (doneShare) {
      return;
    }
    OV = new OpenVidu();
    const sessionScreen = OV.initSession();
    getSessionScreen(sessionScreen);

    sessionScreen.on('streamCreated', (event) => {
      if (event.stream.typeOfVideo === 'SCREEN') {
        sessionScreen.subscribe(event.stream, 'container-screens');
      }
    });

    getToken().then((token) => {
      sessionScreen.connect(token, { clientData: nickname }).then(() => {
        const newPublisher = OV.initPublisher('container-screens', {
          videoSource: 'screen',
          audioSource: undefined, 
          publishAudio: false, 
          publishVideo: true, 
          resolution: '640x480', 
          frameRate: 30, 
          insertMode: 'APPEND', 
          mirror: false, 
        });
        newPublisher.once('accessAllowed', () => {
          newPublisher.stream.getMediaStream().getVideoTracks()[0].addEventListener('ended', () => {
            console.log('User pressed the "Stop sharing" button');
            // sessionScreen.disconnect();
            // setMainStreamManager(null);
            sessionScreen.unpublish(newPublisher);
            setDoneShare(false);
            // setMainStreamManager(publisher);
          });
          sessionScreen.publish(newPublisher);
          setDoneShare(true);
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

  const handleSoundClick = () => {
    subscribers.forEach((sub) => {
      const audioEnabled = !sub.stream.audioActive;
      sub.subscribeToAudio(audioEnabled);
    });
    dispatch(clickSound(!soundActive));
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
        {/* <div className={styles.hidden}>
          <button onClick={() => toggle()} type="button" />
        </div> */}
        <div className={styles.button} onClick={handleMuteClick}>
          {audioActive ? <AiOutlineAudio /> : ( 
            <div className={styles.colorRed}><AiOutlineAudioMuted /></div>
          )}
        </div>
        <div className={styles.button} onClick={handelCameraClick}>
          {cameraActive ? <FiVideo /> : <div className={styles.colorRed}><FiVideoOff /></div>}
        </div>
        <div className={styles.button} onClick={handleSoundClick}>
          {soundActive ? <GiSoundOn /> : <div className={styles.colorRed}><GiSoundOff /></div>}
        </div>
        <div className={`${styles.button} ${styles.share__btn}`} onClick={handleShareClick}><FiShare /></div>
        <div className={`${styles.button} ${styles.exitButton}`} onClick={() => setCanExitRoom(true)}><BiExit /></div>
      </div>
    </>
  );
};

Controller.propTypes = {
  publisher: PropTypes.object.isRequired,
  subscribers: PropTypes.array.isRequired,
  leaveSession: PropTypes.func.isRequired,
  getToken: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired,
  setMainStreamManager: PropTypes.func.isRequired,
  getSessionScreen: PropTypes.func.isRequired,
};

export default Controller;
