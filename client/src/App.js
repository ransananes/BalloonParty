import React from 'react';
import {Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";
import Room from './components/pages/Room';
function App() {
  const history = createBrowserHistory({forceRefresh:true});
  return (
    <div>
        <Router history={history}>
        <Switch>
        <Route exact path='/' component={Room} />
      </Switch>
      </Router>
    </div>
  );
}

export default App;
