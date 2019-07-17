import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
}

import authReducer from './auth/auth.reducer';
import mailsReducer from './mails/mails.reducer';
import newsReducer from './news/news.reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  mails: mailsReducer,
  news: newsReducer
});

export default persistReducer(persistConfig, rootReducer);