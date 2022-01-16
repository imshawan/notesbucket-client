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
        notes: [action.payload,...state.notes],
        loading: false
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
        loading: false
      }
    case UPDATE_NOTE:
      return {
        ...state,
        notes: state.notes.map(note => note._id === action.payload._id ? action.payload: note),
        loading: false
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
    case FILTER_NOTES:
    case CLEAR_FILTER:
    case NOTE_ERROR:
      return{
        ...state,
        error:action.payload
      }
    case CLEAR_NOTES:
    default:
      return state;
  }
};

export default NotesReducer;