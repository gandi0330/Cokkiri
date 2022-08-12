import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineKeyboardArrowDown as Arrow } from 'react-icons/md';
import {
  fetchRecentRooms,
  fetchFavoriteRooms,
  getRecentRooms,
  getFavoriteRooms,
} from '../../store/roomListSlice';
import { getUserEmail } from '../../store/authSlice';

import VisitiedListItem from './VisitedListItem';
import classes from './VisitedLists.module.css';

const VisitedList = () => {
  const dispatch = useDispatch();
  const email = useSelector(getUserEmail);
  const recentRooms = useSelector(getRecentRooms);
  const favoriteRooms = useSelector(getFavoriteRooms);

  useEffect(() => {
    if (!email) return;
    dispatch(fetchRecentRooms({ email }))
      .unwrap()
      .then(() => dispatch(fetchFavoriteRooms({ email })));
    // dispatch(fetchFavoriteRooms({ email }));
  }, [email]);

  return (
    <section className={classes.section}>
      <div className={classes.studyListTitle}>
        <h5>자주 가는 스터디</h5>
      </div>
      <input type="checkbox" name="droptdown-toggle" id="droptdown-toggle" />
      <div className={classes.hideDropdown}>
        <div className={classes.studyDropdown}>
          <span className={classes.studyList__subtitle}>
            최근 방문한 스터디
          </span>
          {recentRooms.length === 0 && (
            <p className={classes.dropdownMsg}>방문하신 스터디가 없습니다.</p>
          )}
          {recentRooms.length > 0 && (
            recentRooms.map((room) => {
              if (favoriteRooms.some((froom) => froom.roomId === room.roomId)) {
                return (
                  <VisitiedListItem
                    type="recent"
                    key={room.roomId}
                    id={room?.id || -1}
                    roomId={room.roomId}
                    title={room.title}
                    fav={!!true}
                  />
                );
              } 
              return (
                <VisitiedListItem
                  type="recent"
                  key={room.roomId}
                  id={room?.id || -1}
                  roomId={room.roomId}
                  title={room.title}
                  fav={false}
                />
              );
            })
          )}
          <span className={classes.studyList__partition} />
          <span className={classes.studyList__subtitle}>
            즐겨 찾는 스터디
          </span>
          {favoriteRooms.length === 0 && (
            <p className={classes.dropdownMsg}>즐겨 찾기가 없습니다.</p>
          )}
          {favoriteRooms.length > 0
            && favoriteRooms.map((room) => (
              <VisitiedListItem
                type="favorite"
                key={room.roomId}
                id={room.id}
                roomId={room.roomId}
                title={room.title || ''}
                fav={!!true}
              />
            ))}
        </div>
      </div>
      <label htmlFor="droptdown-toggle">
        <Arrow />
      </label>
    </section>
  );
};

export default VisitedList;
