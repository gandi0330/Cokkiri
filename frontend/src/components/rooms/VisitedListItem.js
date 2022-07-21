import PropTypes from 'prop-types';

const VisitedListItem = ({ room }) => {
  return (
    <>
      <span>star</span>
      <span>{ room.title }</span>
      <span>dotdotdot</span>
      <br />
    </>
  );
};

VisitedListItem.propTypes = {
  room: PropTypes.objectOf.isRequired,
};

export default VisitedListItem;
