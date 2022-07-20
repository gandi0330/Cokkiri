import PropTypes from 'prop-types';

import LoginForm from '../components/layout/LoginForm';
import SignupEmail from '../components/layout/SignupEmail';
import SignupCertification from '../components/layout/SignupCertification';
import SignupDetail from '../components/layout/SignupDetail';
import Logout from '../components/layout/Logout';

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
