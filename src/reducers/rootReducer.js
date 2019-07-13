import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import mailsReducer from './mailsReducer';
import newsReducer from './newsReducer';

const rootReducer = combineReducers({
  login: loginReducer,
  mails: mailsReducer,
  news: newsReducer
});

export default rootReducer;