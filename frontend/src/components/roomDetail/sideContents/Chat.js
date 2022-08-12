/* eslint-disable react/prop-types */
// import PropTypes from 'prop-types';
import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import styles from './Chat.module.css';
import ChatContent from './ChatContent';
import ChatForm from './ChatForm';
import ExcitingElephant from '../../icons/ExcitingElephant';

const Chat = ({ session }) => {
  const scrollRef = useRef();
  const { chats } = useSelector((state) => state.room);

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [chats]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.chat__header}>
        <ExcitingElephant />
        <h3>채팅</h3>
      </div>
      <div className={styles.chat__msgs}>
        {session.connection && session.connection.connectionId
        && chats.length > 0 && chats.map((chat, idx) => {
          if (chat.from === session.connection.data.split('"')[3]) {
            return (
              <div key={`${idx * 1}`} className={styles.me}>
                <ChatContent chat={chat} type="me" />
              </div>
            );
          }
          return (
            <div key={`${idx * 1}`} className={styles.others}>
              <ChatContent chat={chat} type="other" />
            </div>
          );
        }) }
        <div ref={scrollRef} />
      </div>
      <ChatForm session={session} />
    </div>
  );
};

// Chat.propTypes = {
//   session: PropTypes.objectOf.isRequired,
// };

export default Chat;
