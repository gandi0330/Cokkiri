import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaFeatherAlt } from 'react-icons/fa';
import { getUserEmail, getNickname } from '../store/authSlice';
import { fetchStudyTime } from '../store/studyTimeSlice';

import AccChart from '../components/record/AccChart';
import WeekChart from '../components/record/WeekChart';

import classes from './MyRecordPage.module.css';

const MyRecordPage = () => {
  const dispatch = useDispatch();
  const email = useSelector(getUserEmail);
  const nickname = useSelector(getNickname);

  useEffect(() => {
    if (!email) return;

    dispatch(fetchStudyTime({ email }))
      .unwrap()
      .then()
      .catch((err) => {
        if (err.statusCode === 404) return;
      }); // TODO API에 따라 작업 필요
  }, [email]);

  return (
    <div className={classes.myRecord}>
      <h2>{nickname || '익명'}님의 공부 기록</h2>
      <div className={classes.myRecord__partition}>

        <div className={classes.myRecord__left__chart}>
          <div className={classes.myRecord__title}>
            <FaFeatherAlt /> 
            <h3>오늘의 기록</h3>
          </div>
          <div className={classes.myRecord__today}>
            <div className={classes.myRecord__today__box}>
              <small>Today</small>
              <span>4시간 10분 33초</span>
            </div>
            <div className={classes.myRecord__today__diff}>
              어제보다 <span>0시간 00분</span> 더 공부하셨습니다.
            </div>
          </div>
          <AccChart />
        </div>
        <div className={classes.myRecord__right__chart}>
          <WeekChart />
        </div>
      </div>
    </div>
  );
};

export default MyRecordPage;
