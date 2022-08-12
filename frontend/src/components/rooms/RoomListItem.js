import { forwardRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MdPersonOutline } from 'react-icons/md';
import { updateRecentRooms } from '../../store/roomListSlice';
import { getUserEmail } from '../../store/authSlice';
import Modal from '../layout/Modal';
import YesNoModal from '../layout/YesNoModal';

import classes from './RoomListItem.module.css';

import RoomThumbnail1 from '../../images/RoomThumbnail1.jpg';
import RoomThumbnail2 from '../../images/RoomThumbnail2.jpg';
import RoomThumbnail3 from '../../images/RoomThumbnail3.jpg';
import RoomThumbnail4 from '../../images/RoomThumbnail4.jpg';
import ExcitingElephant from '../icons/ExcitingElephant';

const THUMBNAILS = [
  { id: 0, thumbnailSrc: RoomThumbnail1 },
  { id: 1, thumbnailSrc: RoomThumbnail2 },
  { id: 2, thumbnailSrc: RoomThumbnail3 },
  { id: 3, thumbnailSrc: RoomThumbnail4 },
];

const RoomListItem = forwardRef(({ 
  roomId, title, userCount, userLimit,
}, ref) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const email = useSelector(getUserEmail);
  const tnIdx = Math.floor(Math.random() * 4);
  const [noRoomIn, setNoRoomIn] = useState(false);
  const [canEnterRoom, setCanEnterRoom] = useState(false);

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
    // navigate(`/room/${roomId}`);
    const isMobile = navigator.userAgentData.mobile;
    if (isMobile) {
      window.location.assign(`/room/${roomId}`);
    } else {
      window.open(`/room/${roomId}`, '_blank');
    }
    dispatch(updateRecentRooms({ email, roomId }));
  };

  return (
    <>
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
      <div onClick={onEnterRoom} className={classes.card} ref={ref}>
        <img src={THUMBNAILS[tnIdx].thumbnailSrc} alt="스터디룸 이미지" />
        <div>
          <span>{ title }</span>
          <span><i><MdPersonOutline /></i>{userCount}/{userLimit}</span>
        </div>
      </div>
    </>
  );
});

RoomListItem.propTypes = {
  roomId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  userCount: PropTypes.number.isRequired,
  userLimit: PropTypes.number.isRequired,
};

export default RoomListItem;
