import {
  BsPeopleFill, BsPeople, BsStopwatch, BsStopwatchFill,
} from 'react-icons/bs';
import { AiFillMessage, AiOutlineMessage } from 'react-icons/ai';
import { RiQuestionAnswerFill, RiQuestionAnswerLine } from 'react-icons/ri';
import { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './RightSideBar.module.css';

const RightSideBar = ({ getType }) => {
  const [state, setState] = useState('off');

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

  return (
    <nav className={styles.nav}>
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

    </nav>
  );
};

RightSideBar.propTypes = {
  getType: PropTypes.func.isRequired,
};

export default RightSideBar;
