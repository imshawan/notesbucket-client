import React, { useReducer } from 'react';
import axios from 'axios';
import NotesContext from './notesContext';
import notesReducer from './notesReducer';
import {
  GET_NOTES,
  GET_NOTES_BY_ID,
  ADD_NOTE,
  INIT_ADD_NOTE,
  SET_LOADING,
  DELETE_NOTE,
  UPDATE_NOTE,
  SET_CURRENT,
  CLEAR_NOTES,
  CLEAR_CURRENT,
  SEARCH_NOTES,
  CLEAR_SEARCH,
  SHAREING_SUCCESS,
  INIT_SHARE_NOTE,
  NOTE_ERROR,
  SET_FILTER
} from '../types';

const headers = {
  "Content-Type" : "application/json",
  "accept": "*/*"
}

const NotesState = (props) => {
  const initialState = {
    notes: [],
    note: {},
    sharing: false,
    shared_content: {},
    add: false,
    status: null,
    current: null,
    searched: null,
    filtered: "none",
    loading: true
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
    axios.request({
        url: `${process.env.REACT_APP_PROD_URL}/api/notes`,
        method: 'POST',
        data: payload,
        headers: headers
      }).then((resp) => {
        dispatch({ type: ADD_NOTE, payload: resp.data })
      })
      .catch(err => dispatch({ type: NOTE_ERROR, payload: err.response ? err.response.data : err.message }))
  }

  const getNotesById = async (id) =>{
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
  
  const addToFavourites = async (id) =>{
    axios.request({
        url: `${process.env.REACT_APP_PROD_URL}/api/favourites/${id}`,
        method: 'PUT',
        data: {},
        headers: headers
      }).then((resp) => {
        dispatch({ type: UPDATE_NOTE, payload: resp.data })
      })
      .catch(err => dispatch({ type: NOTE_ERROR, payload: err.response.data }))
  }

  const removeFavourite = async (id) =>{
    axios.request({
        url: `${process.env.REACT_APP_PROD_URL}/api/favourites/${id}`,
        method: 'DELETE',
        data: {},
        headers: headers
      }).then((resp) => {
        dispatch({ type: UPDATE_NOTE, payload: resp.data })
      })
      .catch(err => dispatch({ type: NOTE_ERROR, payload: err.response.data }))
  }

  const shareNote = async (id, payload) =>{
    axios.request({
        url: `${process.env.REACT_APP_PROD_URL}/api/share/${id}`,
        method: 'PUT',
        data: payload,
        headers: headers
      }).then((resp) => {
        dispatch({ type: SHAREING_SUCCESS, payload: resp.data })
      })
      .catch(err => dispatch({ type: NOTE_ERROR, payload: err.response ? err.response.data.message : err.message}))
  }

  const deleteNotesById = async (id) =>{
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
  const setShareing = (value) => {
    dispatch({ type: INIT_SHARE_NOTE, payload: value })
  }
  const searchNotes = (query) => {
    dispatch({ type: SEARCH_NOTES, payload: query })
  }
  const clearSearch = () =>{
    dispatch({ type: CLEAR_SEARCH })
  }
  //Clear current note
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT })
  }
  const clearNotes = () => {
    dispatch({ type: CLEAR_NOTES })
  }

  const setLoading = (value) => {
    dispatch({ type: SET_LOADING, payload: value})
  }

  const setFilter = (type) => {
    dispatch({ type: SET_FILTER, payload: type })
  }

  const SummerNoteOptions = {
    height: 360,
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
      sharing: state.sharing,
      add: state.add,
      status: state.status,
      current: state.current,
      searched: state.searched,
      shared_content: state.shared_content,
      filtered: state.filtered,
      loading: state.loading,
      SummerNoteOptions,
      addToFavourites, 
      removeFavourite,
      updateNoteById,
      deleteNotesById,
      setLoading,
      setShareing,
      getNotesById,
      clearCurrent,
      searchNotes,
      clearSearch,
      createNote,
      setCurrent,
      clearNotes,
      setFilter,
      shareNote,
      getNotes,
      setAdd
    }}>{props.children}</NotesContext.Provider>
  );
};
export default NotesState;
