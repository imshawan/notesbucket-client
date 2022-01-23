import React, { useReducer } from 'react';
import axios from 'axios';
import QueriesContext from './queriesContext';
import QueriesReducer from './queriesReducer';
import {
    RESPONSE_SENT,
    RESPONSE_SENDING_FAILED,
    SET_QUERY_LOADING,
    SET_OPEN
} from '../types';

const headers = {
  "Content-Type" : "application/json",
  "accept": "*/*"
}

const QueriesState = (props) => {
  const initialState = {
    status: {},
    loading: false,
    popup: false
}
  const [state, dispatch] = useReducer(QueriesReducer, initialState);

  const sendQuery = async (payload) =>{
    state.loading = true
    axios.request({
        url: `${process.env.REACT_APP_PROD_URL}/api/queries`,
        method: 'POST',
        data: payload,
        headers: headers
      }).then((resp) => {
        dispatch({ type: RESPONSE_SENT, payload: resp.data })
      })
      .catch(err => dispatch({ type: RESPONSE_SENDING_FAILED, payload: err.response.data }))
  }

  const setPopUp = (value) => {
    dispatch({type: SET_OPEN, payload: value})
  }

  const setQueryLoading = (value) => {
    dispatch({ type: SET_QUERY_LOADING, payload: value })
  }

  return (
    <QueriesContext.Provider value={{
        status: state.status,
        loading: state.loading,
        popup: state.popup,
        setQueryLoading,
        sendQuery,
        setPopUp
    }}>{props.children}</QueriesContext.Provider>
  );
};
export default QueriesState;
