import React, { useState, useContext, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import AuthContext from '../../context/auth/authContext';
import { Button, Link, Typography, Avatar, FormControlLabel, Checkbox } from '@mui/material';
import { Alert, Theme } from '../layout/Layout';
import LockIcon from '@mui/icons-material/Lock';
import { Backdrop, ThemeProvider } from '@mui/material';
import { MainAccent } from '../../app.config';
import Loader from '../layout/Loader';
import signin_svg from '../../assets/images/undraw_remotely.svg';

const Login = (props) => {
  const authContext = useContext(AuthContext);
  const { signin, status, clearStatus, setLoading, loading, isAuthenticated } = authContext

  const [statusOps, setOpsStatus] = useState({open: false, severity: "", text: ""})
  const [user, setUser] = useState({
    username: '',
    password: '',
    remember_me: false,
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
    if (status 
      && Object.keys(status).length === 0
      && Object.getPrototypeOf(status) === Object.prototype) return;
    else {
      if (status.success === true) {
        setOpsStatus({...statusOps, open: true, severity: "success", text: status.message})
      }
      if (status.success === false) {
        setOpsStatus({...statusOps, open: true, severity: "error", text: status.message})
      }
      clearStatus();
    }
    // eslint-disable-next-line
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
    setLoading(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen({...open, open: false});
  };

  return (
    <div className='container' style={{ marginTop: '6rem' }}>
      <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}>
          <Loader />
      </Backdrop>
      <div className='row justify-content-center' style={{marginTop: '7%'}}>
      <ThemeProvider theme={Theme}>
      <div style={{marginLeft: '-15px'}} className="col-md-6 d-none mt-4 d-lg-block d-xl-block">
        <img src={signin_svg} alt="signin" className="img-fluid"
        style={{maxHeight: '400px'}}
         />
      </div>
      <div className="col-md-6">
        <div className="row justify-content-center">
        <div className='col-11 col-md-12 col-lg-9 col-xl-9'>

        <div style={{display: 'flex', justifyContent: 'center', paddingTop: '16px'}}>
        <Avatar style={{backgroundColor: MainAccent, height: '70px', width: '70px'}}>
          <LockIcon style={{height: '40px', width: '40px'}} />
        </Avatar>
        </div>
        <h2 className='main-heading' style={{paddingTop: '14px', marginBottom: '20px'}}>Welcome!</h2>
        <Box onSubmit={onSubmit}
        component="form"
        sx={{
          '& > :not(style)': {  m: 1, marginLeft: '0px', width: '100%' },
        }}
        noValidate
        autoComplete="off">
        <TextField id="outlined-basic 1" type="text"
              name="username"
              value={user.username}
              onChange={onChangeUserData}
              required label="Username or email address" variant="outlined" />
              <br />
        <TextField id="outlined-basic 2" type="password" className='mt-3'
              name="password"
              value={user.password}
              onChange={onChangeUserData}
              required label="Password" variant="outlined" />
            <br />
        <FormControlLabel style={{textAlign: 'left', marginTop: '0px'}}
            control={
              <Checkbox checked={user.remember_me} onChange={(e) => setUser({ ...user, remember_me: e.target.checked }) } name="check" />
            }
            label={
              <div className='form-footer'>
                 <span>Remember me for the next time</span> 
              </div>
            }
          />
        <Button style={{ height: '56px' }} size="large" type="submit" color="primary" variant="contained">Login</Button>
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
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Login;
