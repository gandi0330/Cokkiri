import { useEffect, useState, useMemo } from 'react';
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

  const [todayTime, setTodayTime] = useState(0);
  const [yesterdayTime, setYesterdayTime] = useState(0);
  const [thisWeek, setThisWeek] = useState(new Array(7).fill(0));
  const [lastWeek, setLastWeek] = useState(new Array(7).fill(0));

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0); 
  const [seconds, setSeconds] = useState(0); 
  const [timeDiff, setTimeDiff] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const dayCalculator = (offset) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const currentTimeStamp = today.getTime() - today.getTimezoneOffset() * 60000;
    return new Date(currentTimeStamp - 24 * 60 * 60 * 1000 * offset).toISOString().slice(0, -1);
  };

  useEffect(() => {
    if (!email) return;

    const getThisWeek = async () => {
      const results = await Promise.all([
        dispatch(fetchStudyTime({ email, startDatetime: '2020-01-01T00:00:00.000', endDatetime: dayCalculator(-1) })),
        
        dispatch(fetchStudyTime(
          { email, startDatetime: dayCalculator(0), endDatetime: dayCalculator(-1) },
        )),
        dispatch(fetchStudyTime(
          { email, startDatetime: dayCalculator(1), endDatetime: dayCalculator(0) },
        )),
        dispatch(fetchStudyTime(
          { email, startDatetime: dayCalculator(2), endDatetime: dayCalculator(1) },
        )),
        dispatch(fetchStudyTime(
          { email, startDatetime: dayCalculator(3), endDatetime: dayCalculator(2) },
        )),
        dispatch(fetchStudyTime(
          { email, startDatetime: dayCalculator(4), endDatetime: dayCalculator(3) },
        )),
        dispatch(fetchStudyTime(
          { email, startDatetime: dayCalculator(5), endDatetime: dayCalculator(4) },
        )),
        dispatch(fetchStudyTime(
          { email, startDatetime: dayCalculator(6), endDatetime: dayCalculator(5) },
        )),
      ]);
      
      const thisWeekTimes = results.map((result) => {
        if (result.payload.statusCode === 404) return 0;
        return result.payload.totalTime;
      });

      return thisWeekTimes;
    };

    const getLastWeek = async () => {
      const results = await Promise.all([
        dispatch(fetchStudyTime(
          { email, startDatetime: dayCalculator(7), endDatetime: dayCalculator(6) },
        )),
        dispatch(fetchStudyTime(
          { email, startDatetime: dayCalculator(8), endDatetime: dayCalculator(7) },
        )),
        dispatch(fetchStudyTime(
          { email, startDatetime: dayCalculator(9), endDatetime: dayCalculator(8) },
        )),
        dispatch(fetchStudyTime(
          { email, startDatetime: dayCalculator(10), endDatetime: dayCalculator(9) },
        )),
        dispatch(fetchStudyTime(
          { email, startDatetime: dayCalculator(11), endDatetime: dayCalculator(10) },
        )),
        dispatch(fetchStudyTime(
          { email, startDatetime: dayCalculator(12), endDatetime: dayCalculator(11) },
        )),
        dispatch(fetchStudyTime(
          { email, startDatetime: dayCalculator(13), endDatetime: dayCalculator(12) },
        )),
      ]);
      const lastWeekTimes = results.map((result) => {
        if (result.payload.statusCode === 404) return 0;
        return result.payload.totalTime;
      });
      return lastWeekTimes;
    };

    (async () => {
      const thisWeek = await getThisWeek();
      const lastWeek = await getLastWeek();
      
      setTotalTime(thisWeek[0] || 0);
      setTodayTime(thisWeek[1] || 0);
      setYesterdayTime(thisWeek[2] || 0);
      setThisWeek(thisWeek.slice(1).reverse().map((seconds) => +(seconds / 3600).toFixed(1)));
      setLastWeek(lastWeek.reverse().map((seconds) => +(seconds / 3600).toFixed(1)));
    })(); 
  }, [email]);

  useEffect(() => {
    setHours(Math.trunc(todayTime / 3600));
    setMinutes(Math.trunc((todayTime % 3600) / 60));
    setSeconds((todayTime % 3600) % 60);
    setTimeDiff(todayTime - yesterdayTime);
  }, [yesterdayTime, yesterdayTime, thisWeek, lastWeek]);

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
                {` ${Math.trunc(Math.abs(timeDiff / 3600))}`}시간  
                {` ${Math.trunc(Math.abs((timeDiff % 3600) / 60))}`}분
              </span> 
              {timeDiff >= 0 ? ' 더 공부하셨습니다.' : ' 덜 공부했습니다'}
            </div>
          </div>
          <AccChart totalTime={totalTime} />
        </div>
        <div className={classes.myRecord__right__chart}>
          <WeekChart thisWeek={useMemo(() => thisWeek)} lastWeek={useMemo(() => lastWeek)} />
        </div>
      </div>
    </div>
  );
};

export default MyRecordPage;
