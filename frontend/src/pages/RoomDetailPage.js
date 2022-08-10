import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import RightSideBar from '../components/roomDetail/RightSideBar';
import RightSidePanel from '../components/roomDetail/RightSidePanel';
import VideoSection from '../components/roomDetail/VideoSection';
import classes from './RoomDetailPage.module.css';
import { getRoom } from '../store/roomSlice';

const RoomDetailPage = () => {
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const [type, setType] = useState('off');

  useEffect(() => {
    if (roomId) {
      dispatch(getRoom({ roomId }));
    }
  });

  const getType = (type) => {
    setType(type);
  };
  
  return (
    <div className={classes.container}>
      <div className={`${classes.contents} ${type !== 'off' && classes.open}`}>
        <div className={`${classes.contents__left} ${type !== 'off' && classes.open}`}>
          {roomId && <VideoSection roomId={roomId} />}
        </div>
        <div className={type !== 'off' ? `${classes.contents__right}` : ''}>
          {type !== 'off' && <RightSidePanel type={type} />}
        </div>
      </div>
      <div className={classes.rightSideBar}>
        <RightSideBar getType={getType} />
      </div>
    </div>
  );
};

export default RoomDetailPage;
