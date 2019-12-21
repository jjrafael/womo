import React, { Component, lazy } from 'react';
import { Layout as AntdLayout } from 'antd';

const { Content } = AntdLayout;
const Header = lazy(() => import('../Layout/Header/Header'));

class Layout extends Component {
  render () {
    const { props } = this;
    return (
      <AntdLayout>
        <Header isAuth={props.isAuthenticated}>
        </Header>
        <Content>
          {props.children}
        </Content>
      </AntdLayout>
    );
  }
}

export default Layout;