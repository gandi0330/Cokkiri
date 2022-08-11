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
  const [session, setSession] = useState(null);
  const [publisher, setPublisher] = useState({});
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    if (roomId) {
      dispatch(getRoom({ roomId }));
    }
  });

  const getType = (t) => {
    setType(t);
  };

  const getSession = (s) => {
    setSession(s);
  };

  const getPublisher = (p) => {
    setPublisher(p);
  };
  const getSubscribers = (s) => {
    setSubscribers(s);
  };
  
  return (
    <div className={classes.container}>
      <div className={`${classes.contents} ${type !== 'off' && classes.open}`}>
        <div className={`${classes.contents__left} ${type !== 'off' && classes.open}`}>
          {
            roomId
            && (
            <VideoSection
              roomId={roomId}
              getSession={getSession}
              getPublisher={getPublisher}
              getSubscribers={getSubscribers}
            />
            )
          }
        </div>
        <div className={type !== 'off' ? `${classes.contents__right}` : ''}>
          {type !== 'off' && <RightSidePanel type={type} session={session} publisher={publisher} subscribers={subscribers} />}
        </div>
      </div>
      <div className={classes.rightSideBar}>
        <RightSideBar getType={getType} />
      </div>
    </div>
  );
};

export default RoomDetailPage;
