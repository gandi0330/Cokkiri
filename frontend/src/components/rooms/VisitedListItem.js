import { useState } from 'react';
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
import Modal from '../layout/Modal';
import YesNoModal from '../layout/YesNoModal';
import ExcitingElephant from '../icons/ExcitingElephant';

const VisitedListItem = ({ 
  type, title, roomId, id, fav, userCount, userLimit,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector(getUserEmail);
  const favRooms = useSelector(getFavoriteRooms);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [noRoomIn, setNoRoomIn] = useState(false);
  const [canEnterRoom, setCanEnterRoom] = useState(false);

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

  const onEnterRoom = () => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true });
      return;
    }
    setCanEnterRoom(true);
  };

  const onClickModalYes = () => {
    setCanEnterRoom(false);
    if (userLimit <= userCount) {
      setNoRoomIn(true);
      return;
    }
    navigate(`/room/${roomId}`);
    dispatch(updateRecentRooms({ email, roomId }));
  };

  return (
    <div className={classes.visitedStudyCard}>
      <Modal open={noRoomIn} onClose={() => setNoRoomIn(false)}>
        <p />
        <p>인원이 가득찬 방입니다!</p>
        <p />
      </Modal>
      <YesNoModal
        open={canEnterRoom}
        yes="들어가기"
        no="취소"
        onNoClick={() => setCanEnterRoom(false)}
        onYesClick={onClickModalYes}
        onClose={() => setCanEnterRoom(false)}
      >
        <ExcitingElephant />
        <p>스터디룸에 들어가시겠습니까?</p>
      </YesNoModal>
      <div>
        <i>
          <FaStar 
            onClick={() => favoriteHandler()}
            className={gotoClass}
          />
        </i>
        <span onClick={onEnterRoom}>{ title }</span>
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
  userCount: PropTypes.number.isRequired,
  userLimit: PropTypes.number.isRequired,
};

export default VisitedListItem;
