import PropTypes from 'prop-types';

import LoginForm from '../components/account/LoginForm';
import SignupEmail from '../components/account/SignupEmail';
import SignupCertification from '../components/account/SignupCertification';
import SignupDetail from '../components/account/SignupDetail';
// import ChangePassword from '../components/account/ChangePassword';
import Logout from '../components/account/Logout';
import styles from './AccountPage.module.css';

const AccountPage = ({ header }) => {
  return (
    <div className={styles.accountPage}>
      { header === 'login' && <LoginForm /> }
      { header === 'logout' && <Logout /> }
      { header === 'signupEmail' && <SignupEmail /> }
      { header === 'signupCertification' && <SignupCertification /> }
      { header === 'signupDetail' && <SignupDetail /> }
      {/* { header === 'changePassword' && <ChangePassword />} */}
    </div>
  );
};

AccountPage.propTypes = {
  header: PropTypes.string.isRequired,
};

export default AccountPage;
