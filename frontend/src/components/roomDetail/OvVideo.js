import { useEffect, useRef } from 'react';

// eslint-disable-next-line react/prop-types
const OpenViduVideoComponent = ({ streamManager }) => {
  const videoRef = useRef();

  useEffect(() => {
    if (videoRef) {
      // eslint-disable-next-line react/prop-types
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);
  
  // eslint-disable-next-line jsx-a11y/media-has-caption
  return <video ref={videoRef} autoPlay />;
};

export default OpenViduVideoComponent;
