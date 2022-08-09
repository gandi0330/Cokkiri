import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { MdPersonOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux/es/exports';

import classes from './RoomListItem.module.css';

import RoomThumbnail1 from '../../images/RoomThumbnail1.jpg';
import RoomThumbnail2 from '../../images/RoomThumbnail2.jpg';
import RoomThumbnail3 from '../../images/RoomThumbnail3.jpg';
import RoomThumbnail4 from '../../images/RoomThumbnail4.jpg';

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
  const { email } = useSelector((state) => state.auth);
  const tnIdx = Math.floor(Math.random() * 4);

  const onClick = async () => {
    try {
      dispatch(entranceRoom({ roomNumber: roomId, email }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div onClick={onClick} className={classes.card} ref={ref}>
      <img src={THUMBNAILS[tnIdx].thumbnailSrc} alt="스터디룸 이미지" />
      <div>
        <span>{ title }</span>
        <span><i><MdPersonOutline /></i>{userCount}/{userLimit}</span>
      </div>
    </div>
  );
});

RoomListItem.propTypes = {
  roomId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  userCount: PropTypes.number.isRequired,
  userLimit: PropTypes.number.isRequired,
};

export default RoomListItem;
