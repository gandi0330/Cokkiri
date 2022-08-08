import React from 'react';
import { useSelector } from 'react-redux/es/exports';

import { getTotalTime } from '../../store/studyTimeSlice';

import classes from './AccChart.module.css';

const AccChart = () => {
  const currentAccHour = Math.round(useSelector(getTotalTime) / 3600);
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
          <span>전체 누적 시간</span>
        </div>
        <div className={classes.accChart__progress}>
          <span 
            className={classes.accChart__progress__bar}
            style={progressBarStyles}
          />
        </div>
      </div>
      <span>{`${currentAccHour}시간/총 ${total}시간`}</span>
    </div>
  );
};

export default AccChart;
