import VisitiedListItem from './VisitedListItem';

const visitedList = [
  { id: 1, title: 'room1', key: 'room1' },
  { id: 2, title: 'room2', key: 'room2' },
  { id: 3, title: 'room3', key: 'room3' },
];

const VisitedList = () => {
  return (
    <>
      <h1>자주 가는 스터디</h1>
      <hr />
      { visitedList && visitedList.map((room) => <VisitiedListItem key={room.title} room={room} />)}
    </>
  );
};

export default VisitedList;
