/* eslint-disable react/prop-types */
// import PropTypes from 'prop-types';

import styles from './ChatContent.module.css';

const ChatContent = ({ chat, type }) => {
  return (
    <div className={styles.chat}>
      <div
        className={
          type === 'me' ? styles.chat__info__me : styles.chat__info__other
        }
      >
        <span className={styles.nickname}>{chat.from}</span>{' '}
        <span className={styles.createdAt}>{chat.createdAt}</span>
      </div>
      <div
        className={`${styles.content} ${
          type === 'other' && styles.other__msg
        }`}
      >
        {chat.content}
      </div>
    </div>
  );
};

// ChatContent.propTypes = {
//   chat: PropTypes.objectOf.isRequired,
// };

export default ChatContent;
