import { useEffect, useState } from 'react';
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

  const [todayHistory, setTodayHistory] = useState(0); // s
  const [totalTime, setTotalTime] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0); 
  const [seconds, setSeconds] = useState(0); 
  const [yesterdayHistory, setYesterdayHistory] = useState(0);
  const [timeDiff, setTimeDiff] = useState(0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const currentTimeStamp = today.getTime() - today.getTimezoneOffset() * 60000;

  const todayStart = new Date(currentTimeStamp).toISOString().slice(0, -1);
  const tomorrow = new Date(currentTimeStamp + 24 * 60 * 60 * 1000).toISOString().slice(0, -1);
  const yesterday = new Date(currentTimeStamp - 24 * 60 * 60 * 1000).toISOString().slice(0, -1);
  // const thisWeek = new Date(currentTimeStamp - 24 * 60 * 60 * 1000 * 7).toISOString();
  // const lastWeekStart = new Date(currentTimeStamp - 24 * 60 * 60 * 1000 * 8).toISOString();
  // const lastWeek = new Date(currentTimeStamp - 24 * 60 * 60 * 1000 * 14).toISOString();

  console.log(tomorrow, todayStart, yesterday);
  useEffect(() => {
    if (!email) return;

    // 전체 누적 시간
    dispatch(fetchStudyTime({ email, startDatetime: '2020-01-01T00:00:00.000', endDatetime: tomorrow }))
      .unwrap()
      .then((totalRes) => {
        setTotalTime(totalRes.totalTime);
      })
      .catch((err) => {
        if (err.statusCode === 404) return;
      }); 

    // 오늘 누적 시간
    dispatch(fetchStudyTime({ email, startDatetime: todayStart, endDatetime: tomorrow }))
      .unwrap()
      .then((todayRes) => setTodayHistory(todayRes.totalTime))
      .catch((err) => {
        if (err.statusCode === 404) return;
      }); 

    // 어제 누적 시간
    dispatch(fetchStudyTime({ email, startDatetime: yesterday, endDatetime: todayStart }))
      .unwrap()
      .then((yesterdayRes) => setYesterdayHistory(yesterdayRes.totalTime))
      .catch((err) => {
        if (err.statusCode === 404) return;
      }); 
    // dispatch(fetchStudyTime({ email, startDatetime: tomorrow, endDatetime: yes }))
    //   .unwrap()
    //   .then()
    //   .catch((err) => {
    //     if (err.statusCode === 404) return;
    //   }); 
    // dispatch(fetchStudyTime({ email }))
    //   .unwrap()
    //   .then()
    //   .catch((err) => {
    //     if (err.statusCode === 404) return;
    //   });
    // dispatch(fetchStudyTime({ email }))
    //   .unwrap()
    //   .then()
    //   .catch((err) => {
    //     if (err.statusCode === 404) return;
    //   });  
  }, [email]);

  useEffect(() => {
    setHours(Math.round(todayHistory / 3600));
    setMinutes(Math.round((todayHistory % 3600) / 60));
    setSeconds(todayHistory % 3600);
    setTimeDiff(todayHistory - yesterdayHistory);
  }, [todayHistory, yesterdayHistory]);

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
              <span>{hours}시간 {minutes}분 {seconds}초</span>
            </div>
            <div className={classes.myRecord__today__diff}>
              어제보다 
              <span>
                {Math.trunc(Math.abs(timeDiff / 3600))}시간 {Math.trunc((timeDiff % 3600) / 60)}분
              </span> 
              {timeDiff >= 0 ? ' 더 공부하셨습니다.' : ' 덜 공부했습니다'}
            </div>
          </div>
          <AccChart totalTime={totalTime} />
        </div>
        <div className={classes.myRecord__right__chart}>
          <WeekChart />
        </div>
      </div>
    </div>
  );
};

export default MyRecordPage;
