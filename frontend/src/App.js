import { Routes, Route } from 'react-router-dom';

import BasicLayout from './components/layout/BasicLayout';
import MainPage from './pages/MainPage';
import MyPagePage from './pages/MyPagePage';
import MyRecord from './pages/MyRecord';
import RoomsPage from './pages/RoomsPage';
import RoomDetailPage from './pages/RoomDetailPage';
import AccountPage from './pages/AccountPage';

const App = () => {
  return (
    <div className="App">
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
        </Route>
        <Route path="/room/:roomName" element={<RoomDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
