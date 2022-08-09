import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoomList, resetRooms } from '../store/roomListSlice';

// import useRoomSearch from '../hooks/useRoomSearch';
import SearchBar from '../components/rooms/SearchBar';
import RoomList from '../components/rooms/RoomList';
import VisitedLists from '../components/rooms/VisitedLists';
import RoomListNoti from '../components/rooms/RoomListNoti';
import Footer from '../components/layout/Footer';
import { LoadingRoomList } from '../components/rooms/LoadingRoomList';

import classes from './RoomsPage.module.css';

const RoomsPage = () => {
  const dispatch = useDispatch();
  const { 
    rooms, loading, error, hasMore,
  } = useSelector((state) => state.roomList);

  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(0);

  // const {
  //   rooms,
  //   hasMore,
  //   loading,
  //   error,
  // } = useRoomSearch(query, pageNumber);

  const onSearchHandler = (enteredQuery) => {
    setQuery(enteredQuery);
    setPageNumber(0);
  };

  const pageHandler = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  useEffect(() => {
    dispatch(resetRooms);
  }, []);

  useEffect(() => {
    const limit = 15;
    const offset = limit * pageNumber;
    const promise = dispatch(fetchRoomList({ 
      offset, limit, keyword: query,
    }));
    return () => promise.abort();
  }, [query, pageNumber]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <VisitedLists className={classes.sidePannel} />
        <main className={classes.main}>
          <SearchBar onSearchHandler={onSearchHandler} rooms={rooms} />
          {!error && rooms.length !== 0 && (
            <RoomList
              loading={loading}
              hasMore={hasMore}
              rooms={rooms || []}
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
