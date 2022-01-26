import React, { useState, useContext, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Link, Typography, Avatar, ThemeProvider } from '@mui/material';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import AuthContext from '../../context/auth/authContext'
import { Alert, Theme } from '../layout/Layout';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { CircularProgress, Backdrop } from '@mui/material';
import { MainAccent } from '../../app.config';

const ForgotPassword = (props) => {
  const authContext = useContext(AuthContext);
  const { sendForgotPasswordMail, resetPassword, loading, setLoading, clearStatus, events, status, isAuthenticated } = authContext
  
  const [user, setUser] = useState({
    password: '',
    password_confirm: '',
    otp: '',
  });
  const [statusOps, setOpsStatus] = useState({open: false, severity: "", text: ""})
  const [email, setEmail] = useState({
    email: ''
  });
  const [open, setOpen] = useState({
    open: false,
    message: '',
    severity: 'error'
  });

  const [otpOpen, setotpOpen] = useState({open: false, showTimer: false, disabled: false});
  const [Type, setType] = useState(false);

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
      if (otpOpen) setotpOpen({...otpOpen, open: false})
      if (status.success === true) {
        if (status.message.includes('OTP')) { setotpOpen(elem => {return {...elem, ...{open: false, showTimer: true, disabled: true}}});  }
        setOpsStatus({...statusOps, open: true, severity: "success", text: status.message})
      }
      if (status.success === false) {
        setOpsStatus({...statusOps, open: true, severity: "error", text: status.message})
      }
      clearStatus()
    }
  }, [status])

  useEffect(() => {
    if (!events.passwordReset) return;
    if (events.passwordReset === "success") {
      setType(true);
    }
  }, [events.passwordReset])

  useEffect(() => {
    if (otpOpen.showTimer) {
      document.getElementById('timer').innerHTML = "05:00";
      startTimer();
    }
  }, [otpOpen.showTimer])

  const onChangeUserData = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onChangeEmail = (e) => {
    setEmail({ ...email, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email.email) {
      setOpen({...open, open: true, message: "Please enter your registered email Id to proceed", severity: "error"});
      return;
    }
    if (!user.password) {
      setOpen({...open, open: true, message: "Password field cannot be blank", severity: "error"});
      return;
    }
    if (!user.password_confirm) {
      setOpen({...open, open: true, message: "Confirm your password to continue", severity: "error"});
      return;
    }
    if (user.password !== user.password_confirm) {
      setOpen({...open, open: true, message: "Passwords do not match", severity: "error"});
      return;
    }
    if (!user.otp) {
      setOpen({...open, open: true, message: "Verification code is required", severity: "error"});
      return;
    }
    user.email = email.email;
    resetPassword(user);   
    setLoading(true)
  };

  const onSubmitEmail = (e) => {
    e.preventDefault();
    if (!email.email) {
      setOpen({...open, open: true, message: "Please enter your registered email Id to proceed", severity: "error"});
      return;
    }
    sendForgotPasswordMail(email);
    setotpOpen({...otpOpen, open: true});
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen({...open, open: false});
  };

  function startTimer () {
    try {
      var presentTime = document.getElementById("timer").innerHTML;
      var timeArray = presentTime.split((/[:]+/));
      var m = parseInt(timeArray[0]);
      if (m === 0 && parseInt(timeArray[1]) === 0)
      {
        setotpOpen(elem => { return {...elem, ...{showTimer: false}}})
        document.getElementById("timer").style.color = "red";
        return;
      }
      var s = checkSecond((timeArray[1] - 1));
      if(s === 59){m = m-1}
      if(m<0){
        return
      }
      document.getElementById("timer").innerHTML = m + ":" + s
      setTimeout(startTimer, 1000);
    }
  catch (err) {
    return;
  }
    
  }
  const checkSecond = (sec) => {
    if (sec < 10 && sec >= 0) {sec = "0" + sec};
    if (sec < 0) {sec = "59"};
    return sec;
  }

  return (
    <div className='container'>
      <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}>
          <CircularProgress color="inherit" />
      </Backdrop>
      <div className='row justify-content-center'>
      <ThemeProvider theme={Theme}>
        <div className='col-11 col-md-8 col-lg-6 col-xl-5' style={{marginTop: '20px'}}>

          <div className='justify-content-center' style={{display: 'flex', paddingTop: '16px'}}>
            <Avatar style={{backgroundColor: MainAccent, height: '70px', width: '70px'}}>
              <LockResetIcon style={{height: '40px', width: '40px', marginRight: '2px'}} />
            </Avatar>
            </div>
            <h2 className='main-heading' style={{paddingTop: '14px', marginBottom: '35px'}}>Forgot Password</h2>
            <Box onSubmit={onSubmitEmail}
              component="form"
              sx={{
                '& > :not(style)': { m: 1, marginLeft: '0px', width: '100%' },
              }}
              noValidate
              autoComplete="off">
              <TextField key={8} id="outlined-basic email" type="text"
                name="email"
                value={email.email}
                onChange={onChangeEmail}
                disabled={otpOpen.disabled}
                InputProps={
                  {endAdornment: <Button id="timer" disabled={otpOpen.disabled} type="submit">{otpOpen.open ? <CircularProgress style={{height: '22px', width: '22px' }} /> : 'Verify'}</Button>}
                }
                required label="Email" variant="outlined" />
                <br />
            </Box>

            <Box onSubmit={onSubmit}
            component="form"
            sx={{
              '& > :not(style)': { m: 1, marginLeft: '0px', width: '100%' },
            }}
            noValidate
            autoComplete="off">

            <TextField id="outlined-basic otp" type="text"
              name="otp"
              value={user.otp}
              onChange={onChangeUserData}
              required label="Verification code" variant="outlined" />
                <br />
            <TextField id="outlined-basic password" type="text"
              name="password"
              value={user.password}
              onChange={onChangeUserData}
              required label="Create Password" variant="outlined" />
            <TextField id="outlined-basic password_confirm" type="text"
              name="password_confirm"
              value={user.password_confirm}
              onChange={onChangeUserData}
              required label="Confirm Password" variant="outlined" />
                <br />
            <Button style={{ marginTop: '30px', height: '56px' }} type="submit" size="large" color="primary" variant="contained">Change Password</Button>
            </Box>
            <div style={{marginTop: '10px', marginBottom: '40px'}}>
              <Typography>
                <Link href="/" underline="hover">
                  {'Back to home'}
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
        <Dialog
        open={Type}
        onClose={() => setType(false)}
        scroll='paper'
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Password reset successful</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            tabIndex={-1}
          >
           <div style={{textAlign: 'center'}}>
              <div className='justify-content-center' style={{display: 'flex', marginBottom: '25px'}}>
                <CheckCircleIcon style={{color: 'green', fontSize: '7rem'}} />
              </div>
              <div>
                You have successfully changed your NotesBucket account password.
                <br /> Please proceed to the login page to login and continue.
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setType(false)}>
            <Typography>
                <Link href="/login" underline="none">
                  {'Continue to login'}
                </Link>
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
      </ThemeProvider>
      </div>
    </div>
  );
};

export default ForgotPassword;
