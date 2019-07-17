import {
  MAILS_FETCH_REQUEST,
  MAILS_FETCH_SUCCESS,
  MAILS_FETCH_FAILURE,
  MAILS_GET,
  MAILS_RESET_NON_COMPLETED,
  MAILS_ADD,
  MAILS_START,
  MAILS_CANCEL,
  MAILS_COMPLETE,
  MAILS_DELETE,
  MAILS_SEARCH,
  MAILS_FILTER_SOCIAL,
  MAILS_FILTER_CATEGORY
} from './mails.types';

import { mailsDelete } from './mails.utils';

const INITIAL_STATE = {
  data: {},
  filter: {
    social: 'ALL',
    category: 'ACTIVE'
  },
  search: '',
  fetching: false,
  err: null
};

const mailsReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {

    case MAILS_FETCH_REQUEST:
      return {
        ...state,
        fetching: true,
        err: null
      };

    case MAILS_FETCH_SUCCESS:
      return {
        ...state,
        fetching: false,
        err: null
      };

    case MAILS_FETCH_FAILURE:
      return {
        ...state,
        fetching: false,
        err: action.payload
      };

    case MAILS_GET:
      return {
        ...state,
        data: {...action.payload}
      }

    case MAILS_RESET_NON_COMPLETED:
      return {
        ...state
      }
    
    case MAILS_ADD:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload
        }
      };

    case MAILS_START:
      return {
        ...state,
        data: {
          ...state.data,
          [action.id]: {
            ...state.data[action.id],
            inProgress: true,
            postman: action.userName,
            startTimestamp: action.startTimestamp
          }
        }
      };
    
    case MAILS_CANCEL:
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload]: {
            ...state.data[action.payload],
            completed: false,
            inProgress: false,
            postman: "",
            screenshot: "",
            startTimestamp: ""
          }
        }
      }

    case MAILS_COMPLETE:
      return {
        ...state,
        data: {
          ...state.data,
          [action.id]: {
            ...state.data[action.id],
            endTimestamp: action.endTimestamp,
            completed: true,
            inProgress: false,
            screenshot: action.screenshot,
            screenshotName: action.screenshotName
          }
        }
      }

    case MAILS_DELETE:
      return {
        ...state,
        data: mailsDelete(state.data, action.payload)
      }

    case MAILS_SEARCH:
      return {
        ...state,
        search: action.payload
      }

    case MAILS_FILTER_SOCIAL:
      return {
        ...state,
        filter: {
          ...state.filter,
          social: action.payload
        }
      }

    case MAILS_FILTER_CATEGORY:
      return {
        ...state,
        filter: {
          ...state.filter,
          category: action.payload
        }
      }

    default:
      return state;
  }
}

export default mailsReducer;