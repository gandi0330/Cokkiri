import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNickname, getUserEmail } from '../store/authSlice';
import { fetchStudyTime } from '../store/studyTimeSlice';

import AccChart from '../components/record/AccChart';
// import WeekChart from '../components/record/WeekChart';

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
      <h3 className={classes.myRecord__title}>{nickname}님의 공부 기록</h3>
      <div className={classes.myRecord__today}>
        <p>오늘 공부 시간: 4시간 10분 33초</p>
        <p className={classes.myRecord__today__diff}>오늘은 어제보다 00시간 00분 더 공부하셨습니다.</p>
      </div>
      <AccChart />
      {/* <WeekChart /> */}
    </div>
  );
};

export default MyRecordPage;
