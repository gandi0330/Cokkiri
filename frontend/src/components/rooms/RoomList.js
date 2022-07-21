import RoomListItem from './RoomListItem';

const roomList = [
  { id: 1, title: 'room1' },
  { id: 2, title: 'room2' },
  { id: 3, title: 'room3' },
];

const RoomList = () => {
  return (
    <>
      <div>RoomList</div>
      { roomList && roomList.map((room) => <RoomListItem key={room.title} room={room} />)}
    </>
  );
};

export default RoomList;
