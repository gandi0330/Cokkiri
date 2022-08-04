import { useState } from 'react';
import { useParams } from 'react-router-dom';

import RightSideBar from '../components/roomDetail/RightSideBar';
import RightSidePanel from '../components/roomDetail/RightSidePanel';
import VideoSection from '../components/roomDetail/VideoSection';
import classes from './RoomDetailPage.module.css';

const RoomDetailPage = () => {
  const [isActive, setIsActive] = useState(false);

  const { roomId } = useParams();
  return (
    <div className={classes.container}>

      <div className={classes.contents}>
        <div>
          <VideoSection roomId={roomId} />
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
