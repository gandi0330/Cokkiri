// import { useParams } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';

// import RightSideBar from '../components/roomDetail/RightSideBar';
// import RightSidePanel from '../components/roomDetail/RightSidePanel';
// import VideoSection from '../components/roomDetail/VideoSection';
import classes from './RoomDetailPage.module.css';
import UserVideoComponent from './UserVideoComponent';

const OPENVIDU_SERVER_URL = `https://${window.location.hostname}:4443`;
const OPENVIDU_SERVER_SECRET = 'MY_SECRET';

let OV;

const App = () => {
  // const { roomName } = useParams();
  const [session, setSession] = useState(null);
  const [sessionId, setSessionId] = useState('roomname');
  const [userName, setUserName] = useState('nickname');
  const [mainStreamManager, setMainStreamManager] = useState(null);
  const [publisher, setPublisher] = useState(null);
  const [subscribers, setSubscribers] = useState([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);

  const sessionRef = useRef();
  sessionRef.current = session;

  const onChangeUserName = (event) => {
    setUserName(event.target.value);
  };

  const onChangeSessionId = (event) => {
    setSessionId(event.target.value);
  };

  const createSession = (sessionIdParam) => {
    return new Promise((resolve) => {
      const data = JSON.stringify({ customSessionId: sessionIdParam });
      axios.post(`${OPENVIDU_SERVER_URL}/openvidu/api/sessions`, data, {
        headers: {
          Authorization:
          `Basic ${btoa(`OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`)}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          console.log('CREATE SESSION', response);
          resolve(response.data.id);
        })
        .catch((response) => {
          const error = { ...response };
          if (error.response && error.response.status === 409) {
            resolve(sessionIdParam);
          } else {
            console.log(error);
            console.warn(`No connection to OpenVidu Server. This may be a certificate error at ${OPENVIDU_SERVER_URL}`);
            if (window.confirm(`No connection to OpenVidu Server. This may be a certificate error at ${OPENVIDU_SERVER_URL} \n\nClick OK to navigate and accept it. If no certificate warning is shown, then check that your OpenVidu Server is up and running at ${OPENVIDU_SERVER_URL}`)) {
              window.location.assign(`${OPENVIDU_SERVER_URL}/accept-certificate`);
            }
          }
        });
    });
  };

  const createToken = (sessionIdParam) => {
    return new Promise((resolve, reject) => {
      const data = {};
      axios.post(`${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${sessionIdParam}/connection`, data, {
        headers: {
          Authorization:
            `Basic ${btoa(`OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`)}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          console.log('TOKEN', response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  };

  const getToken = () => {
    createSession(sessionIdParam).then((sessionIdParam) => createToken(sessionIdParam));
  };

  const handleMainVideoStream = (stream) => {
    if (mainStreamManager === stream) return;
    setMainStreamManager(stream);
  };

  const leaveSession = () => {
    if (session) session.disconnect();

    OV = null;
    setSession(null); 
    setSubscribers([]);
    setSessionId('roomname'); // for test use not null value
    setUserName('nickname'); 
    setMainStreamManager(null);
    setPublisher(null);
    setCurrentVideoDevice(null);
  };

  useEffect(() => {
    window.addEventListener('beforeunload', leaveSession);
    return () => window.removeEventListener('beforeunload', leaveSession);
  });

  const joinSession = (event) => {
    event.preventDefault();
    OV = new OpenVidu();
    setSession(OV.initSession());
  };

  useEffect(() => {
    if (!session) return;

    sessionRef.current.on('streamCreated', (event) => {
      const subscriber = sessionRef.current.subscribe(event.stream, undefined);
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
    });

    sessionRef.current.on('streamDestroyed', (event) => {
      setSubscribers((prevSubscribers) => {
        return prevSubscribers.filter((stream) => stream !== event.stream.streamManager);
      });
    });

    sessionRef.current.on('exception', (exception) => {
      console.warn(exception);
    });

    getToken().then((token) => {
      sessionRef.current.connect(token, { clientData: userName })
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

          sessionRef.current.publish(tmpPublisher);
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

  return (
    <div className={classes.container}>
      {/* <VideoSection />
      <RightSideBar />
      <RightSidePanel /> */}
      {!session && (
        <div>
          <h1> Join a video session </h1>
          <form onSubmit={(event) => joinSession(event)}>
            <p>
              <label htmlFor="userName">참가 이름: </label>
              <input
                id="userName"
                value={userName}
                onChange={onChangeUserName}
              />
            </p>
            <p>
              <label htmlFor="sessionId">방 세션: </label>
              <input
                id="sessionId"
                value={sessionId}
                onChange={onChangeSessionId}
              />
            </p>
            <p>
              <button type="submit">참가하기</button>
            </p>
          </form>
        </div>
      )}

      {session && (
        <div id="session">
          <button type="button" onClick={() => leaveSession}>Leave session</button>
          {mainStreamManager && (
            <div id="main-video">
              MainStream
              <UserVideoComponent streamManager={mainStreamManager} />
              <button type="button" onClick={switchCamera}>Switch Camera</button>
            </div>
          )}

          <div id="video-container">
            {publisher && (
              <div
                className="stream-container"
                onClick={() => handleMainVideoStream(publisher)}
              >
                Publisher
                <UserVideoComponent streamManager={publisher} />
              </div>
            )}

            {subscribers.length !== 0 
            && subscribers.map((sub, idx) => (
              <div
                key={`${idx * 1}`}
                className="stream-container"
                onClick={() => handleMainVideoStream(sub)}
              >
                Remote
                <UserVideoComponent streamManager={sub} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
