import PropTypes from 'prop-types';

const RoomListItem = ({ room }) => {
  return (
    <>
      <p>{ room.id }</p>
      <p>{ room.title }</p>
    </>
  );
};

RoomListItem.propTypes = {
  room: PropTypes.objectOf.isRequired,
};

export default RoomListItem;
