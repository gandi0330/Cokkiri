/* eslint-disable react/prop-types */
import classes from './RightSidePanel.module.css';
import Participants from './sideContents/Participants';
import TheTimer from './sideContents/TheTimer';
import Chat from './sideContents/Chat';
import Questions from '../../pages/questions/Questions';
// import QuestionPage from '../../pages/questions/QuestionPage';

const RightSidePanel = ({
  type, session, publisher, subscribers,
}) => {
  if (type === 'part') {
    return (
      <div className={classes.rightPanel}>
        <Participants session={session} publisher={publisher} subscribers={subscribers} />
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
        <Chat session={session} />
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

export default RightSidePanel;
