import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import rootReducer from './reducers/rootReducer';

const loggerMiddleware = createLogger();
const middlewares = [thunkMiddleware, loggerMiddleware];

const store = createStore(rootReducer, applyMiddleware([...middlewares]));

export default store;