import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import RightSideBar from '../components/roomDetail/RightSideBar';
import RightSidePanel from '../components/roomDetail/RightSidePanel';
import VideoSection from '../components/roomDetail/VideoSection';
import classes from './RoomDetailPage.module.css';
import { getRoom } from '../store/roomSlice';

const RoomDetailPage = () => {
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const [isActive, setIsActive] = useState(false);
  
  const { title } = useSelector((state) => state.room.room);

  console.log(title);

  useEffect(() => {
    dispatch(getRoom({ roomId }));
  }, []);
  
  return (
    <div className={classes.container}>
      <div className={classes.contents}>
        <div>
          {title && <VideoSection title={title} />}
        </div>
        <div>
          {isActive && <RightSidePanel />}
        </div>
      </div>
      <div className={classes.rightSideBar}>
        <RightSideBar setIsActive={setIsActive} />
      </div>
    </div>
  );
};

export default RoomDetailPage;
