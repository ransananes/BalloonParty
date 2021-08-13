import React from 'react';
import {Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";
import Lobby from './components/pages/Lobby';
import Room from './components/pages/Room';
function App() {
  const history = createBrowserHistory({forceRefresh:true});
  return (
    <div>
        <Router history={history}>
        <Switch>
        <Route exact path='/' component={Lobby}/>
        <Route path='/room' component={Room} />
        <Route component={Room}/>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
