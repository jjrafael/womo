import React, { Fragment, lazy } from 'react';
import { Layout, Menu } from 'antd';

import classes from './Header.scss';
import hh from 'classnames';

const { Header: AntHeader } = Layout;

const RouteLink = lazy(() => import('@components/shared/RouteLink/RouteLink'));
const Header = (props) => {
  const { isAuth } = props;
  const navLinks = (isAuth) ? (
    <Fragment>
      <RouteLink to="/home">Home</RouteLink>
      <RouteLink to="/logout">Logout</RouteLink>
    </Fragment>
  ) : (
    <Fragment>
      <RouteLink to="/login">Login</RouteLink>
    </Fragment>
  );

  return (
    <AntHeader className={hh('secondary-text')}>
      <div className={hh('primary-bg', classes.logo)}>{process.env.APP_NAME}</div>
      <Menu
        theme="dark"
        mode="horizontal"
        className={classes.menu}
      >
        {navLinks}
      </Menu>
    </AntHeader>
  );
};

export default Header;