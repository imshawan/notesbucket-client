import React, { useReducer } from 'react';
import axios from 'axios';
import QueriesContext from './queriesContext';
import QueriesReducer from './queriesReducer';
import {
    RESPONSE_SENT,
    RESPONSE_SENDING_FAILED
} from '../types';

const headers = {
  "Content-Type" : "application/json",
  "accept": "*/*"
}

const QueriesState = (props) => {
  const initialState = {
    status: null,
    loading: true,
    error: null
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


  return (
    <QueriesContext.Provider value={{
        status: state.status,
        loading: state.loading,
        sendQuery
    }}>{props.children}</QueriesContext.Provider>
  );
};
export default QueriesState;
