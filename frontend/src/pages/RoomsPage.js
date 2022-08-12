import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchRoomList, resetRooms, incrementPageNumber, resetPageNumber,
} from '../store/roomListSlice';

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
    rooms, loading, error, hasMore, pageNumber,
  } = useSelector((state) => state.roomList);

  const [query, setQuery] = useState('');
  const [lastItemIdx, setLastItemIdx] = useState(-1);

  // const {
  //   rooms,
  //   hasMore,
  //   loading,
  //   error,
  // } = useRoomSearch(query, pageNumber);

  const onSearchHandler = (enteredQuery) => {
    setQuery(enteredQuery);
  };

  const pageHandler = () => {
    dispatch(incrementPageNumber({ lastItemIdx }));
  };

  useEffect(() => {
    dispatch(resetRooms());
    dispatch(resetPageNumber());
  }, [query]);

  useEffect(() => {
    const limit = 12;
    // const offset = limit * pageNumber;
    const promise = dispatch(fetchRoomList({ 
      // offset, limit, keyword: query,
      cursor: pageNumber, limit, keyword: query,
    }));
    return () => { 
      // console.log('aborted!');
      promise.abort();
    };
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
