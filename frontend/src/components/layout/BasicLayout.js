import React from 'react';
import { Outlet } from 'react-router-dom';

import NavBar from './NavBar';

const BasicLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default BasicLayout;
