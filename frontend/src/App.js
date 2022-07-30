import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from './store/authSlice';

import BasicLayout from './components/layout/BasicLayout';
import MainPage from './pages/MainPage';
import MyPagePage from './pages/MyPagePage';
import MyRecord from './pages/MyRecord';
import RoomsPage from './pages/RoomsPage';
import RoomDetailPage from './pages/RoomDetailPage';
import AccountPage from './pages/AccountPage';
// import NotFoundPage from './pages/NotFoundPage';
import Loader from './components/layout/Loader';

const App = () => {
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');

  useEffect(() => {
    if (token) {
      dispatch(getUserInfo({ email })).then(() => {}).catch((err) => console.error(err));
    }
  }, [token]);

  return (
    <div className="App">
      {loading && <Loader />}
      <Routes>
        <Route path="/" element={<BasicLayout />}>
          <Route index element={<MainPage />} />
          <Route path="/my-record/:nickname" element={<MyRecord />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/my-page/:nickname" element={<MyPagePage />} />
          <Route path="/login" element={<AccountPage header="login" />} />
          <Route path="/logout" element={<AccountPage header="logout" />} />
          <Route path="/signupEmail" element={<AccountPage header="signupEmail" />} />
          <Route path="/signupCertification" element={<AccountPage header="signupCertification" />} />
          <Route path="/signupDetail" element={<AccountPage header="signupDetail" />} />
          {/* <Route path="/changePassword" element={<AccountPage header="changePassword" />} /> */}
          {/* {!isLoggedIn && <Route path="/login" element={<AccountPage header="login" />} />}
          {isLoggedIn && <Route path="/logout" element={<AccountPage header="logout" />} />}
          {!isLoggedIn && <Route path="/signupEmail" 
          element={<AccountPage header="signupEmail" />} />}
          {!isLoggedIn && <Route path="/signupCertification" 
          element={<AccountPage header="signupCertification" />} />}
          {!isLoggedIn && <Route path="/signupDetail" 
          element={<AccountPage header="signupDetail" />} />} */}
        </Route>
        {/* TODO 나중에 room 기능 완성되면 navigation guard 붙이기 */}
        <Route path="/room/:roomName" element={<RoomDetailPage />} />
        {/* WRONG 왜 계속 NotFound가 같이 뜰까 */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
        {/* {!loading && <Route path="*" element={<NotFoundPage />} />} */}
      </Routes>
    </div>
  );
};

export default App;
