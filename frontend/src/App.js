import { Routes, Route } from 'react-router-dom';

import MainPage from './pages/MainPage';
import MyPagePage from './pages/MyPagePage';
import MyRecord from './pages/MyRecord';
import RoomsPage from './pages/RoomsPage';
import RoomDetailPage from './pages/RoomDetailPage';
import AccountPage from './pages/AccountPage';
import NavBar from './components/layout/NavBar';

const App = () => {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/my-record" element={<MyRecord />} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/room" element={<RoomDetailPage />} />
        <Route path="/my-page" element={<MyPagePage />} />
        <Route path="/login" element={<AccountPage header="login" />} />
        <Route path="/logout" element={<AccountPage header="logout" />} />
        <Route path="/signupEmail" element={<AccountPage header="signupEmail" />} />
        <Route path="/signupCertification" element={<AccountPage header="signupCertification" />} />
        <Route path="/signupDetail" element={<AccountPage header="signupDetail" />} />
      </Routes>
    </div>
  );
};

export default App;
