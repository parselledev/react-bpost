import {createStore, applyMiddleware} from 'redux';
import {persistStore} from 'redux-persist';

import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';

import rootReducer from './rootReducer';

const loggerMiddleware = createLogger();
const middlewares = [thunkMiddleware, loggerMiddleware];

const store = createStore(rootReducer, applyMiddleware(...middlewares));
const persistor = persistStore(store);

export {
  store,
  persistor
};