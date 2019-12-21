import actionTypes from './actionTypes';

export const auth = (args) => {
  return {
    ...args,
    type: actionTypes.USER_AUTH
  };
};

export const authStart = () => {
  return {
    type: actionTypes.USER_AUTH_START
  };
};

export const authComplete = (args) => {
  return {
    ...args,
    type: actionTypes.USER_AUTH_COMPLETE
  };
};

export const logout = () => {
  return {
    type: actionTypes.USER_LOGOUT
  };
};

export const logoutComplete = () => {
  return {
    type: actionTypes.USER_LOGOUT_COMPLETE
  };
};