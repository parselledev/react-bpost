import {
  MAILS_FETCH_REQUEST,
  MAILS_FETCH_SUCCESS,
  MAILS_FETCH_FAILURE,
  MAILS_ADD,
  MAILS_START,
  MAILS_CANCEL,
  MAILS_COMPLETE,
  MAILS_DELETE,
  MAILS_SEARCH,
  MAILS_FILTER_SOCIAL,
  MAILS_FILTER_CATEGORY
} from './mails.types';

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
        data: action.payload,
        fetching: false,
        err: null
      };

    case MAILS_FETCH_FAILURE:
      return {
        ...state,
        fetching: false,
        err: action.payload
      };
    
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
            completed: true,
            inProgress: false,
            screenshot: action.screenshot
          }
        }
      }

    case MAILS_DELETE:
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload]: null
        }
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
          ...state.category,
          category: action.payload
        }
      }

    default:
      return state;
  }
}

export default mailsReducer;