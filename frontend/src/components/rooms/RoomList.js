import { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';

import RoomListItem from './RoomListItem';
import RoomListNoti from './RoomListNoti';

import classes from './RoomList.module.css';

// dummy 용
// const RoomList = ({
//   rooms,
// }) => {
//   return (
//     <section className={classes.roomList}>
//       {rooms.length ? rooms.map((room) => (
//         <RoomListItem key={room.id} id={room.id} title={room.title} />
//       )) : <p>검색 결과가 없습니다.</p>}
//     </section>
//   );
// };

// RoomList.propTypes = {
//   rooms: PropTypes.arrayOf.isRequired,
// };

// api 용
const RoomList = ({
  rooms, loading, hasMore, pageHandler,
}) => {
  const observer = useRef();
  const lastRoomElementRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      const lastRoom = entries[0];
      if (lastRoom.isIntersecting && hasMore) {
        pageHandler(); 
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  return (
    <section className={classes.roomList}>
      {rooms.length ? rooms.map((room, index) => {
        if (index + 1 === rooms.length) {
          return <RoomListItem ref={lastRoomElementRef} key={room} title={room} />;
        } 
        return <RoomListItem key={room} title={room} />;
      }) : (
        <div className={classes.noResult}>
          <RoomListNoti condition="noResult" />
        </div>
      )}
    </section>
  );
};

RoomList.propTypes = {
  rooms: PropTypes.arrayOf.isRequired,
  loading: PropTypes.bool.isRequired,
  hasMore: PropTypes.bool.isRequired,
  pageHandler: PropTypes.func.isRequired,
};

export default RoomList;
