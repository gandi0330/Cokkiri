import React from 'react';
import PropTypes from 'prop-types';
import { FaRegClock } from 'react-icons/fa';

import classes from './Chart.module.css';

const AccChart = ({
  totalTime,
}) => {
  const currentAccHour = Math.round(totalTime / 3600);
  const totalTimes = new Array(11).fill(0).map((_, i) => 2 ** i);

  const calculatePercent = (currHour) => {
    let percent = 0;
    for (const total of totalTimes) {
      if (currHour < total) {
        percent = (currHour / total) * 100;
        return [percent, total];
      } 
    }
    return [100, 1024];
  };

  const [percent, total] = calculatePercent(currentAccHour);
  const progressBarStyles = {
    width: `${percent}%`,
  };

  return (
    <div className={classes.accChart}>
      <div className={classes.accChart__bar}>
        <div className={classes.accChart__info}>
          <div>
            <FaRegClock />
            <span>전체 누적 시간</span>
          </div>
          <span>{`${Math.round(percent)}%`}</span>
        </div>
      </div>
      <div className={classes.accChart__progress}>
        <span 
          className={classes.accChart__progress__bar}
          style={progressBarStyles}
        />
      </div>
      <span className={classes.accChart__caption}>{`${currentAccHour}시간 / 총 ${total}시간`}</span>
    </div>
  );
};

AccChart.propTypes = {
  totalTime: PropTypes.number.isRequired,
};

export default AccChart;
