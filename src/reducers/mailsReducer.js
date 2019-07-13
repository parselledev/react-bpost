import {
  RESET_EXECUTION,
  FETCH_MAILS_REQUEST,
  FETCH_MAILS_SUCCESS,
  FETCH_MAILS_FAILURE,
  ADD_MAIL,
  START_MAIL,
  CANCEL_MAIL,
  COMPLETE_MAIL,
  DELETE_MAIL,
  SEARCH_MAILS,
  FITLER_MAILS,
  CATEGORY_MAILS
} from '../constants/actionTypes';

const INITIAL_STATE = {
  data: {},
  fetching: false,
  filter: 'ALL',
  search: '',
  category: 'ACTIVE',
  err: null
};

const mailsReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case RESET_EXECUTION:
      return {
        ...state,
        fetching: true,
        err: null
      }

    case FETCH_MAILS_REQUEST:
      return {
        ...state,
        fetching: true,
        err: null
      };

    case FETCH_MAILS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        fetching: false,
        err: null
      };

    case FETCH_MAILS_FAILURE:
      return {
        ...state,
        fetching: false,
        err: action.payload
      };
    
    case ADD_MAIL:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.mail
        }
        // ...state,
        // data: [
        //   ...state.data,
        //   {...action.payload}
        // ]
      };

    case START_MAIL:
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
    
    case CANCEL_MAIL:
      return {
        ...state,
        data: {
          ...state.data,
          [action.id]: {
            ...state.data[action.id],
            completed: false,
            inProgress: false,
            postman: "",
            screenshot: "",
            startTimestamp: ""
          }
        }
      }

    case COMPLETE_MAIL:
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

    case DELETE_MAIL:
      return {
        ...state,
        data: {
          ...state.data,
          [action.id]: null
        }
      }

    case SEARCH_MAILS:
      return {
        ...state,
        search: action.payload
      }

    case FITLER_MAILS:
      return {
        ...state,
        filter: action.payload
      }

    case CATEGORY_MAILS:
      return {
        ...state,
        category: action.payload
      }

    default:
      return state;
  }
}

export default mailsReducer;