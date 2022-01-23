import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppBar from './components/layout/AppBar';
import PrivateRoute from './components/routing/PrivateRoute';
import AuthState from './context/auth/AuthState';
import NotesState from './context/notes/NotesState';
import QueriessState from './context/queries/queriesState';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ForgotPassword from './components/auth/ForgotPassword';
import Home from './pages/Home';
import About from './pages/About';
import setAuthToken from './utils/setAuthToken';
import 'bootstrap/dist/css/bootstrap.min.css';

if (localStorage.token){
  setAuthToken(localStorage.token)
}

function App() {
  return (
    <AuthState>
      <NotesState>
        <QueriessState >
          <Router>
            <Fragment>
              <AppBar />
              <div className="App">
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/forgotPassword' component={ForgotPassword} />
                  <Route exact path='/about' component={About} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </QueriessState>
      </NotesState>
    </AuthState>
  );
}

export default App;
