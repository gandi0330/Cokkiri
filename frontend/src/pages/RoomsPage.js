import { useCallback } from 'react';

import SearchBar from '../components/rooms/SearchBar';
import RoomList from '../components/rooms/RoomList';
import VisitedList from '../components/rooms/VIsitedList';

const RoomsPage = () => {
  const onClickBtn = useCallback(() => {
    console.log('방 만들기 모달창!');
  }, []);
  
  return (
    <>
      <VisitedList />
      <h1>RoomsPage</h1>
      <SearchBar />
      <button type="button" onClick={onClickBtn}>방 만들기</button>
      <hr />
      <RoomList />
    </>
  );
};

export default RoomsPage;
