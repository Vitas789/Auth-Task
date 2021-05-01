import './App.css';
import {useState} from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Login from './components/login';
import Profile from './components/profile';

function App() {
  const [user, setUser] = useState('');
  const updateUser = (value: string) => setUser(value)

  return (
    <div className="App">
      <Switch>
        <Route path="/login" render={ (props) => <Login {...props} upUser={updateUser}/>} />
        <Route path="/profile" render={ (props) => <Profile {...props} user={user}/>}/>
        <Redirect from="/" to="/login" />
      </Switch>
    </div>
  );
}

export default withRouter(App);
