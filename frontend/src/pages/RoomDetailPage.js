import { useParams } from 'react-router-dom';

import RightSideBar from '../components/roomDetail/RightSideBar';
import RightSidePanel from '../components/roomDetail/RightSidePanel';
import VideoSection from '../components/roomDetail/VideoSection';

const RoomDetailPage = () => {
  const { roomName } = useParams();
  console.log(roomName);
  return (
    <>
      <div>RoomDetailPage</div>
      <VideoSection />
      <RightSidePanel />
      <RightSideBar />
    </>
  );
};

export default RoomDetailPage;
