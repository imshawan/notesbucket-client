import React, { useState, useContext, useEffect } from 'react'
import { Box, TextField } from '@mui/material';
import { Button, Link, Typography, Avatar, ThemeProvider } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import AuthContext from '../../context/auth/authContext'
import { Alert, Theme } from '../layout/Layout';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { CircularProgress, Backdrop } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { MainAccent } from '../../app.config';
import { ValidateEmail } from '../../utils/validators';
import Loader from '../layout/Loader';

const Register = (props) => {
  const authContext = useContext(AuthContext);
  const { verifyEmail, register, clearStatus, loading, setLoading, events, status, isAuthenticated } = authContext
  
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    otp: '',
  });
  const [statusOps, setOpsStatus] = useState({open: false, severity: "", text: ""})
  const [email, setEmail] = useState({
    email: ''
  });
  const [check, setCheck] = useState({
    check: false
  });
  const [open, setOpen] = useState({
    open: false,
    message: '',
    severity: 'error'
  });

  const [otpOpen, setotpOpen] = useState({open: false, showTimer: false, disabled: false});
  const [Type, setType] = useState(false);
  const [PopUp, setPopUp] = useState('');

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
    // eslint-disable-next-line
  }, [status])

  useEffect(() => {
    if (!events.registration) return;
    if (events.registration === "success") {
      setPopUp("registered");
      setType(true);
    }
  }, [events.registration])

  useEffect(() => {
    if (otpOpen.showTimer) {
      document.getElementById('timer').innerHTML = "04:59";
      startTimer();
    }
    // eslint-disable-next-line
  }, [otpOpen.showTimer])

  const handleClickOpen = (popup) => () => {
    setPopUp(popup);
    setType(true);
  };

  const onChangeUserData = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onChangeEmail = (e) => {
    setEmail({ ...email, [e.target.name]: e.target.value });
  };
  const onChangeAccept = (e) => {
    setCheck({ ...check, [e.target.name]: e.target.checked });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!user.firstname) {
      setOpen({...open, open: true, message: "Firstname cannot be blank", severity: "error"});
      return;
    }
    if (!user.lastname) {
      setOpen({...open, open: true, message: "Lastname cannot be blank", severity: "error"});
      return;
    }
    if (!user.username) {
      setOpen({...open, open: true, message: "Username cannot be blank", severity: "error"});
      return;
    }
    if (!user.password) {
      setOpen({...open, open: true, message: "Password field cannot be blank", severity: "error"});
      return;
    }
    if (!user.otp) {
      setOpen({...open, open: true, message: "Verification code is required", severity: "error"});
      return;
    }
    if (!check.check){
      setOpen({...open, open: true, message: "Can't proceed without accepting the terms and conditions", severity: "error"});
      return;
    }
    user.email = email.email;
    user.acceptedTerms = check.check;
    register(user);  
    setLoading(true) 
  };

  const onSubmitEmail = (e) => {
    e.preventDefault();
    if (!email.email) {
      setOpen({...open, open: true, message: "Please enter your email to proceed", severity: "error"});
      return;
    }
    if (!ValidateEmail(email.email)) {
      setOpen({...open, open: true, message: "Not a valid email, please enter a valid email to proceed", severity: "error"});
      return;
    }
    verifyEmail(email);
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
      var m = timeArray[0];
      if (m === '0' && timeArray[1] === '0')
      {
        setotpOpen(elem => { return {...elem, ...{showTimer: false}}})
        document.getElementById("timer").style.color = "red";
        return;
      }
      var s = checkSecond((timeArray[1] - 1));
      if(s === '59'){m = m-1}
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
    <div className='container' style={{ marginTop: '4rem' }}>
      <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}>
          <Loader />
      </Backdrop>
      <div className='row justify-content-center'>
        <ThemeProvider theme={Theme}>
        <div className='col-11 col-md-8 col-lg-6 col-xl-5' style={{marginTop: '20px'}}>

          <div className='justify-content-center' style={{display: 'flex', paddingTop: '16px'}}>
            <Avatar style={{ height: '70px', width: '70px', backgroundColor: MainAccent}}>
              <HowToRegIcon style={{height: '40px', width: '40px'}} />
            </Avatar>
            </div>
            <h2 className='main-heading' style={{paddingTop: '14px', marginBottom: '20px'}}>Create Account</h2>
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
                  {endAdornment: <Button id="timer" disabled={otpOpen.disabled} type="submit">
                    {otpOpen.open ? <CircularProgress style={{height: '22px', width: '22px' }} /> : 'Verify'}
                    </Button>}
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
            {otpOpen.showTimer ? (<TextField id="outlined-basic otp" type="text"
              name="otp"
              value={user.otp}
              onChange={onChangeUserData}
              required label="Verification code" variant="outlined" />) : ''}
            <div className='row'>
            <TextField style={{maxWidth: '49%'}} className='col-12 col-md-6 mb-3 firstname-lastname' id="outlined-basic firstname" type="text"
              name="firstname"
              value={user.firstname}
              onChange={onChangeUserData}
              required label="Firstname" variant="outlined" />
            <TextField style={{maxWidth: '49%', marginLeft: '8px'}} className='col-12 col-md-6 firstname-lastname' id="outlined-basic lastname" type="text"
              name="lastname"
              value={user.lastname}
              onChange={onChangeUserData}
              required label="Lastname" variant="outlined" />
            </div>
            <TextField id="outlined-basic username" type="text"
              name="username"
              value={user.username}
              onChange={onChangeUserData}
              required label="Create Username" variant="outlined" />
            <TextField id="outlined-basic password" type="password"
              name="password"
              value={user.password}
              onChange={onChangeUserData}
              required label="Create Password" variant="outlined" />
                <br />
            
                <FormControlLabel style={{textAlign: 'left'}}
                control={
                  <Checkbox checked={check.check} onChange={onChangeAccept} name="check" />
                }
                label={
                  <div className='form-footer'>
                    <span>I hereby confirm that I've read the </span> 
                    <Link><span onClick={handleClickOpen("privacy")}>Privacy Policy</span></Link>
                    <span> and choose to accept all the </span>
                    <Link><span onClick={handleClickOpen("t-and-c")}>Terms and Conditions.</span></Link>
                  </div>
                }
              />
              <br />
            <Button style={{ marginTop: '10px', height: '56px' }} type="submit" size="large" color="primary" variant="contained">Sign up</Button>
            </Box>
            <div style={{marginTop: '10px', marginBottom: '40px'}}>
              <Typography>
                Already registered? &nbsp;
                <Link href="/login" underline="hover">
                  {'Log in here!'}
                </Link>
              </Typography>
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
        <DialogTitle id="scroll-dialog-title">{PopUp === 'privacy' ? 'Privacy Policy' : (PopUp === 'registered' ? 'Registration Successful!' : 'Terms and Conditions')}</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            tabIndex={-1}
          >
           {PopUp === 'privacy' ? 'Some Privacy Policy text' : (PopUp === 'registered' ? (
             <div style={{textAlign: 'center'}}>
              <div className='justify-content-center' style={{display: 'flex', marginBottom: '25px'}}>
                <CheckCircleIcon style={{color: 'green', fontSize: '7rem'}} />
              </div>
              <div>
                You have successfully registered for NotesBucket.
                <br /> Please proceed to the login page to login and continue.
              </div>
            </div>
           ) : 'Some Terms and Conditions text')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setType(false)}>{PopUp === 'registered' ? (
            <Typography>
              <Link style={{ color: '#fff' }} href="/login" underline="none">
                {'Continue to login'}
              </Link>
            </Typography>
          ) : 'CLOSE'}</Button>
        </DialogActions>
      </Dialog>
      </ThemeProvider>
      </div>
    </div>
  );
};

export default Register;
