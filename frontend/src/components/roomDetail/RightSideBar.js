import {
  useState, useRef, useEffect,
} from 'react';
import {
  BsPeopleFill, BsPeople, BsStopwatch, BsStopwatchFill,
} from 'react-icons/bs';
import { AiFillMessage, AiOutlineMessage } from 'react-icons/ai';
import { RiQuestionAnswerFill, RiQuestionAnswerLine, RiVideoLine } from 'react-icons/ri';
import PropTypes from 'prop-types';

import styles from './RightSideBar.module.css';

// eslint-disable-next-line react/prop-types
const RightSideBar = ({ getType }) => {
  const [state, setState] = useState('off');
  const sideBarRef = useRef();

  const toggleParticipants = () => {
    if (state === 'part') {
      setState('off');
      getType('off');
    } else {
      setState('part');
      getType('part');
    }
  };

  const toggleStopWatch = () => {
    if (state === 'watch') {
      setState('off');
      getType('off');
    } else {
      setState('watch');
      getType('watch');
    }
  };

  const toggleChat = () => {
    if (state === 'chat') {
      setState('off');
      getType('off');
    } else {
      setState('chat');
      getType('chat');
    }
  };

  const toggleQuestion = () => {
    if (state === 'question') {
      setState('off');
      getType('off');
    } else {
      setState('question');
      getType('question');
    }
  };

  const toggleVideo = () => {
    setState('off');
    getType('off');
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        (sideBarRef
        && sideBarRef.current
        && !sideBarRef.current.contains(e.target))
      ) {
        toggleVideo();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sideBarRef]);

  return (
    <nav className={styles.nav} ref={sideBarRef}>
      <div>
        {state === 'part'
          ? <BsPeopleFill onClick={toggleParticipants} /> 
          : <BsPeople onClick={toggleParticipants} />}
      </div>

      <div>
        {state === 'watch'
          ? <BsStopwatchFill onClick={toggleStopWatch} /> 
          : <BsStopwatch onClick={toggleStopWatch} />}
      </div>

      <div>
        {state === 'chat'
          ? <AiFillMessage onClick={toggleChat} /> 
          : <AiOutlineMessage onClick={toggleChat} />}
      </div>

      <div>
        {state === 'question'
          ? <RiQuestionAnswerFill onClick={toggleQuestion} /> 
          : <RiQuestionAnswerLine onClick={toggleQuestion} />}
      </div>

      {state !== 'off' && (
        <div>
          {state !== 'video' && <RiVideoLine className={styles.video__home} onClick={toggleVideo} />} 
        </div>
      )}

    </nav>
  );
};

RightSideBar.propTypes = {
  getType: PropTypes.func.isRequired,
};

export default RightSideBar;
