/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';

import styles from './Chat.module.css';
import ChatContent from './ChatContent';
import ChatForm from './ChatForm';

const Chat = ({ session }) => {
  const [chats, setChats] = useState([]);
  useEffect(() => {
    session.on('signal', (event) => {
      setChats((prev) => [...prev, {
        from: event.from.connectionId,
        content: event.data,
        createdAt: `${new Date(event.from.creationTime).toLocaleTimeString('ko-KR', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        })}`,
      }]);
    });
  });

  return (
    <div className={styles.wrapper}>
      <div>
        <h4>채팅</h4>
        <hr />
      </div>
      <div>
        {session.connection && session.connection.connectionId
        && chats.length > 0 && chats.map((chat, idx) => {
          if (chat.from === session.connection.connectionId) {
            return (
              <div key={`${idx * 1}`} className={styles.me}>
                <ChatContent chat={chat} />
              </div>
            );
          }
          return (
            <div key={`${idx * 1}`} className={styles.others}>
              <ChatContent chat={chat} />
            </div>
          );
        }) }
      </div>
      <ChatForm session={session} />
    </div>
  );
};

// Chat.propTypes = {
//   session: PropTypes.objectOf.isRequired,
// };

export default Chat;
