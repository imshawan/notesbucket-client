import {
  EMAIL_SENT_SUCCESS,
  EMAIL_SENT_FAIL,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_LOADING,
  UPDATE_USER,
  LOGOUT,
  CLEAR_STATUS
} from '../types';

const AuthReducer = (state, action) => {
  switch (action.type) {
    case EMAIL_SENT_SUCCESS:
      return {
        ...state,
        loading: false,
        status: { success: action.payload.success, message: action.payload.message }
      }
    case EMAIL_SENT_FAIL:
      return {
        ...state,
        loading: false,
        status: { success: false, 
          message: action.payload.message ? action.payload.message : action.payload }
      }
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      }
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload
      }
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: false,
        loading: false,
        user: null,
        status: { success: action.payload.success, message: action.payload.message },
        events: {...state.events, registration: "success"}
      }
    case REGISTRATION_FAIL:
      return {
        ...state,
        loading: false,
        status: { success: false, message: action.payload.message ? action.payload.message : action.payload }
      }
    case PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: false,
        loading: false,
        user: null,
        status: { success: action.payload.success, message: action.payload.message },
        events: {...state.events, passwordReset: "success"}
      }
    case PASSWORD_RESET_FAIL:
      return {
        ...state,
        loading: false,
        status: { success: false, message: action.payload.message ? action.payload.message : action.payload }
      }
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        ...action.payload,
          isAuthenticated: true,
          loading: false
      }
    case AUTH_ERROR:
      localStorage.clear()
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        status: { success: false, message: action.payload }
      }
    case LOGIN_FAIL:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        status: { success: false, message: action.payload }
      }
    case LOGOUT:
      localStorage.clear()
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        status:  { success: true, message: "Logged out successfully" }
      }
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    case CLEAR_STATUS:
      return {
        ...state,
        status: {}
      }
    default:
      return state;
  }
};

export default AuthReducer;