import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import ApiService from './services/apiService';
import {ApiServiceProvider} from 'Components/ApiServiceContext/ApiServiceContext';
import App from 'Components/App/App';
import 'Styles/main.sass';
import store from 'Redux/store';
import ErrorBoundry from 'Components/ErrorBoundry/ErrorBoundry';
import Auth from 'Components/Auth/Auth';

const apiService = new ApiService();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <ApiServiceProvider value={apiService}>
        <Auth>
          <Router>
            <App />
          </Router>
        </Auth>
      </ApiServiceProvider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById('root')
);