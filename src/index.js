import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import ApiService from './services/apiService';
import {ApiServiceProvider} from './components/ApiServiceContext/ApiServiceContext';
import App from './components/App/App';
import './styles/main.sass';
import store from './store';
import ErrorBoundry from './components/ErrorBoundry/ErrorBoundry';
import Login from './components/Login/Login';

const apiService = new ApiService();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <ApiServiceProvider value={apiService}>
        <Login>
          <Router>
            <App />
          </Router>
        </Login>
      </ApiServiceProvider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById('root')
);