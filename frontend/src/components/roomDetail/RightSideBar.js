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
          ? <BsPeopleFill onClick={toggleParticipants} /> 
          : <BsPeople onClick={toggleParticipants} />}
      </div>

      <div>
        {activeStopWatch
          ? <BsStopwatchFill onClick={toggleStopWatch} /> 
          : <BsStopwatch onClick={toggleStopWatch} />}
      </div>

      <div>
        {activeChat
          ? <AiFillMessage onClick={toggleChat} /> 
          : <AiOutlineMessage onClick={toggleChat} />}
      </div>

      <div>
        {activeQuestion
          ? <RiQuestionAnswerFill onClick={toggleActiveQuestion} /> 
          : <RiQuestionAnswerLine onClick={toggleActiveQuestion} />}
      </div>

    </nav>
  );
};

RightSideBar.propTypes = {
  setIsActive: PropTypes.func.isRequired,
};

export default RightSideBar;
