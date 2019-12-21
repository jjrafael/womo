import React, { Component, lazy } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout } from 'antd';

import classes from './Default.scss';
const { content, bg } = classes;
const { Content } = Layout;
const Header = lazy(() => import('../../Layout/Header/Header'));

class DefaultLayout extends Component {
  render () {
    const { props } = this;
    return (
      <Layout className="bg-transparent">
        <Header isAuth={props.isAuthenticated} />
        <Content className={content}>
          <div className={bg}></div>
          {props.children}
        </Content>
      </Layout>
    );
  }
}

const stateToProps = (state) => {
  const { user } = state;
  return {
    isAuthenticated: user.isLoggedIn === true
  };
};

export default connect(stateToProps)(withRouter(DefaultLayout));