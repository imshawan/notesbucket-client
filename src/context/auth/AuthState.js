import React from 'react';
import axios from 'axios';
import authReducer from './authReducer';
import AuthContext from './authContext';
import {} from '../types';
import { useReducer } from 'react/cjs/react.development';

const AuthState = (props) => {
  const initialState = [];
  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider value={{}}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContext;
