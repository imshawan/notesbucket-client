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
    case FILTER_NOTES:
    case CLEAR_FILTER:
    case NOTE_ERROR:
    case CLEAR_NOTES:
    default:
      return state;
  }
};

export default NotesReducer;