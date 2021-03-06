import * as SessionApiUtil from '../util/SessionApiUtil';
import { toggleLoginModal, toggleSignupModal } from './uiActions';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const receiveCurrentUser = (currentUser) => {
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser
  };
};

export const receiveErrors = (errors) => {
  return {
      type: RECEIVE_ERRORS,
      errors
  };
};

export const clearErrors = () => {
  return {
      type: CLEAR_ERRORS,
  };
};

export const signup = user => dispatch => {
  dispatch(clearErrors());
  let currentUser;
  return SessionApiUtil.signup(user)
    .then(
      u => {
        currentUser = u;
        dispatch(toggleSignupModal());
        dispatch(receiveCurrentUser(u));
      },
      error => {
        dispatch(receiveErrors(error.response.data));
      }
    );
};

export const login = user => dispatch => {
  dispatch(clearErrors());
  let currentUser;
  return SessionApiUtil.login(user)
    .then(
      u => { 
        currentUser = u;
        dispatch(toggleLoginModal());
        dispatch(receiveCurrentUser(currentUser));
      },
      error => {
        dispatch(receiveErrors(error.response.data));
      }
    );
};

export const logout = () => dispatch => {
  dispatch(clearErrors());
  return SessionApiUtil.logout()
    .then(() => dispatch(receiveCurrentUser(null)));
};

