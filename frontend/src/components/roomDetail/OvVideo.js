import { useEffect, useRef } from 'react';

import styles from './OvVideo.module.css';

// eslint-disable-next-line react/prop-types
const OpenViduVideoComponent = ({ streamManager }) => {
  const videoRef = useRef();
  console.log(streamManager);
  useEffect(() => {
    if (videoRef) {
      // eslint-disable-next-line react/prop-types
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);
  
  // eslint-disable-next-line jsx-a11y/media-has-caption
  return (
    <video className={styles.video} ref={videoRef} autoPlay />
  );
};

export default OpenViduVideoComponent;
