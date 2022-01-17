import {
  EMAIL_SENT_SUCCESS,
  EMAIL_SENT_FAIL,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_STATUS
} from '../types';

const AuthReducer = (state, action) => {
  switch (action.type) {
    case EMAIL_SENT_SUCCESS:
    case EMAIL_SENT_FAIL:
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      }
      case REGISTRATION_SUCCESS:
      case REGISTRATION_FAIL:
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
        localStorage.removeItem('token')
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          user: null,
          status:  { success: action.payload.success, message: action.payload.message }
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