import React from 'react';
import PropTypes from 'prop-types';

import { MdAutoGraph } from 'react-icons/md';
import { Line } from 'react-chartjs-2';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Filler,
  Legend,
  Tooltip,
} from 'chart.js';

import classes from './Chart.module.css';

Chart.register(
  LineController,
  CategoryScale,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Filler,
  Legend,
  Tooltip,
);

const WeekChart = ({
  thisWeek, lastWeek,
}) => {
  const dayOfWeek = (num) => {
    return new Date(Date.now() - 86400000 * num).toLocaleString('default', { weekday: 'short' });
  };
  const labels = new Array(7).fill('').map((_, i) => dayOfWeek(6 - i));

  const options = {
    elements: {
      point: {
        radius: 3,
        hitRadius: 10,
        hoverRadius: 10,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className={classes.weekChart}>
      <div className={classes.weekChart__title}>
        <MdAutoGraph />
        <h4>주간 기록</h4>
      </div>
      <Line
        datasetIdKey="id"
        options={options}
        data={{
          labels,
          datasets: [
            {
              id: 1,
              label: '이번주',
              fill: true,
              data: thisWeek,
              backgroundColor: 'rgba(244, 97, 151, .3)',
              borderColor: 'rgba(244, 97, 151, .8)',
              tension: 0.3,
            },
            {
              id: 2,
              label: '저번주',
              data: lastWeek,
              fill: true,
              backgroundColor: 'rgba(245, 145, 51, .3)',
              borderColor: 'rgba(245, 145, 51, .8)',
              tension: 0.3,
            },
          ],
        }}
      />
    </div>
  );
};

WeekChart.propTypes = {
  thisWeek: PropTypes.arrayOf(Number).isRequired,
  lastWeek: PropTypes.arrayOf(Number).isRequired,
};

export default WeekChart;
