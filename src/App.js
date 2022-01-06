import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppBar from './components/layout/AppBar';
import PrivateRoute from './components/routing/PrivateRoute';
import AuthState from './context/auth/AuthState';
import NotesState from './context/notes/NotesState';
import Register from './components/auth/Register';
import Note from './components/Notes';

function App() {
  return (
    <AuthState>
      <AppBar />
      <NotesState>
        <Router>
          <Fragment>
            <div className="App">
              <Switch>
                <PrivateRoute exact path="/" component={Note} />
                <Route exact path='/register' component={Register} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </NotesState>
    </AuthState>
  );
}

export default App;
