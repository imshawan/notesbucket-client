import React, { useReducer } from 'react';
import axios from 'axios';
import NotesContext from './notesContext';
import notesReducer from './notesReducer';
import { getRecentItems } from '../../utils/utils';
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
        getRecentItems(resp.data)
        reloadCachedNotes()
        dispatch({ type: GET_NOTES, payload: resp.data })
      })
      .catch(err => dispatch({ type: NOTE_ERROR, payload: err.response ? err.response.data : err.message }))
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

  const getNotesById = async (id) => {
    let note = localStorage.getItem(id)
    if (note) {
      return dispatch({ type: GET_NOTES_BY_ID, payload: JSON.parse(note) })
    }
    axios.request({
        url: `${process.env.REACT_APP_PROD_URL}/api/notes/${id}`,
        method: 'GET',
        data: {},
        headers: headers
      }).then((resp) => {
        pushId(id)
        localStorage.setItem(id, JSON.stringify(resp.data))
        dispatch({ type: GET_NOTES_BY_ID, payload: resp.data })
      })
      .catch(err => dispatch({ type: NOTE_ERROR, payload: err.response ? err.response.data : err.message }))
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
        localStorage.setItem(id, JSON.stringify(resp.data.note))
        dispatch({ type: UPDATE_NOTE, payload: resp.data })
      })
      .catch(err => dispatch({ type: NOTE_ERROR, payload: err.response ? err.response.data : err.message }))
  }
  
  const addToFavourites = async (id) =>{
    axios.request({
        url: `${process.env.REACT_APP_PROD_URL}/api/favourites/${id}`,
        method: 'PUT',
        data: {},
        headers: headers
      }).then((resp) => {
        updateNoteCache(id, {favourite: true})
        dispatch({ type: UPDATE_NOTE, payload: resp.data })
      })
      .catch(err => dispatch({ type: NOTE_ERROR, payload: err.response ? err.response.data : err.message }))
  }

  const removeFavourite = async (id) =>{
    axios.request({
        url: `${process.env.REACT_APP_PROD_URL}/api/favourites/${id}`,
        method: 'DELETE',
        data: {},
        headers: headers
      }).then((resp) => {
        updateNoteCache(id, {favourite: false})
        dispatch({ type: UPDATE_NOTE, payload: resp.data })
      })
      .catch(err => dispatch({ type: NOTE_ERROR, payload: err.response ? err.response.data : err.message }))
  }

  const shareNote = async (id, payload) =>{
    axios.request({
        url: `${process.env.REACT_APP_PROD_URL}/api/share/${id}`,
        method: 'PUT',
        data: payload,
        headers: headers
      }).then((resp) => {
        let { data } = resp;
        updateNoteCache(id, {access_token: data.token, shared: !!data.token})
        dispatch({ type: SHAREING_SUCCESS, payload: { ...resp.data, id: id } })
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
        popId(id)
        localStorage.removeItem(id)
        dispatch({ type: DELETE_NOTE, payload: resp.data })
      })
      .catch(err => dispatch({ type: NOTE_ERROR, payload: err.response ? err.response.data : err.message }))
  }

  const reloadCachedNotes = async () => {
      let cachedItems = localStorage.getItem('cachedIds')
      cachedItems = cachedItems ? JSON.parse(cachedItems) : []
      cachedItems.forEach((id) => { 
        axios.request({
          url: `${process.env.REACT_APP_PROD_URL}/api/notes/${id}`,
          method: 'GET',
          data: {},
          headers: headers
        }).then((resp) => {
          localStorage.setItem(id, JSON.stringify(resp.data))
        })
        .catch(err => dispatch({ type: NOTE_ERROR, payload: err.response ? err.response.data : err.message }))
      })
    } 


  const pushId = (id) => { 
    let ids = localStorage.getItem('cachedIds')
    if (!ids) {
      localStorage.setItem('cachedIds', JSON.stringify([id]))
    } else {
      let idsArr = JSON.parse(ids)
      idsArr.push(id)
      localStorage.setItem('cachedIds', JSON.stringify(idsArr))
    }
  }

  const popId = (id) => {
    let ids = localStorage.getItem('cachedIds')
    if (!ids) {
      return
    } else {
      let idsArr = JSON.parse(ids)
      idsArr.pop(id)
      localStorage.setItem('cachedIds', JSON.stringify(idsArr))
    }
  }

  const updateNoteCache = (id, payload = {}) => {
    let note = localStorage.getItem(id);
    if (note) {
      note = { ...JSON.parse(note), ...payload}
      localStorage.setItem(id, JSON.stringify(note))
    }
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

  const TinyEditorOptions = {
    apiKey: process.env.REACT_APP_TINYEDITOR_APIKEY,
    initialConfig: {
      height: 500,
      menubar: false,
      branding: false,
      paste_data_images: true,
      automatic_uploads: true,
      file_picker_types: "image",
      file_picker_callback: function (
        callback,
        value,
        meta
      ) {
        // Provide file and text for the link dialog
        var input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.onchange = function () {
          var file = this.files[0];

          var reader = new FileReader();
          reader.onload = function () {
            var id = "blobid" + new Date().getTime();
            var blobCache =
              window.tinymce.activeEditor.editorUpload
                .blobCache;
            var base64 = reader.result.split(",")[1];
            var blobInfo = blobCache.create(
              id,
              file,
              base64
            );
            blobCache.add(blobInfo);
            callback(blobInfo.blobUri(), {
              title: file.name,
            });
          };
          reader.readAsDataURL(file);
        };

        input.click();
      },
      plugins: [
        'a11ychecker','advlist','advcode','advtable','autolink','checklist','export',
        'lists','link','image','charmap','preview','anchor','searchreplace','visualblocks',
        'powerpaste','fullscreen','formatpainter','insertdatetime','media','table','help','wordcount'
      ],
      toolbar:
        `code undo redo fullscreen | image | formatselect formatpainter casechange blocks | bold italic underline | 
        alignleft aligncenter alignright alignjustify | 
        bullist numlist outdent indent | removeformat | a11ycheck code table help`
    } 
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
      TinyEditorOptions,
      reloadCachedNotes,
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
