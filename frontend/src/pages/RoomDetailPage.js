import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import RightSideBar from '../components/roomDetail/RightSideBar';
import RightSidePanel from '../components/roomDetail/RightSidePanel';
import VideoSection from '../components/roomDetail/VideoSection';
import classes from './RoomDetailPage.module.css';
import { entranceRoom } from '../store/roomSlice';

const RoomDetailPage = () => {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);
  const { roomName } = useParams();
  console.log(roomName);
  const { email } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(entranceRoom({ email, roomNumber: 1 }));
  });

  return (
    <div className={classes.container}>

      <div className={classes.contents}>
        <div>
          <VideoSection roomId={1} />
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
