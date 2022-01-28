import React, { useReducer } from 'react';
import axios from 'axios';
import ProfileContext from './profileContext';
import ProfileReducer from './profileReducer';
import {
    PROFILE_LOADED,
    PROFILE_UPDATED,
    PROFILE_OPS_FAILED,
    SET_PROFILE_OPEN
} from '../types';

const headers = {
  "Content-Type" : "application/json",
  "accept": "*/*"
}

const ProfileState = (props) => {
  const initialState = {
    profile: {},
    status: {},
    loading: false,
    profile_open: false
}
  const [state, dispatch] = useReducer(ProfileReducer, initialState);

  const getUserProfile = async () =>{
    state.loading = true
    axios.request({
        url: `${process.env.REACT_APP_PROD_URL}/api/user/profile`,
        method: 'GET',
        data: {},
        headers: headers
      }).then((resp) => {
        dispatch({ type: PROFILE_LOADED, payload: resp.data })
      })
      .catch(err => dispatch({
          type: PROFILE_OPS_FAILED,
          payload: err.response ? err.response.data.message : err.message
      }))
  }

  const upateUserProfile = async (payload) =>{
    state.loading = true
    axios.request({
        url: `${process.env.REACT_APP_PROD_URL}/api/user/profile`,
        method: 'PUT',
        data: payload,
        headers: headers
      }).then((resp) => {
        dispatch({ type: PROFILE_UPDATED, payload: resp.data })
      })
      .catch(err => dispatch({
        type: PROFILE_OPS_FAILED,
        payload: err.response ? err.response.data.message : err.message
    }))
  }

  const upateUserData = async (payload) =>{
    state.loading = true
    axios.request({
        url: `${process.env.REACT_APP_PROD_URL}/api/user`,
        method: 'PUT',
        data: payload,
        headers: headers
      }).then((resp) => {
        dispatch({ type: PROFILE_UPDATED, payload: resp.data })
      })
      .catch(err => dispatch({
        type: PROFILE_OPS_FAILED,
        payload: err.response ? err.response.data.message : err.message
    }))
  }

  const setProfilePopup = (value) => {
    dispatch({type: SET_PROFILE_OPEN, payload: value})
  }
  

  return (
    <ProfileContext.Provider value={{
        profile: state.profile,
        status: state.status,
        loading: state.loading,
        profile_open: state.profile_open,
        upateUserProfile,
        setProfilePopup,
        getUserProfile,
        upateUserData
    }}>{props.children}</ProfileContext.Provider>
  );
};
export default ProfileState;
