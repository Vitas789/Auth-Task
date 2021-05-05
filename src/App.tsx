import './App.css';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Login from './components/login';
import Profile from './components/profile';
import React from 'react';

const App: React.FC = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
        <Redirect from="/" to="/login" />
      </Switch>
    </div>
  );
};

export default withRouter(App);
