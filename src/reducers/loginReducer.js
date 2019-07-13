import {
  LOGIN_OLD_USER,
  FETCH_USERS_REQUEST,
  FETCH_USERS_FAILURE
} from '../constants/actionTypes';

const INITIAL_STATE = {
  userName: '',
  fetching: false,
  err: null
};

const loginReducer = (state = INITIAL_STATE, action)  => {
  switch(action.type) {
    case LOGIN_OLD_USER:
      return {
        ...state,
        userName: action.payload
      }

    case FETCH_USERS_REQUEST:
      return {
        ...state,
        fetching: true,
        err: null
      };

    case FETCH_USERS_FAILURE:
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