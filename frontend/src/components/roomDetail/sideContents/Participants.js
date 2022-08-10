import { useSelector } from 'react-redux';

import ParticipantList from './ParticipantList';
import ParticipantListItem from './ParticipantListItem';

const Participants = () => {
  const { publisher, subscribers, room } = useSelector((state) => state.room);
  console.log(11111111111, room);
  return (
    <div>
      <h4>참가자</h4>
      {publisher && <ParticipantListItem publisher={publisher} />}
      {subscribers.length > 0 && <ParticipantList subscribers={subscribers} />}
    </div>
  );
};

export default Participants;
