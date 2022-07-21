import PropTypes from 'prop-types';

const VideoListItem = ({ video }) => {
  return (<div>{ video.id }</div>);
};

VideoListItem.propTypes = {
  video: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
};

export default VideoListItem;
