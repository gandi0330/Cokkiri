/* eslint-disable react/prop-types */
import { AiOutlineAudioMuted, AiOutlineAudio } from 'react-icons/ai';
// import { BiBell } from 'react-icons/bi';
import { FiVideo, FiVideoOff } from 'react-icons/fi';
import { BiBell } from 'react-icons/bi';
import { useState } from 'react';

import styles from './ParticipantListItem.module.css';

const ParticipantListItem = ({ publisher, subscriber, session }) => {
  const [canBell, setCanBell] = useState(true);
  const onClickBell = (target) => {
    if (!canBell) {
      return;
    }
    session.signal({
      to: [target],
      type: 'bell',
    }).then(() => {
      console.log('bell successfully sent');
    }).catch((error) => {
      console.error(error);
    });
    setCanBell(false);
    const bellInterval = setInterval(() => {
      setCanBell(true);
      clearInterval(bellInterval);
    }, 1500);
  };

  if (publisher?.session?.connection) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.nickname}>
          {publisher.session.connection.data.split('"')[3]}
        </div>
        <div className={styles.buttons}>
          {publisher.session.connection.stream && publisher.session.connection.stream.audioActive
            ? (
              <div className={styles.yes}><AiOutlineAudio /></div>
            ) : (
              <div className={styles.no}><AiOutlineAudioMuted /></div>
            )}
          {publisher.session.connection.stream && publisher.session.connection.stream.videoActive
            ? (
              <div className={styles.yes}><FiVideo /></div>
            ) : (
              <div className={styles.no}><FiVideoOff /></div>
            )}
        </div>
      </div>
    );
  }
  if (subscriber?.stream) {
    if (subscriber.stream.typeOfVideo === 'SCREEN') {
      return null;
    }
    return (
      <div className={styles.wrapper}>
        {subscriber.stream.connection
        && (
          <div className={styles.nickname}>
            {subscriber.stream.connection.data.split('"')[3]}
          </div>
        )}
        <div className={styles.buttons}>
          {subscriber.stream.audioActive
            ? (
              <div className={styles.yes}><AiOutlineAudio /></div>
            ) : (
              <div className={styles.no}><AiOutlineAudioMuted /></div>
            )}
          {subscriber.stream.videoActive
            ? (
              <div className={styles.yes}><FiVideo /></div>
            ) : (
              <div className={styles.no}><FiVideoOff /></div>
            )}
          <div className={`${styles.yes} ${styles.bell}`} onClick={() => onClickBell(subscriber.stream.connection)}>
            <BiBell />
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default ParticipantListItem;
