import {combineReducers} from 'redux';
import authReducer from './auth/auth.reducer';
import mailsReducer from './mails/mails.reducer';
import newsReducer from './news/news.reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  mails: mailsReducer,
  news: newsReducer
});

export default rootReducer;