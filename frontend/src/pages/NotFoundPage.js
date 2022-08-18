import React from 'react';
import NavBar from '../components/layout/NavBar';
import ExcitingElephant from '../images/ExcitingElephant.png';

import classes from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={classes.notFound}>
      <NavBar />
      <img src={ExcitingElephant} alt="Not Found" />
      <h3>404 NOT FOUND</h3>
    </div>
  );
};

export default NotFoundPage;
