import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import styles from './Chat.module.css';
import ChatContent from './ChatContent';

const Chat = ({ session }) => {
  const input = useRef();
  const [myMsg, setMyMsg] = useState('');
  const [chats, setChats] = useState([]);

  const onChangeMsg = (e) => {
    setMyMsg(e.target.value);
  };

  useEffect(() => {
    if (!session) {
      return;
    }
    session.on('signal', (event) => {
      // console.log(event.data); // Message
      // console.log(event.from); // Connection object of the sender
      // console.log(event.type); // The type of message ("my-chat")
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
  }, [session]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await session.signal({ data: myMsg });
      // console.log('Msg successfully sent');
      setMyMsg('');
      if (input && input.current) {
        input.current.focus();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h4>채팅</h4>
      <hr />
      {session && session.connection && session.connection.connectionId
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
      <form onSubmit={onSubmit}>
        <textarea ref={input} value={myMsg} onChange={onChangeMsg} />
        <input type="submit" />
      </form>
    </>
  );
};

Chat.propTypes = {
  session: PropTypes.objectOf.isRequired,
};

export default Chat;
