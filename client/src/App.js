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
        <Route exact path='/lobby' component={Lobby}/>
        <Route exact path='/room' component={Room} />
        <Route component={Room}/>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
