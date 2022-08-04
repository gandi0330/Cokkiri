import { useEffect, useState } from 'react';
// import { OpenVidu } from 'openvidu-browser';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import UserVideoComponent from './UserVideoComponent';
import { entranceRoom } from '../../store/roomSlice';
import VideoController from './VideoController';
// import VideoController from './VideoController';
// import VideoList from './VideoList';

let OV;

const VideoSection = ({ roomId }) => {
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.auth);

  const [session, setSession] = useState(null);
  const [mainStreamManager, setMainStreamManager] = useState(null);
  const [publisher, setPublisher] = useState(null);
  const [subscribers, setSubscribers] = useState([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);

  // const reqCameraAndAudio = async () => {
  //   try {
  //     await navigator.mediaDevices.getUserMedia({ audio: true, video: { facingMode: 'user' } });
  //   } catch (err) {
  //     if (err.message === 'Permission denied') {
  //       window.alert('마이크, 오디오 권한을 재설정 해주세요!');
  //     }
  //   }
  // };

  // useEffect(() => {
  // reqCameraAndAudio();
  // }, []);

  const handleMainVideoStream = (stream) => {
    if (mainStreamManager === stream) return;
    setMainStreamManager(stream);
  };

  const leaveSession = () => {
    if (session) session.disconnect();
    OV = null;
    setSession(null); 
    setSubscribers([]);
    setMainStreamManager(null);
    setPublisher(null);
    setCurrentVideoDevice(null);
  };

  useEffect(() => {
    window.addEventListener('beforeunload', leaveSession);
    return () => window.removeEventListener('beforeunload', leaveSession);
  });

  // const joinSession = () => {
  //   // event.preventDefault();
  //   OV = new OpenVidu();
  //   setSession(OV.initSession());
  // };

  // useEffect(() => {
  //   joinSession();
  // });

  useEffect(() => {
    if (!session) return;
    session.on('streamCreated', (event) => {
      const subscriber = session.subscribe(event.stream, undefined);
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
    });
    session.on('streamDestroyed', (event) => {
      setSubscribers((prevSubscribers) => {
        return prevSubscribers.filter((stream) => stream !== event.stream.streamManager);
      });
    });
    session.on('exception', (exception) => {
      console.warn(exception);
    });
    // getToken 자리
    dispatch(entranceRoom({ roomNumber: roomId, userEmail: email })).then((token) => {
      session.connect(token, { clientData: email })
        .then(async () => {
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
          setCurrentVideoDevice(videoDevices[0]);
          setMainStreamManager(tmpPublisher);
          setPublisher(tmpPublisher);
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

  const switchCamera = async () => {
    try {
      const devices = await OV.getDevices();
      const videoDevices = devices.filter((device) => device.kind === 'videoinput');
      if (videoDevices?.length > 1) {
        const newVideoDevice = videoDevices.filter((device) => {
          return device.deviceId !== currentVideoDevice.deviceId;
        });
        if (newVideoDevice.length) {
          const newPublisher = OV.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });
          await session.unpublish(mainStreamManager);
          await session.publish(newPublisher);
          setCurrentVideoDevice(newVideoDevice);
          setMainStreamManager(newPublisher);
          setPublisher(newPublisher);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log('switchCamera', switchCamera);
  return (
    <div className="container">
      <h1>VideoSection</h1>
      {session && (
        <div className={styles.wrapper}>
          {mainStreamManager && (
            <div className={styles.videoWrapper}>
              <div className={styles.videoContainer}>
                <UserVideoComponent streamManager={mainStreamManager} />
                {/* <button onClick={switchCamera}>Switch Camera</button> */}
              </div>
            </div>
          )}
          {publisher && (
            <div
              className="stream-container"
              onClick={() => handleMainVideoStream(publisher)}
            >
              Publisher
              <UserVideoComponent streamManager={publisher} />
            </div>
          )}

          {subscribers.length > 0
            && subscribers.map((sub, idx) => (
              <div className={styles.videoWrapper}>
                <div
                  key={`subscriber ${idx * 1}`}
                  className={styles.videoContainer}
                  // onClick={() => handleMainVideoStream(sub)}
                >
                  Remote
                  <UserVideoComponent streamManager={sub} />
                </div>
              </div>
            ))}
          <VideoController />
        </div>
      )}
    </div>
  );
};

VideoSection.propTypes = {
  roomId: PropTypes.string.isRequired,
};

export default VideoSection;
