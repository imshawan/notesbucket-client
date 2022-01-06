import React, { useState, useContext, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {ThemeProvider} from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import AuthContext from '../../context/auth/authContext'
import { lightTheme, Item, Alert } from '../layout/Layout';

const Login = (props) => {
  const authContext = useContext(AuthContext);
  const {
    signin,
    clearErrors,
    error,
    isAuthenticated
  } = authContext

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/")
    }
    if (error === 'User already exsist') {
      //setAlert(error, 'danger');
      clearErrors()
    }
  }, [error, isAuthenticated, props.history])

  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const [open, setOpen] = useState({
    open: false,
    message: '',
    severity: 'error'
  });

  const onChangeUserData = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!user.username) {
      setOpen({...open, open: true, message: "Username cannot be blank", severity: "error"});
      return;
    }
    if (!user.password) {
      setOpen({...open, open: true, message: "Password field cannot be blank", severity: "error"});
      return;
    }
    signin(user);   
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen({...open, open: false});
  };

  return (
    <div style={{width: '45ch', m: 1, display: 'inline-block', marginTop: '20px'}}>

      <ThemeProvider theme={lightTheme}>
      <Item key={18}>
        <h1 style={{paddingTop: '14px', marginBottom: '5px'}}>Login Page</h1>
        <Box onSubmit={onSubmit}
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '42ch' },
        }}
        noValidate
        autoComplete="off">
        <TextField id="outlined-basic 1" type="text"
              name="username"
              value={user.username}
              onChange={onChangeUserData}
              required label="Username" variant="outlined" />
              <br />
        <TextField id="outlined-basic" type="password"
              name="password"
              value={user.password}
              onChange={onChangeUserData}
              required label="Password" variant="outlined" />
            <br />
        <Button type="submit" variant="contained">Sign up</Button>
        </Box>
        </Item>
      </ThemeProvider>

      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open.open} autoHideDuration={5000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={open.severity} sx={{ width: '100%' }}>
            {open.message}
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
};

export default Login;
