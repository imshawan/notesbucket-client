import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AuthState from './context/auth/AuthState';
import NotesState from './context/notes/NotesState';
import Register from './components/auth/Register';

function App() {
  return (
    <AuthState>
      <NotesState>
        <Router>
          <Fragment>
            <div className="App">
              <h1>Notes Bucket</h1>
              <Register exact path="/register" />
              <Routes>
                {/* <Route exact path="/register" component={Register} /> */}
              </Routes>
            </div>
          </Fragment>
        </Router>
      </NotesState>
    </AuthState>
  );
}

export default App;
