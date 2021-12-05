import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppBar from './components/layout/AppBar';

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
              <Note exact path="/register" />
              <Routes>
                { <Route exact path="/register" component={Note} />}
              </Routes>
            </div>
          </Fragment>
        </Router>
      </NotesState>
    </AuthState>
  );
}

export default App;
