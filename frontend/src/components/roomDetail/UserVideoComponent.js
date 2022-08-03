import OvVideo from './OvVideo';

// eslint-disable-next-line react/prop-types
const UserVideoComponent = ({ streamManager }) => {
  /*
  streamManager에 내려오는 것 => Publisher와 Subscriber 객체가 따로 내려온다
   - session
    - sessionId
    - streamManagers
      - Publisher
      - Subscriber
      - token : "wss://localhost:4443?sessionId=sessionA&token=tok_P5JDKaDGpByjzS55"
   - stream
    - audioActive: true
    - videoActive: true
    - hasAudio: true
    - hasVideo: true
    - videoDimesions: { width: 640, height: 480 }
    - connection
      - connectionId, 
      - creationTime
      - data: "{\"clientData\":\"jw\"}" // 처음에 적은 이름이 내려온다
   - videos 
  */
  const getNicknameTag = () => {
    // eslint-disable-next-line react/prop-types
    return JSON.parse(streamManager.stream.connection.data).clientData; 
  };
  return (
    <div>
      {streamManager && (
        <div>
          <OvVideo streamManager={streamManager} />
          <p>{getNicknameTag()}</p>
        </div>
      )}
    </div>
  );
};

export default UserVideoComponent;
