import PropTypes from 'prop-types';

import LoginForm from '../components/layout/LoginForm';
import SignupEmail from '../components/layout/SignupEmail';
import Logout from '../components/layout/Logout';

const AccountPage = ({ header }) => {
  if (header === 'login') {
    return <LoginForm />;
  }
  if (header === 'logout') {
    return <Logout />;
  }
  if (header === 'signup') {
    return <SignupEmail />;
  }
  return null;
};

AccountPage.propTypes = {
  header: PropTypes.string.isRequired,
};

export default AccountPage;
