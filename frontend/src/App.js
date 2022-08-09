import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from './store/authSlice';

import BasicLayout from './components/layout/BasicLayout';
import MainPage from './pages/MainPage';
import AccountPage from './pages/AccountPage';
import MyPagePage from './pages/MyPagePage';
import MyRecordPage from './pages/MyRecordPage';
import RoomsPage from './pages/RoomsPage';
import RoomDetailPage from './pages/RoomDetailPage';
import QuestionPage from './pages/questions/QuestionPage';
import QuestionNewPage from './pages/questions/QuestionNewPage';
import QuestionUpdatePage from './pages/questions/QuestionUpdatePage';
import QuestionDetailPage from './pages/questions/QuestionDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import Loader from './components/layout/Loader';

const App = () => {
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');

  useEffect(() => {
    if (token) {
      dispatch(getUserInfo({ email })).then(() => {}).catch((err) => console.error(err));
      if (!email) navigate('/login'); // TODO 체크 필요 
    }
  }, [token]);

  return (
    <div className="App">
      {loading && <Loader />}
      <Routes>
        <Route path="/" element={<BasicLayout />}>
          <Route index element={<MainPage />} />
          <Route path="/my-record/:email" element={<MyRecordPage />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/my-page/:email" element={<MyPagePage />} />
          <Route path="/login" element={<AccountPage header="login" />} />
          <Route path="/logout" element={<AccountPage header="logout" />} />
          <Route path="/signupEmail" element={<AccountPage header="signupEmail" />} />
          <Route path="/signupCertification" element={<AccountPage header="signupCertification" />} />
          <Route path="/signupDetail" element={<AccountPage header="signupDetail" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        {/* TODO 나중에 room 기능 완성되면 navigation guard 붙이기 */}
        {/* <Route path="/room/:roomName" element={<RoomDetailPage />} /> */}
        <Route path="/room/:roomId" element={<RoomDetailPage />} />
        <Route path="/room/:roomId/questions" element={<QuestionPage />} />
        <Route path="/room/:roomId/questions/new" element={<QuestionNewPage />} />
        <Route path="/room/:roomId/question/:questionId" element={<QuestionDetailPage />} />
        <Route path="/room/:roomId/question/:questionId/update" element={<QuestionUpdatePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
