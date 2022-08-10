import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaStar } from 'react-icons/fa';
import { getUserEmail } from '../../store/authSlice';
import { 
  addFavoriteRoom, 
  removeFavoriteRoom,
  fetchFavoriteRooms,
  getFavoriteRooms,
} from '../../store/roomListSlice';

import classes from './VisitedListItem.module.css';

const VisitedListItem = ({ 
  type, title, roomId, id,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector(getUserEmail);
  const favoriteRooms = useSelector(getFavoriteRooms);
  const isFav = useRef();
  isFav.current = type === 'favorite';
  // const [isFav, setIsFav] = useState(type === 'favorite');

  useEffect(() => {
    if (type === 'recent') {
      for (const favRoom of favoriteRooms) {
        if (favRoom.roomId === roomId) {
          // setIsFav(true);
          isFav.current = true;
        }
      }
    }
  }, []);

  useEffect(() => {
  }, [isFav.current]);

  const favoriteHandler = (fav) => {
    if (!email) return;

    if (type === 'recent' && !fav) {
      for (const favRoom of favoriteRooms) {
        if (favRoom.roomId === roomId) {
          return;
        }
      }
      dispatch(addFavoriteRoom({ email, roomId }))
        .unwrap()
        .then(() => {
          dispatch(fetchFavoriteRooms({ email }));
        })
        .catch((err) => console.error(err));
    }

    if (type === 'favorite' || fav) {
      if (id === -1) return;
      dispatch(removeFavoriteRoom({ id }))
        .unwrap()
        .then(() => {
          dispatch(fetchFavoriteRooms({ email }));
        })
        .catch((err) => console.error(err));
    }
  };

  const gotoClass = !isFav.current ? classes.notGotoStudy : classes.gotoStudy;

  return (
    <div className={classes.visitedStudyCard}>
      <div>
        <i>
          <FaStar 
            onClick={() => favoriteHandler(isFav.current)}
            className={gotoClass}
          />
        </i>
        <span onClick={() => navigate(`/room/${roomId}`)}>{ title }</span>
      </div>
    </div>
  );
};

VisitedListItem.propTypes = {
  type: PropTypes.string.isRequired,
  roomId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default VisitedListItem;
