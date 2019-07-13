import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.sass';
import Sidebar from '../Sidebar/Sidebar';
import MailsPage from '../../pages/MailsPage/MailsPage';

const App = () => {
  return(
    <div className="app">
      <div className="wrap">
        <Sidebar />
        <div className="app__content">
          <Switch>
            <Route path="/" component={MailsPage} exact/>
            {/* <Route path="/news" render={()=><p>В разработке...</p>} /> */}
            <Route path="/rules" render={()=><p>В разработке...</p>} />
            <Route path="/contacts" render={()=><p>В разработке...</p>} />
            <Route render={()=><p>Старница не найдена</p>} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;