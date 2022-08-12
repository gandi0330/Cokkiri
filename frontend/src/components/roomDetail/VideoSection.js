import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import UserVideoComponent from './UserVideoComponent';
import VideoController from './VideoController';
import styles from './VideoSection.module.css';
import { entranceRoom, exitRoom } from '../../store/roomSlice';
import { updateRecentRooms } from '../../store/roomListSlice';

const OPENVIDU_SERVER_URL = 'https://i7c107.p.ssafy.io:8443';
const OPENVIDU_SERVER_SECRET = 'COKKIRI';

let OV;

const VideoSection = ({
  // eslint-disable-next-line react/prop-types
  roomId, getSession, getPublisher, getSubscribers,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [mainStreamManager, setMainStreamManager] = useState(null);
  const [publisher, setPublisher] = useState(null);
  const [subscribers, setSubscribers] = useState([]);
  const [sessionScreen, setSessionScreen] = useState(null);
  // const [currentVideoDevice, setCurrentVideoDevice] = useState(null);
  const { email, nickname } = useSelector((state) => state.auth);
  const { id, loading } = useSelector((state) => state.room);

  const reqCameraAndAudio = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true, video: { facingMode: 'user' } });
    } catch (err) {
      if (err.message === 'Permission denied') {
        window.alert('마이크, 오디오 권한을 재설정 해주세요!');
      }
    }
  };

  useEffect(() => {
    reqCameraAndAudio();
  }, []);

  const handleMainVideoStream = (stream) => {
    if (mainStreamManager === stream) return;
    setMainStreamManager(stream);
  };

  const leaveSession = () => {
    dispatch(exitRoom({ roomId, email, id }));
    if (session) session.disconnect();
    if (sessionScreen) sessionScreen.disconnect();
    navigate('/rooms', { place: true });
    OV = null;
    setSession(null);
    setSessionScreen(null);
    setSubscribers([]);
    setMainStreamManager(null);
    setPublisher(null);
    window.close();
    // setCurrentVideoDevice(null);
  };

  const leaveSession2 = () => {
    dispatch(exitRoom({ roomId, email, id }));
    if (session) session.disconnect();
    if (sessionScreen) sessionScreen.disconnect();
    navigate('/rooms', { place: true });
    OV = null;
    setSession(null);
    setSessionScreen(null);
    setSubscribers([]);
    setMainStreamManager(null);
    setPublisher(null);
    // setCurrentVideoDevice(null);
  };

  // const listener = (e) => {
  //   e.preventDefault();
  //   e.returnValue = '';
  // };

  // useEffect(() => {
  //   window.addEventListener('beforeunload', listener);
  //   return () => window.removeEventListener('beforeunload', listener);
  // });

  const joinSession = () => {
    OV = new OpenVidu();
    setSession(OV.initSession());
  };

  useEffect(() => {
    joinSession();
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', leaveSession);
    window.addEventListener('beforeunload', leaveSession2);
    return () => {
      window.removeEventListener('beforeunload', leaveSession);
      window.removeEventListener('beforeunload', leaveSession2);
    };
  });

  const createSession = (sessionId) => {
    return new Promise((resolve) => {
      const data = JSON.stringify({ customSessionId: sessionId });
      axios.post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
        headers: {
          Authorization:
          'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          // console.log('CREATE SESSION', response);
          resolve(response.data.id);
        })
        .catch((response) => {
          const error = { ...response };
          if (error.response && error.response.status === 409) {
            resolve(sessionId);
          } else {
            console.log(error);
            console.warn(
              `No connection to OpenVidu Server. This may be a certificate error at ${OPENVIDU_SERVER_URL}`,
            );
            if (
              window.confirm(
                `No connection to OpenVidu Server. This may be a certificate error at "${OPENVIDU_SERVER_URL}"\n\nClick OK to navigate and accept it.
                  If no certificate warning is shown, then check that your OpenVidu Server is up and running at "${OPENVIDU_SERVER_URL}"`,
              )
            ) {
              window.location.assign(
                OPENVIDU_SERVER_URL + '/accept-certificate',
              );
            }
          }
        });
    });
  };

  const createToken = (sessionId) => {
    return new Promise((resolve, reject) => {
      const data = {};
      axios.post(
        `${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${sessionId}/connection`, 
        data,
        {
          headers: {
            Authorization:
              'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
        },
      )
        .then((response) => {
          // console.log('TOKEN', response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  };

  const getToken = () => createSession(roomId).then((sessionId) => createToken(sessionId));

  const connectCamera = async () => {
    const devices = await OV.getDevices();
    const videoDevices = devices.filter((device) => device.kind === 'videoinput');
    const tmpPublisher = OV.initPublisher(undefined, {
      audioSource: undefined, 
      videoSource: videoDevices[0].deviceId, 
      publishAudio: true, 
      publishVideo: true, 
      resolution: '640x480', 
      frameRate: 30, 
      insertMode: 'APPEND', 
      mirror: false, 
    });
    session.publish(tmpPublisher);
    // setCurrentVideoDevice(videoDevices[0]);
    // console.log('tmpPublisher', tmpPublisher, typeof tmpPublisher);
    setMainStreamManager(tmpPublisher);
    setPublisher(tmpPublisher);
  };

  useEffect(() => {
    if (!session) return;
    session.on('streamCreated', (event) => {
      const subscriber = session.subscribe(event.stream, undefined);
      setSubscribers((prevSubscribers) => [subscriber, ...prevSubscribers]);
    });
    session.on('streamDestroyed', (event) => {
      setSubscribers((prevSubscribers) => {
        return prevSubscribers.filter((stream) => stream !== event.stream.streamManager);
      });
    });
    session.on('exception', (exception) => {
      console.warn(exception);
    });
    getToken().then((token) => {
      session.connect(token, { clientData: nickname })
        .then(() => {
          connectCamera();
          dispatch(entranceRoom({ roomId, email }))
            .unwrap()
            .then(() => {
              dispatch(updateRecentRooms({ email, roomId }));
            });
        })
        .catch((error) => {
          console.log(
            'There was an error connecting to the session:',
            error.code,
            error.message,
          );
        });
    });
  }, [session]);

  // const switchCamera = async () => {
  //   try {
  //     const devices = await OV.getDevices();
  //     const videoDevices = devices.filter((device) => device.kind === 'videoinput');
  //     if (videoDevices?.length > 1) {
  //       const newVideoDevice = videoDevices.filter((device) => {
  //         return device.deviceId !== currentVideoDevice.deviceId;
  //       });
  //       if (newVideoDevice.length) {
  //         const newPublisher = OV.initPublisher(undefined, {
  //           videoSource: newVideoDevice[0].deviceId,
  //           publishAudio: true,
  //           publishVideo: true,
  //           mirror: true,
  //         });
  //         await session.unpublish(mainStreamManager);
  //         await session.publish(newPublisher);
  //         setCurrentVideoDevice(newVideoDevice);
  //         setMainStreamManager(newPublisher);
  //         setPublisher(newPublisher);
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    getSession(session);
  }, [session]);

  useEffect(() => {
    getPublisher(publisher);
  }, [publisher]);

  useEffect(() => {
    getSubscribers(subscribers);
  }, [subscribers]);

  const getSessionScreen = (s) => {
    setSessionScreen(s);
  };

  useEffect(() => {
    if (subscribers.length > 0) {
      setMainStreamManager(subscribers[0]);
    } else {
      setMainStreamManager(publisher);
    }
  }, [subscribers, publisher]);

  if (loading) {
    return null;
  }

  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.smallVideoSection}>
        {publisher && (
          // <div
          //   // className="stream-container"
          //   onClick={() => handleMainVideoStream(publisher)}
          // >
          <div className={styles.video} onClick={() => handleMainVideoStream(publisher)}>
            <span className={styles.nickname}>{publisher.stream.connection.data.split('"')[3]}</span>
            <UserVideoComponent 
              streamManager={publisher} 
            />
          </div>
          // </div>
        )}
        {subscribers.length > 0
          && subscribers.map((sub, idx) => (
            // <div
            //   key={`subscriber ${idx * 1}`}
            //   className={styles.videoContainer}
            //   onClick={() => handleMainVideoStream(sub)}
            // >
            // Remote
            <div className={styles.video} key={`subscriber ${idx * 1}`} onClick={() => handleMainVideoStream(sub)}>
              <span className={styles.nickname}>{sub.stream.connection.data.split('"')[3]}</span>
              <UserVideoComponent streamManager={sub} />
            </div>
            // </div>
          ))}
      </div>
      {session && (
        <div className={styles.wrapper}>
          {mainStreamManager && (
            <div className={styles.videoWrapper}>
              <div className={styles.video__mainstream}>
                <span className={styles.mainNickname}>
                  {mainStreamManager.stream.connection.data.split('"')[3]}
                </span>
                <UserVideoComponent 
                  className={styles.mainNickname} 
                  streamManager={mainStreamManager} 
                />
              </div>
              {/* <button className={styles.switchCamera} 
              type="button" onClick={switchCamera}>Switch Camera</button> */}
            </div>
          )}
          {publisher
          && (
            <VideoController
              publisher={publisher}
              subscribers={subscribers}
              leaveSession={leaveSession}
              getToken={getToken}
              session={session}
              setMainStreamManager={setMainStreamManager}
              getSessionScreen={getSessionScreen}
            />
          )}
        </div>
      )}
    </div>
  );
};

VideoSection.propTypes = {
  roomId: PropTypes.string.isRequired,
  getSession: PropTypes.func.isRequired,
  getPublisher: PropTypes.func.isRequired,
  getSubscribers: PropTypes.func.isRequired,
};

export default VideoSection;
