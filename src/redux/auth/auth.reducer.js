import {
  AUTH_SIGN_IN,
  AUTH_SIGN_UP,
  AUTH_FETCH_REQUEST,
  AUTH_FETCH_FAILURE
} from './auth.types';

const INITIAL_STATE = {
  username: '',
  fetching: false,
  err: null
};

const loginReducer = (state = INITIAL_STATE, action)  => {
  switch(action.type) {

    case AUTH_SIGN_IN:
      return {
        ...state,
        username: action.payload
      }

    case AUTH_SIGN_UP:
      return {
        ...state,
        username: action.payload
      }

    case AUTH_FETCH_REQUEST:
      return {
        ...state,
        fetching: true,
        err: null
      };

    case AUTH_FETCH_FAILURE:
      return {
        ...state,
        fetching: false,
        err: action.payload
      };

    default:
      return state;
  }

}

export default loginReducer;