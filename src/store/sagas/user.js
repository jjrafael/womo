import { takeEvery, all, put } from 'redux-saga/effects';
import { notification } from 'antd';
import * as Sentry from '@sentry/browser';
import jwtDecode from 'jwt-decode';
import _get from 'lodash.get';

import {
  authStart,
  logoutComplete,
  authComplete
} from '../actions/user/';
import actionTypes from '../actions/user/actionTypes';
import platormApiSvc from '@services/axios/platform-api';

function * authenticate (params) {
  yield put(authStart());
  const { username, password } = params;

  const loginCredentials = {
    username,
    password,
    mode: 'default'
  };
  const loginParams = new URLSearchParams();
  Object.keys(loginCredentials).forEach((key) => {
    loginParams.append(key, loginCredentials[key]);
  });

  let data;
  try {
    const authResp = yield platormApiSvc.post('/oauth/token', loginParams, {
      auth: {
        username: 'webapp',
        password: 'webapp_secret'
      }
    });

    const { access_token: accessToken, refresh_token: refreshToken } = authResp.data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    Sentry.configureScope(scope => {
      scope.setUser({
        id: 123
      });
    });
    const decode = jwtDecode(accessToken);

    data = {
      data: {
        username: _get(decode, 'user_name')
      }
    };

    notification.open({
      message: 'Login Successful',
      description: 'Welcome back!'
    });
  } catch (e) {
    data = {
      notif: {
        message: 'Invalid login details.',
        type: 'error'
      }
    };
  }
  yield put(authComplete(data));
}

function * logout () {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  yield put(logoutComplete());
}

export default function * auth () {
  yield all([
    takeEvery(actionTypes.USER_AUTH, authenticate),
    takeEvery(actionTypes.USER_LOGOUT, logout)
  ]);
}