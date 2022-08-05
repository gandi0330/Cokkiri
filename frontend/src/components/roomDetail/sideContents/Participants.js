import ParticipantList from './ParticipantList';
import ParticipantListItem from './ParticipantListItem';

const Participants = () => {
  return (
    <div>
      <h4>참가자</h4>
      {publisher && <ParticipantListItem publisher={publisher} />}
      {subscribers && <ParticipantList subscribers={subscribers} />}
    </div>
  );
};

export default Participants;
