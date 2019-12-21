import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';

import Form from '@components/Login/Form/Form';
import { auth } from '@store/actions/user/';
import classes from './Login.scss';

export class Login extends Component {
  render () {
    const { onAuth, authNotif } = this.props;

    return (
      <Row>
        <Col span={8} offset={8}>
          <div className={`${classes.formCont} my-4 `}>
            <Form onFormSubmit={onAuth} notif={authNotif} />
          </div>
        </Col>
      </Row>
    );
  }
}

const stateToProps = (state) => {
  const { user } = state;
  return {
    authNotif: user.auth.notif
  };
};

const dispatchToProps = (dispatch) => {
  return {
    onAuth: (data) => dispatch(auth(data))
  };
};

export default connect(stateToProps, dispatchToProps)(Login);