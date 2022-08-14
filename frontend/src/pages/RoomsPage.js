import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { 
// fetchRoomList, resetRooms, resetPageNumber,
// } from '../store/roomListSlice';

import useRoomSearch from '../hooks/useRoomSearch';
import SearchBar from '../components/rooms/SearchBar';
import RoomList from '../components/rooms/RoomList';
import VisitedLists from '../components/rooms/VisitedLists';
import RoomListNoti from '../components/rooms/RoomListNoti';
import Footer from '../components/layout/Footer';
import { LoadingRoomList } from '../components/rooms/LoadingRoomList';

import classes from './RoomsPage.module.css';

const RoomsPage = () => {
  // const dispatch = useDispatch();
  // const { 
  //   rooms, loading, error, hasMore, pageNumber,
  // } = useSelector((state) => state.roomList);

  const [query, setQuery] = useState('');
  const [lastItemIdx, setLastItemIdx] = useState(-1); 

  const onSearchHandler = (enteredQuery) => {
    setQuery(enteredQuery);
    setLastItemIdx(-1);
  };

  const {
    loading, error, rooms, hasMore,
  } = useRoomSearch(query, lastItemIdx);

  // // const pageHandler = () => {
  // //   dispatch(incrementPageNumber({ lastItemIdx }));
  // // };

  // console.log('lastItemIdx', lastItemIdx);
  // console.log('pagenumber', pageNumber);

  // useEffect(() => {
  //   dispatch(resetRooms());
  //   dispatch(resetPageNumber());
  // }, [query]);

  // useEffect(() => {
  //   const limit = 9;
  //   // const offset = limit * pageNumber;
  //   console.log('eee');
  //   const promise = dispatch(fetchRoomList({ 
  //     // offset, limit, keyword: query,
  //     cursor: pageNumber, limit, keyword: query,
  //   }));
  //   return () => { 
  //     console.log('aborted!');
  //     promise.abort();
  //   };
  // }, [query, pageNumber]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <VisitedLists className={classes.sidePannel} />
        <main className={classes.main}>
          <SearchBar onSearchHandler={onSearchHandler} />
          {!error && rooms.length !== 0 && (
            <RoomList
              loading={loading}
              hasMore={hasMore}
              rooms={rooms}
              // pageHandler={pageHandler}
              setLastItemIdx={setLastItemIdx}
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
