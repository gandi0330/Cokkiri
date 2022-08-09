import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaStar } from 'react-icons/fa';
import { getUserEmail } from '../../store/authSlice';
import { 
  addFavoriteRoom, 
  removeFavoriteRoom,
  fetchFavoriteRooms,
} from '../../store/roomListSlice';

import classes from './VisitedListItem.module.css';

const VisitedListItem = ({ 
  type, title, roomId, 
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector(getUserEmail);

  const favoriteHandler = () => {
    if (!email) return;

    if (type === 'recent') {
      dispatch(addFavoriteRoom({ email, roomId }))
        .unwrap()
        .then(() => {
          dispatch(fetchFavoriteRooms({ email }));
        })
        .catch((err) => console.error(err));
    }

    if (type === 'favorite') {
      dispatch(removeFavoriteRoom({ email, roomId }))
        .unwrap()
        .then(() => {
          dispatch(fetchFavoriteRooms({ email }));
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className={classes.visitedStudyCard}>
      <div>
        <i>
          <FaStar 
            onClick={favoriteHandler}
            className={(type === 'favorite') ? `${classes.gotoStudy}` : `${classes.notGotoStudy}`}
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
};

export default VisitedListItem;
