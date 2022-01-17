import React, { useState, useContext, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import AuthContext from '../../context/auth/authContext'
import { lightTheme, Item, Alert } from '../layout/Layout';

const Register = (props) => {
  const authContext = useContext(AuthContext);
  const { verifyEmail, register, clearStatus, status, isAuthenticated } = authContext

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/")
    }
  }, [status, isAuthenticated, props.history])

  useEffect(() => {
    if (status.success === true) {
      setOpsStatus({...statusOps, open: true, severity: "success", text: status.message})
    }
    if (status.success === false) {
      setOpsStatus({...statusOps, open: true, severity: "error", text: status.message})
    }
    clearStatus()
  }, [status])

  const [user, setUser] = useState({
    username: '',
    password: '',
    password_confirm: '',
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
    if (!user.otp) {
      setOpen({...open, open: true, message: "OTP field cannot be blank", severity: "error"});
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
    if (!user.password_confirm) {
      setOpen({...open, open: true, message: "Password confirmation field cannot be blank", severity: "error"});
      return;
    }
    if (!check.check){
      setOpen({...open, open: true, message: "Can't proceed without accepting the terms and conditions", severity: "error"});
      return;
    }
    if (user.password !== user.password_confirm){
      setOpen({...open, open: true, message: "Passwords do not match", severity: "error"});
      return;
    }
    register(user);   
  };

  const onSubmitEmail = (e) => {
    e.preventDefault();
    if (!email.email) {
      setOpen({...open, open: true, message: "Please enter your email to proceed", severity: "error"});
      return;
    }
    verifyEmail(email);
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
        <h1 style={{paddingTop: '14px', marginBottom: '5px'}}>Registration Page</h1>
        <Box onSubmit={onSubmitEmail}
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '42ch' },
          }}
          noValidate
          autoComplete="off">
          <TextField id="outlined-basic" type="text"
            name="email"
            value={email.email}
            onChange={onChangeEmail}
            required label="Email" variant="outlined" />
            <br />
        <Button style={{width: 120, float: 'left', marginLeft: 38}} type="submit" variant="contained">GET OTP</Button>
        </Box>

        <Box onSubmit={onSubmit}
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '42ch' },
        }}
        noValidate
        autoComplete="off">
        <TextField id="outlined-basic" type="text"
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
        <TextField id="outlined-basic" type="password"
              name="password_confirm"
              value={user.password_confirm}
              onChange={onChangeUserData}
              required label="Confirm Password" variant="outlined" />
            <br />
        <TextField id="outlined-basic" type="text"
          name="otp"
          value={user.otp}
          onChange={onChangeUserData}
          required label="OTP" variant="outlined" />
            <br />
            <FormControlLabel style={{textAlign: 'left'}}
            control={
              <Checkbox checked={check.check} onChange={onChangeAccept} name="check" />
            }
            label="I choose to accept all the Terms and Conditions."
          />
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
      <Snackbar open={statusOps.open} autoHideDuration={6000} onClose={() => setOpsStatus({...statusOps, open: false, text: ""})}>
        <Alert onClose={() => setOpsStatus({...statusOps, open: false, text: ""})} severity={statusOps.severity} sx={{ width: '100%' }}>
          {statusOps.text}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Register;
