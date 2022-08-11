/* eslint-disable react/prop-types */
// import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import styles from './Chat.module.css';
import ChatContent from './ChatContent';
import ChatForm from './ChatForm';

const Chat = ({ session }) => {
  const { chats } = useSelector((state) => state.room);

  return (
    <div className={styles.wrapper}>
      <h3>채팅</h3>
      <div>
        {session.connection && session.connection.connectionId
        && chats.length > 0 && chats.map((chat, idx) => {
          if (chat.from === session.connection.data.split('"')[3]) {
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
