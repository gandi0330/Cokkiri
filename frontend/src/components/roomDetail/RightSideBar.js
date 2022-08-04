import {
  BsPeopleFill, BsPeople, BsStopwatch, BsStopwatchFill,
} from 'react-icons/bs';
import { AiFillMessage, AiOutlineMessage } from 'react-icons/ai';
import { RiQuestionAnswerFill, RiQuestionAnswerLine } from 'react-icons/ri';
import PropTypes from 'prop-types';

import styles from './RightSideBar.module.css';
import useToggle from '../../hooks/useToggle';

const RightSideBar = ({ setIsActive }) => {
  const [activeParticipants, setActiveParticipants] = useToggle(false);
  const [activeStopWatch, setActiveStopWatch] = useToggle(false);
  const [activeChat, setActiveChat] = useToggle(false);
  const [activeQuestion, setActiveActiveQuestion] = useToggle(false);

  const toggleParticipants = () => {
    setActiveParticipants((prev) => !prev);
    setActiveStopWatch(false);
    setActiveChat(false);
    setActiveActiveQuestion(false);
    setIsActive((prev) => !prev);
  };
  const toggleStopWatch = () => {
    setActiveParticipants(false);
    setActiveStopWatch((prev) => !prev);
    setActiveChat(false);
    setActiveActiveQuestion(false);
    setIsActive((prev) => !prev);
  };
  const toggleChat = () => {
    setActiveParticipants(false);
    setActiveStopWatch(false);
    setActiveChat((prev) => !prev);
    setActiveActiveQuestion(false);
    setIsActive((prev) => !prev);
  };
  const toggleActiveQuestion = () => {
    setActiveParticipants(false);
    setActiveStopWatch(false);
    setActiveChat(false);
    setActiveActiveQuestion((prev) => !prev);
    setIsActive((prev) => !prev);
  };

  return (
    <nav className={styles.nav}>
      <div>
        {activeParticipants
          ? <BsPeopleFill size="30" onClick={toggleParticipants} /> 
          : <BsPeople size="30" onClick={toggleParticipants} />}
      </div>

      <div>
        {activeStopWatch
          ? <BsStopwatchFill size="30" onClick={toggleStopWatch} /> 
          : <BsStopwatch size="30" onClick={toggleStopWatch} />}
      </div>

      <div>
        {activeChat
          ? <AiFillMessage size="30" onClick={toggleChat} /> 
          : <AiOutlineMessage size="30" onClick={toggleChat} />}
      </div>

      <div>
        {activeQuestion
          ? <RiQuestionAnswerFill size="30" onClick={toggleActiveQuestion} /> 
          : <RiQuestionAnswerLine size="30" onClick={toggleActiveQuestion} />}
      </div>

    </nav>
  );
};

RightSideBar.propTypes = {
  setIsActive: PropTypes.func.isRequired,
};

export default RightSideBar;
