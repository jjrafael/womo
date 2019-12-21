import React from 'react';
import { Link } from 'react-router-dom';

const NavLink = (props) => {
  const { children } = props;
  return <Link {...props}>{children}</Link>;
};

NavLink.defaultProps = {
  className: 'ant-menu-item'
};

export default NavLink;