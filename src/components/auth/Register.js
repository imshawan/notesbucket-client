import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Alerts from '../layout/Alerts';

const lightTheme = createTheme({ palette: { mode: 'light' } });
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  height: 550,
  lineHeight: '60px',
  borderRadius: '15px'
}));

const Register = () => {
  const [user, setUser] = useState({
    username: '',
    password: '',
    otp: '',
  });
  const [email, setEmail] = useState({
    email: ''
  });
  const [check, setCheck] = useState({
    check: false
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
    console.log(email);
    console.log(user);
    console.log(check);
  };

  const onSubmitEmail = (e) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <div style={{width: '45ch', m: 1, display: 'inline-block', marginTop: '20px'}}>
      <ThemeProvider theme={lightTheme}>
      <Item key={18} elevation={18}>
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
    </div>
  );
};

export default Register;
