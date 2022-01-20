import React, { useState, useContext, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {ThemeProvider} from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import AuthContext from '../../context/auth/authContext';
import { Button, Link, Typography, Avatar } from '@mui/material';
import { lightTheme, Item, Alert } from '../layout/Layout';
import LockIcon from '@mui/icons-material/Lock';

const Login = (props) => {
  const authContext = useContext(AuthContext);
  const { signin, status, clearStatus, isAuthenticated } = authContext

  const [statusOps, setOpsStatus] = useState({open: false, severity: "", text: ""})
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const [open, setOpen] = useState({
    open: false,
    message: '',
    severity: 'error'
  });

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/")
    }
  }, [status, isAuthenticated, props.history])

  useEffect(() => {
    if (!status) return;
    else {
      if (status.success === true) {
        setOpsStatus({...statusOps, open: true, severity: "success", text: status.message})
      }
      if (status.success === false) {
        setOpsStatus({...statusOps, open: true, severity: "error", text: status.message})
      }
      clearStatus();
    }
  }, [status])

  

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
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-11 col-md-8 col-lg-6 col-xl-5' style={{marginTop: '20px'}}>

        <div style={{display: 'flex', justifyContent: 'center', paddingTop: '16px'}}>
        <Avatar style={{background: 'blue', height: '70px', width: '70px'}}>
          <LockIcon style={{height: '40px', width: '40px'}} />
        </Avatar>
        </div>
        <h2 className='main-heading' style={{paddingTop: '14px', marginBottom: '25px'}}>Sign In</h2>
        <Box onSubmit={onSubmit}
        component="form"
        sx={{
          '& > :not(style)': {  m: 1, marginLeft: '0px', width: '100%' },
        }}
        noValidate
        autoComplete="off">
        <TextField id="outlined-basic 1" type="text"
              style={{marginBottom: '20px'}}
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
        <Button style={{marginTop: '30px', height: '56px', background: 'blue'}} size="large" type="submit" color="primary" variant="contained">Login</Button>
        </Box>
        <div style={{marginTop: '10px', fontSize: '0.9rem!important'}}>
          <Typography>
              <Link href="/forgotPassword" underline="hover">
                {'Forgot password?'}
              </Link>
          </Typography>
          <Typography>
            Not registered? &nbsp;
            <Link href="/register" underline="hover">
              {'Create an account!'}
            </Link>
          </Typography>
        </div>

      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open.open} autoHideDuration={5000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={open.severity} sx={{ width: '100%' }}>
            {open.message}
          </Alert>
        </Snackbar>
      </Stack>
      <Snackbar open={statusOps.open} autoHideDuration={6000} onClose={() => setOpsStatus({...statusOps, open: false})}>
        <Alert onClose={() => setOpsStatus({...statusOps, open: false})} severity={statusOps.severity} sx={{ width: '100%' }}>
          {statusOps.text}
        </Alert>
      </Snackbar>
        </div>
      </div>
    </div>
  );
};

export default Login;
