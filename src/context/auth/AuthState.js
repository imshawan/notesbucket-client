import React, {useReducer} from 'react';
import axios from 'axios';
import authReducer from './authReducer';
import AuthContext from './authContext';
import {} from '../types';

const headers = {
  'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Mobile Safari/537.36',
  'Content-Type' : 'application/json'
}

//Email Verification API Call
const verifyEmail = async (payload) =>{
  try {
      const response = await axios.post('/api/account/getOtp', payload, { headers: headers })
      dispatch({ type:EMAIL_VERIFICATION_SUCCESS, payload: response.data })
      //loadUser()
  } catch (err) {
      dispatch({ type:EMAIL_VERIFICATION_FAIL,payload:err.response.data.msg })
      
  }
}

const AuthState = (props) => {
  const initialState = [];
  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider value={{}}>{props.children}</AuthContext.Provider>
  );
};

export default AuthState;
