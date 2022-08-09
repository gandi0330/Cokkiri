import React from 'react';

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

const WeekChart = () => {
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
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [
            {
              id: 1,
              label: '이번주',
              fill: true,
              data: [5, 6, 7, 3, 4, 5, 1],
              backgroundColor: 'rgba(244, 97, 151, .3)',
              borderColor: 'rgba(244, 97, 151, .8)',
              tension: 0.3,
            },
            {
              id: 2,
              label: '저번주',
              data: [1, 2, 1, 2, 5, 6, 1],
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

export default WeekChart;
