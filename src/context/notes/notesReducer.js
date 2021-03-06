import {
  GET_NOTES,
  GET_NOTES_BY_ID,
  ADD_NOTE,
  INIT_ADD_NOTE,
  SET_LOADING,
  DELETE_NOTE,
  UPDATE_NOTE,
  SET_CURRENT,
  CLEAR_CURRENT,
  SEARCH_NOTES,
  CLEAR_SEARCH,
  CLEAR_STATUS,
  CLEAR_NOTES,
  SHAREING_SUCCESS,
  INIT_SHARE_NOTE,
  NOTE_ERROR,
  SET_FILTER
} from '../types';

const NotesReducer = (state, action) => {
  switch (action.type) {
    case GET_NOTES:
      return {
        ...state,
        notes: action.payload,
        loading: false
      }
    case GET_NOTES_BY_ID:
      return {
        ...state,
        note: action.payload,
        loading: false
      }
    case ADD_NOTE:
      return {
        ...state,
        notes: [action.payload.note, ...state.notes],
        loading: false,
        status: { success: action.payload.success, message: action.payload.message }
      }
    case INIT_ADD_NOTE:
      return {
        ...state,
        add: action.payload
      }
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter(note=> note._id !== action.payload.noteId),
        loading: false,
        status: { success: action.payload.success, message: action.payload.message }
      }
    case UPDATE_NOTE:
      return {
        ...state,
        note: action.payload.note,
        notes: state.notes.map(note => note._id === action.payload.note._id ? action.payload.note: note),
        loading: false,
        status: { success: action.payload.success, message: action.payload.message }
      }
    case SHAREING_SUCCESS:
      return {
        ...state,
        notes: state.notes.map(note => note._id === action.payload.id ? { 
          ...note, shared: (action.payload.token ? true : false) } : note),
        shared_content: action.payload,
        loading: false,
        status: { success: action.payload.success, message: action.payload.message }
      }
    case INIT_SHARE_NOTE: 
      return {
        ...state,
        sharing: action.payload
      }
    case NOTE_ERROR:
      return {
        ...state,
        loading: false,
        status: { success: false, message: action.payload }
      }
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      }
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      }
    case SEARCH_NOTES:
      return{
        ...state,
        searched: state.notes.filter(note => {
            const regex = new RegExp(`${action.payload}`,'gi')
            return note.title.match(regex)
        })
    }
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    case CLEAR_SEARCH:
      return{
        ...state,
        searched: null
    }
    case CLEAR_STATUS:
      return{
        ...state,
        status: null,
        loading: false
      }
    case SET_FILTER:
      return {
        ...state,
        filtered: action.payload
      }
    case CLEAR_NOTES:
      return {
        ...state,
        notes: [],
        note: null,
        current: null,
        searched: null
      }
    default:
      return state;
  }
};

export default NotesReducer;