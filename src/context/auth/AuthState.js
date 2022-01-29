import React, {useReducer} from 'react';
import axios from 'axios';
import authReducer from './authReducer';
import AuthContext from './authContext';
import setAuthToken from '../../utils/setAuthToken';
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
  UPDATE_USER,
  LOGOUT,
  SET_LOADING,
  CLEAR_STATUS
} from '../types';

const headers = {
  "Content-Type" : "application/json",
  "accept": "*/*"
}

const AuthState = (props) => {
  let Token = localStorage.getItem('token');
  const initialState = {
    token: Token,
    isAuthenticated: Token ? true : false,
    loading: false,
    user: null,
    status: {},
    events: {
      registration: null,
      passwordReset: null,
      passwordChange: null
    }
  }
  const [state, dispatch] = useReducer(authReducer, initialState);

  //Email Verification API Call
  const verifyEmail = async (payload) =>{
    axios.request({
        url: `${process.env.REACT_APP_PROD_URL}/api/account/getOtp`,
        method: 'POST',
        data: payload,
        headers: headers
      }).then((resp) => {
        dispatch({ type: EMAIL_SENT_SUCCESS, payload: resp.data })
      })
      .catch(err => dispatch({
        type: EMAIL_SENT_FAIL,
        payload: err.response ? err.response.data : err.message
      }))
  }

  const loadUser = async () => {
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }
    axios.request({
      url: `${process.env.REACT_APP_PROD_URL}/api/user`,
      method: 'GET',
      data: {},
      headers: headers
    }).then((resp) => {
      dispatch({ type: USER_LOADED, payload: resp.data.user })
    })
    .catch(err => dispatch({
      type: AUTH_ERROR,
      payload: err.response ? `${err.response.data}. Token mismatched or has been expired` : err.message
    }))
  }

  const register = async (formData) =>{
    axios.request({
      url: `${process.env.REACT_APP_PROD_URL}/api/user/signup`,
      method: 'POST',
      data: formData,
      headers: headers
    }).then((resp) => {
      dispatch({ type: REGISTRATION_SUCCESS, payload: resp.data })
    })
    .catch(err => dispatch({
      type: REGISTRATION_FAIL,
      payload: err.response ? err.response.data : err.message
    }))
  }

  const signin = async(formData) =>{
    axios.request({
      url: `${process.env.REACT_APP_PROD_URL}/api/user/signin`,
      method: 'POST',
      data: formData,
      headers: headers
    }).then((resp) => {
      dispatch({ type: LOGIN_SUCCESS, payload: resp.data })
      loadUser()
    })
    .catch(err => dispatch({
      type: LOGIN_FAIL,
      payload: err.response ? `${err.response.data}. Incorrect username or password` : err.message
    }))
  }

  const sendForgotPasswordMail = async (payload) =>{
    axios.request({
        url: `${process.env.REACT_APP_PROD_URL}/api/account/forgotPassword`,
        method: 'POST',
        data: payload,
        headers: headers
      }).then((resp) => {
        dispatch({ type: EMAIL_SENT_SUCCESS, payload: resp.data })
      })
      .catch(err => dispatch({
        type: EMAIL_SENT_FAIL,
        payload: err.response ? err.response.data : err.message
      }))
  }

  const resetPassword = async (payload) =>{
    axios.request({
        url: `${process.env.REACT_APP_PROD_URL}/api/account/resetPassword`,
        method: 'POST',
        data: payload,
        headers: headers
      }).then((resp) => {
        dispatch({ type: PASSWORD_RESET_SUCCESS, payload: resp.data })
      })
      .catch(err => dispatch({
        type: PASSWORD_RESET_FAIL,
        payload: err.response ? err.response.data : err.message
      }))
  }

  const logout = () =>{
      dispatch({ type: LOGOUT })
  }

  const setLoading = (value) => {
    dispatch({type: SET_LOADING, payload: value})
  }

  const clearStatus = () => {
      dispatch({ type: CLEAR_STATUS })
  }

  const updateUser = (userData) => {
    dispatch({ type: UPDATE_USER, payload: userData})
  }

  return (
    <AuthContext.Provider value={
      {
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        status: state.status,
        user: state.user,
        events: state.events,
        sendForgotPasswordMail,
        resetPassword,
        verifyEmail,
        updateUser,
        register,
        clearStatus,
        setLoading,
        loadUser,
        signin,
        logout
    }
    }>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
