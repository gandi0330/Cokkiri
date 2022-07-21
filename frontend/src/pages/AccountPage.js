import PropTypes from 'prop-types';

import LoginForm from '../components/account/LoginForm';
import SignupEmail from '../components/account/SignupEmail';
import SignupCertification from '../components/account/SignupCertification';
import SignupDetail from '../components/account/SignupDetail';
import Logout from '../components/account/Logout';

const AccountPage = ({ header }) => {
  if (header === 'login') {
    return <LoginForm />;
  }
  if (header === 'logout') {
    return <Logout />;
  }
  if (header === 'signupEmail') {
    return <SignupEmail />;
  }
  if (header === 'signupCertification') {
    return <SignupCertification />;
  }
  if (header === 'signupDetail') {
    return <SignupDetail />;
  }
  return null;
};

AccountPage.propTypes = {
  header: PropTypes.string.isRequired,
};

export default AccountPage;
