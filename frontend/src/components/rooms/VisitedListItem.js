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
  type, title, roomId, id, fav,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector(getUserEmail);
  const favRooms = useSelector(getFavoriteRooms);

  const favoriteHandler = () => {
    if (!email) return;

    if (type === 'recent' && !fav) {
      dispatch(addFavoriteRoom({ email, roomId }))
        .unwrap()
        .then(() => {
          dispatch(fetchFavoriteRooms({ email }));
        })
        .catch((err) => console.error(err));
    }

    if (type === 'favorite' || fav) {
      let tmpId;
      if (type === 'recent') {
        for (const froom of favRooms) {
          if (froom.roomId === roomId) {
            tmpId = froom.id;
            break;
          }
        }
      }

      if (type === 'recent' && !tmpId) return;
      dispatch(removeFavoriteRoom({ id: type === 'favorite' ? id : tmpId }))
        .unwrap()
        .then(() => {
          dispatch(fetchFavoriteRooms({ email }));
        })
        .catch((err) => console.error(err));
    }
  };

  const gotoClass = !fav ? classes.notGotoStudy : classes.gotoStudy;

  return (
    <div className={classes.visitedStudyCard}>
      <div>
        <i>
          <FaStar 
            onClick={() => favoriteHandler()}
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
  fav: PropTypes.bool.isRequired,
};

export default VisitedListItem;
