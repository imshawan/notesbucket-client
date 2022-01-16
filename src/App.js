import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppBar from './components/layout/AppBar';
import PrivateRoute from './components/routing/PrivateRoute';
import AuthState from './context/auth/AuthState';
import NotesState from './context/notes/NotesState';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Home from './pages/Home';
import setAuthToken from './utils/setAuthToken';
import 'bootstrap/dist/css/bootstrap.min.css';

if (localStorage.token){
  setAuthToken(localStorage.token)
}

function App() {
  return (
    <AuthState>
      <AppBar />
      <NotesState>
        <Router>
          <Fragment>
            <div className="container">
              <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </NotesState>
    </AuthState>
  );
}

export default App;
