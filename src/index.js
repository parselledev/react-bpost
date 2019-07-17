import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import ApiService from './services/apiService';
import {ApiServiceProvider} from 'Components/ApiServiceContext/ApiServiceContext';
import App from 'Components/App/App';
import 'Styles/main.sass';
import {store, persistor} from 'Redux/store';
import ErrorBoundry from 'Components/ErrorBoundry/ErrorBoundry';
import Auth from 'Components/Auth/Auth';

const apiService = new ApiService();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <ApiServiceProvider value={apiService}>
        <PersistGate persistor={persistor}>

          <Auth>
            <Router>
              <App />
            </Router>
          </Auth>
          
        </PersistGate>
      </ApiServiceProvider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById('root')
);