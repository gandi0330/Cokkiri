import { 
  useCallback, useRef,
} from 'react';
import PropTypes from 'prop-types';

import RoomListItem from './RoomListItem';

import classes from './RoomList.module.css';

const RoomList = ({
  rooms, loading, hasMore, setLastItemIdx,
}) => {
  const observer = useRef();
  const lastRoomElementRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      const lastRoom = entries[0];
      if (lastRoom.isIntersecting && hasMore) {
        setLastItemIdx(rooms.length > 0 ? rooms[rooms.length - 1].roomId : -1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  return (
    <section className={classes.roomList}>
      {rooms.length > 0 && rooms.map((room, index) => {
        if (index + 1 === rooms.length) {
          return (
            <RoomListItem 
              ref={lastRoomElementRef} 
              key={room.roomId} 
              roomId={room.roomId}
              title={room.title}
              userCount={room.userCount}
              userLimit={room.userLimit}
            />
          );
        } 
        return (
          <RoomListItem 
            key={room.roomId} 
            title={room.title} 
            roomId={room.roomId}
            userCount={room.userCount}
            userLimit={room.userLimit}
          />
        );
      })}
    </section>
  );
};

RoomList.propTypes = {
  // rooms: PropTypes.arrayOf(
  //   // PropTypes.shape({
  //   //   roomId: PropTypes.number,
  //   //   title: PropTypes.string,
  //   //   createDateTime: PropTypes.string,
  //   //   userCount: PropTypes.number,
  //   //   userLimit: PropTypes.number,
  //   // }),
  //   PropTypes.object,
  // ).isRequired,
  rooms: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  hasMore: PropTypes.bool.isRequired,
  // pageHandler: PropTypes.func.isRequired,
  setLastItemIdx: PropTypes.func.isRequired,
};

export default RoomList;
