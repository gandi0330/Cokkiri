import PropTypes from 'prop-types';
import ParticipantListItem from './ParticipantListItem';

const ParticipantList = ({ subscribers }) => {
  return (
    <div>
      {subscribers && subscribers.map((subscriber, idx) => {
        return (
          <div key={`${idx * 1}`}>
            <ParticipantListItem subscriber={subscriber} />
          </div>
        );
      })}
    </div>
  );
};

ParticipantList.propTypes = {
  subscribers: PropTypes.objectOf.isRequired,
};

export default ParticipantList;
