/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import PropTypes from 'prop-types';
import { updateChats } from '../../../store/roomSlice';

import styles from './Chat.module.css';
import ChatContent from './ChatContent';
import ChatForm from './ChatForm';

const Chat = ({ session }) => {
  const dispatch = useDispatch();
  const { chats } = useSelector((state) => state.room);
  useEffect(() => {
    session.on('signal:chat', (event) => {
      dispatch(updateChats({
        from: event.from.data.split('"')[3],
        content: event.data,
        createdAt: `${new Date(event.from.creationTime).toLocaleTimeString('ko-KR', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        })}`,
      }));
    });
    return () => {
      session.off('signal:chat', () => {});
    };
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
