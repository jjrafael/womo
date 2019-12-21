import actionTypes from '../actions/user/actionTypes';
import _get from 'lodash.get';
import _cloneDeep from 'lodash.clonedeep';

const accessToken = localStorage.getItem('accessToken');
const defaultAuth = {
  notif: {
    message: '',
    type: ''
  },
  status: ''
};
const defaultState = {
  data: {},
  auth: defaultAuth,
  isLoggedIn: (accessToken !== null)
};

export default (state = defaultState, action = {}) => {
  const { type, ...args } = action;

  switch (type) {
    case (actionTypes.USER_AUTH_START):
      return {
        ...state,
        auth: {
          ...state.auth,
          status: 'loading'
        }
      };
    case (actionTypes.USER_AUTH_COMPLETE):
      return {
        ...state,
        data: _get(args, 'data', {}),
        auth: {
          notif: {
            ...state.auth.notif,
            ...args.notif
          },
          status: _get(args, 'data') ? '' : 'fail'
        },
        isLoggedIn: typeof args.data !== 'undefined'
      };
    case (actionTypes.USER_LOGOUT_COMPLETE):
      return {
        data: {},
        auth: _cloneDeep(defaultAuth),
        isLoggedIn: false
      };
    default:
      return state;
  }
};