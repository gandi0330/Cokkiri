import { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { MdPersonOutline } from 'react-icons/md';

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

const RoomListItem = forwardRef(({ title }, ref) => {
  const tnIdx = Math.floor(Math.random() * 4);

  return (
    <div className={classes.card} ref={ref}>
      <img src={THUMBNAILS[tnIdx].thumbnailSrc} alt="스터디룸 이미지" />
      <div>
        <span>{ title }</span>
        <span><i><MdPersonOutline /></i>3/4</span>
      </div>
    </div>
  );
});

RoomListItem.propTypes = {
  // id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default RoomListItem;
