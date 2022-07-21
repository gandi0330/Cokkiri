import VideoListItem from './VideoListItem';

const videoList = [
  { id: 1, title: 'video1', key: 'video1' },
  { id: 2, title: 'video2', key: 'video2' },
  { id: 3, title: 'video3', key: 'video3' },
  { id: 4, title: 'video4', key: 'video4' },
];

const VideoList = () => {
  return (
    <div>
      { videoList && videoList.map((video) => <VideoListItem key={video.key} video={video} />) }
    </div>
  );
};

export default VideoList;
