import React, { useReducer } from 'react';
import axios from 'axios';
import NotesContext from './notesContext';
import notesReducer from './notesReducer';
import {
  GET_NOTES,
  ADD_NOTE,
  DELETE_NOTE,
  UPDATE_NOTE,
  FILTER_NOTES,
  CLEAR_FILTER,
  NOTE_ERROR,
  CLEAR_NOTES
} from '../types';

const headers = {
  "Content-Type" : "application/json",
  "accept": "*/*"
}

const NotesState = (props) => {
  const initialState = {
    notes: [],
    current: null,
    filtered: null,
    loading: true,
    error: null
}
  const [state, dispatch] = useReducer(notesReducer, initialState);

   //Email Verification API Call
   const getNotes = async () =>{
    axios.request({
        url: `${process.env.REACT_APP_PROD_URL}/api/notes`,
        method: 'GET',
        data: {},
        headers: headers
      }).then((resp) => {
        dispatch({ type: GET_NOTES, payload: resp.data })
      })
      .catch(err => dispatch({ type: NOTE_ERROR, payload: err.response.data.msg }))
  }

  return (
    <NotesContext.Provider value={{
      notes: state.notes,
      current: state.current,
      filtered: state.filtered,
      error: state.error,
      loading: state.loading,
      // addContact,
      // deleteContact,
      // setCurrent,
      // clearCurrent,
      // updateContact,
      // filterContacts,
      // clearFilter,
      getNotes
     // clearContacts
    }}>{props.children}</NotesContext.Provider>
  );
};
export default NotesState;
