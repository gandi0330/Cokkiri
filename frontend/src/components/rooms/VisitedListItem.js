import PropTypes from 'prop-types';

import { FaStar } from 'react-icons/fa';
import { MdMoreVert } from 'react-icons/md';

import classes from './VisitedListItem.module.css';

const VisitedListItem = ({ title }) => {
  return (
    <div className={classes.visitedStudyCard}>
      <div>
        <i><FaStar /></i>
        {/* FIX Link tag로 바꿔야 한다 */}
        {/* TODO check 여부에 따라 별 색과 순위 바뀌는 것 */}
        <span>{ title }</span>
      </div>
      <button type="button" className={classes.btn}><MdMoreVert /></button>
    </div>
  );
};

VisitedListItem.propTypes = {
  // id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default VisitedListItem;
