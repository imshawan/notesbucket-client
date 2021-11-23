import React, { useReducer } from 'react';
import axios from 'axios';
import NotesContext from './notesContext';
import notesReducer from './notesReducer';
import {} from '../types';
const NotesState = (props) => {
  const initialState = {};
  const [state, dispatch] = useReducer(notesReducer, initialState);
  return (
    <NotesContext.Provider value={{}}>{props.children}</NotesContext.Provider>
  );
};

export default NotesState;
