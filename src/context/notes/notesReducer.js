import {
  GET_NOTES,
  ADD_NOTE,
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
      return{
        ...state,
        notes: action.payload,
        loading: false
    }
    case ADD_NOTE:
    case DELETE_NOTE:
    case UPDATE_NOTE:
    case SET_CURRENT:
      return{
        ...state,
        current: action.payload
      }
    case CLEAR_CURRENT:
      return{
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