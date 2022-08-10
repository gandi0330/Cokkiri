import PropTypes from 'prop-types';

import classes from './RightSidePanel.module.css';
import Participants from './sideContents/Participants';
import TheTimer from './sideContents/TheTimer';
import Chat from './sideContents/Chat';
import Questions from '../../pages/questions/Questions';
// import QuestionPage from '../../pages/questions/QuestionPage';

const RightSidePanel = ({ type }) => {
  if (type === 'part') {
    return (
      <div className={classes.rightPanel}>
        <Participants />
      </div>
    );
  }

  if (type === 'watch') {
    return (
      <div className={classes.rightPanel}>
        <TheTimer />
      </div>
    );
  }

  if (type === 'chat') {
    return (
      <div className={classes.rightPanel}>
        <Chat />
      </div>
    );
  }

  if (type === 'question') {
    return (
      <div className={classes.rightPanel}>
        <Questions />
      </div>
    );
  }
};

RightSidePanel.propTypes = {
  type: PropTypes.string.isRequired,
};

export default RightSidePanel;
