import { useState } from 'react';

import useRoomSearch from '../hooks/useRoomSearch';
import SearchBar from '../components/rooms/SearchBar';
import RoomList from '../components/rooms/RoomList';
import VisitedLists from '../components/rooms/VisitedLists';
import RoomListNoti from '../components/rooms/RoomListNoti';
import Footer from '../components/layout/Footer';
import { LoadingRoomList } from '../components/rooms/LoadingRoomList';

import classes from './RoomsPage.module.css';

// TODO roomlist pagination 있는 api 요청하기
// TODO first rendering 시 useRoomSearch로 인해 빈 화면이
// 나오는 것을 막아야 한다 -> 나중에 api 제대로 있을 때 작업

// const DUMMY_ROOMS = [
//   { id: 1, title: '파이썬 공부해요' },
//   { id: 2, title: '자바 공부해요' },
//   { id: 3, title: '가자 JAVA' },
//   { id: 4, title: '오늘부터 시작하는 react' },
//   { id: 5, title: '백준 알고리즘 스터디' },
//   { id: 6, title: '파이썬 스터디' },
//   { id: 7, title: '하루 종일 스터디' },
//   { id: 8, title: 'SSAFY 9기 대비반' },
//   { id: 9, title: 'SSAFY 7기 공통 1반 스터디' },
//   { id: 10, title: '아무 거나 스터디' },
// ];

const RoomsPage = () => {
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  const {
    rooms,
    hasMore,
    loading,
    error,
  } = useRoomSearch(query, pageNumber);

  const onSearchHandler = (enteredQuery) => {
    setQuery(enteredQuery);
    setPageNumber(1);
  };

  const pageHandler = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  // dummy data인 경우
  // const [searchedRooms, setSearchedRooms] = useState([]);

  // const onSearchedHandler = (searchedData) => {
  //   setSearchedRooms(searchedData);
  // };

  return (
    // <div className={classes.wrapper}>
    //   <div className={classes.container}>
    //     <VisitedList className={classes.sidePannel} />
    //     <main className={classes.main}>
    //       <SearchBar rooms={DUMMY_ROOMS} onSearchedRooms={onSearchedHandler} />
    //       {false && <RoomList rooms={searchedRooms} />}
    //       <LoadingRoomList />
    //     </main>
    //   </div>
    //   <Footer className={classes.foot} />
    // </div>
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <VisitedLists className={classes.sidePannel} />
        <main className={classes.main}>
          <SearchBar onSearchHandler={onSearchHandler} rooms={rooms} />
          {!error && rooms.length !== 0 && (
            <RoomList
              loading={loading}
              hasMore={hasMore}
              rooms={rooms}
              pageHandler={pageHandler}
            />
          )}
          {!error && !loading && rooms.length === 0 && (
            <div className={classes.noResult}>
              <RoomListNoti condition="noResult" />
            </div>
          )}
          {loading && <LoadingRoomList />}
          {error && <RoomListNoti condition="error" />}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default RoomsPage;
