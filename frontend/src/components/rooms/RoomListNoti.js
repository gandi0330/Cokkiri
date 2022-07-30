import React from 'react';
import PropTypes from 'prop-types';

import SadElephant from '../../images/SadElephant.png';
import ExcitingElephant from '../../images/ExcitingElephant.png';
import classes from './RoomListNoti.module.css';

const RoomListNoti = ({
  condition,
}) => {
  let elephantImg = SadElephant;
  if (condition === 'error') elephantImg = ExcitingElephant;

  let notiMsg = <h6>검색 결과가 없습니다!</h6>;
  if (condition === 'error') {
    notiMsg = (
      <>
        <h6>에러가 발생했습니다!</h6>
        <h6>다시 시도해 주세요.</h6>
      </>
    );
  }

  return (
    <div className={classes.roomListError}>
      <img src={elephantImg} alt="스터디 찾기 오류 이미지" />
      <div>
        {notiMsg}
        {/* <h6>에러가 발생했습니다!</h6>
        <h6>다시 시도해 주세요.</h6> */}
      </div>
    </div>
  );
};

RoomListNoti.propTypes = {
  condition: PropTypes.string.isRequired,
};

export default RoomListNoti;
