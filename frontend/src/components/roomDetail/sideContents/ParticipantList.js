/* eslint-disable react/prop-types */
import ParticipantListItem from './ParticipantListItem';

const ParticipantList = ({ subscribers, session }) => {
  return (
    <div>
      {subscribers.map((subscriber, idx) => {
        return (
          <div key={`${idx * 1}`}>
            <ParticipantListItem subscriber={subscriber} session={session} />
          </div>
        );
      })}
    </div>
  );
};

export default ParticipantList;
