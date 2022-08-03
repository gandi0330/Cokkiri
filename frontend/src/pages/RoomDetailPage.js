import { useParams } from 'react-router-dom';

// import RightSideBar from '../components/roomDetail/RightSideBar';
// import RightSidePanel from '../components/roomDetail/RightSidePanel';
import VideoSection from '../components/roomDetail/VideoSection';
import classes from './RoomDetailPage.module.css';

const RoomDetailPage = () => {
  const { roomId } = useParams();
  return (
    <div className={classes.container}>
      <VideoSection roomId={roomId} />
      {/* <RightSideBar /> */}
      {/* <RightSidePanel /> */}
    </div>
  );
};

export default RoomDetailPage;
