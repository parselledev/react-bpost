import {
  FETCH_NEWS_REQUEST,
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_FAILURE
} from './news.types';

const INITIAL_STATE = {
  data: [],
  fetching: false,
  err: false
};

const newsReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case FETCH_NEWS_REQUEST:
      return {
        ...state,
        fetching: true,
        err: false
      };

    case FETCH_NEWS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        fetching: false,
        err: false
      };

    case FETCH_NEWS_FAILURE:
      return {
        data: [],
        fetching: false,
        err: action.payload
      };

    default:
      return state;
  }
}

export default newsReducer;