/* eslint-disable react/prop-types */
import { useState } from 'react';

import ParticipantList from './ParticipantList';
import ParticipantListItem from './ParticipantListItem';
import styles from './Chat.module.css';

const Participants = ({ publisher, subscribers, session }) => {
  const [empty, setEmpty] = useState(0);
  console.log(empty);

  if (publisher) {
    publisher.on('streamPropertyChanged', () => {
      setEmpty((prev) => prev + 1);
    });
  }

  if (subscribers.length > 0) {
    subscribers.forEach((sub) => {
      sub.on('streamPropertyChanged', () => {
        setEmpty((prev) => prev + 1);
      });
    });
  }
  return (
    <div className={styles.wrapper}>
      <h3>참가자</h3>
      <ParticipantListItem session={session} publisher={publisher} />
      {subscribers.length > 0 && (
        <ParticipantList session={session} subscribers={subscribers} />
      )}
    </div>
  );
};

export default Participants;
