import React, { useReducer } from 'react';
import axios from 'axios';
import NotesContext from './notesContext';
import notesReducer from './notesReducer';
import {
  GET_NOTES,
  GET_NOTES_BY_ID,
  ADD_NOTE,
  INIT_ADD_NOTE,
  DELETE_NOTE,
  UPDATE_NOTE,
  SET_CURRENT,
  CLEAR_CURRENT,
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
    note: {},
    add: false,
    status: null,
    current: null,
    filtered: null,
    loading: true,
    error: null
}
  const [state, dispatch] = useReducer(notesReducer, initialState);

  const getNotes = async () =>{
    axios.request({
        url: `${process.env.REACT_APP_PROD_URL}/api/notes`,
        method: 'GET',
        data: {},
        headers: headers
      }).then((resp) => {
        dispatch({ type: GET_NOTES, payload: resp.data })
      })
      .catch(err => dispatch({ type: NOTE_ERROR, payload: err.response.data }))
  }

  const createNote = async (payload) =>{
    state.loading = true
    axios.request({
        url: `${process.env.REACT_APP_PROD_URL}/api/notes`,
        method: 'POST',
        data: payload,
        headers: headers
      }).then((resp) => {
        dispatch({ type: ADD_NOTE, payload: resp.data })
      })
      .catch(err => dispatch({ type: NOTE_ERROR, payload: err.response.data }))
  }

  const getNotesById = async (id) =>{
    state.loading = true
    axios.request({
        url: `${process.env.REACT_APP_PROD_URL}/api/notes/${id}`,
        method: 'GET',
        data: {},
        headers: headers
      }).then((resp) => {
        dispatch({ type: GET_NOTES_BY_ID, payload: resp.data })
      })
      .catch(err => dispatch({ type: NOTE_ERROR, payload: err.response.data }))
  }

  const updateNoteById = async (id, payload) =>{
    state.loading = true
    var data = {}
    if (payload.title) data.title = payload.title
    if (payload.content) data.content = payload.content

    axios.request({
        url: `${process.env.REACT_APP_PROD_URL}/api/notes/${id}`,
        method: 'PUT',
        data: data,
        headers: headers
      }).then((resp) => {
        dispatch({ type: UPDATE_NOTE, payload: resp.data })
      })
      .catch(err => dispatch({ type: NOTE_ERROR, payload: err.response.data }))
  }

  const deleteNotesById = async (id) =>{
    state.loading = true
    axios.request({
        url: `${process.env.REACT_APP_PROD_URL}/api/notes/${id}`,
        method: 'DELETE',
        data: {},
        headers: headers
      }).then((resp) => {
        dispatch({ type: DELETE_NOTE, payload: resp.data })
      })
      .catch(err => dispatch({ type: NOTE_ERROR, payload: err.response.data }))
  }

  //Set current note
  const setCurrent = (note) =>{
    dispatch({ type: SET_CURRENT, payload: note })
  }
  const setAdd = (value) => {
    dispatch({ type: INIT_ADD_NOTE, payload: value })
  }
  //Clear current note
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT })
  }

  const SummerNoteOptions = {
    height: 350,
    dialogsInBody: true,
    tabDisable: true,
    dialogsFade: true,
    placeholder: 'Create something awesome...',
    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'underline', 'clear']],
      ['fontname', ['fontname']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['table', ['table']]
    ]
  }

  return (
    <NotesContext.Provider value={{
      notes: state.notes,
      note: state.note,
      add: state.add,
      status: state.status,
      current: state.current,
      filtered: state.filtered,
      error: state.error,
      loading: state.loading,
      getNotesById,
      createNote,
      setAdd,
      setCurrent,
      clearCurrent,
      updateNoteById,
      deleteNotesById,
      // filterContacts,
      // clearFilter,
      getNotes,
     // clearContacts,
     SummerNoteOptions
    }}>{props.children}</NotesContext.Provider>
  );
};
export default NotesState;
