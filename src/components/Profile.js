import React, { useState, useContext, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import ProfileContext from '../context/userprofile/profileContext';
import AuthContext from '../context/auth/authContext';
import { Button, IconButton, Typography, Avatar } from '@mui/material';
import { Alert, Theme } from '../components/layout/Layout';
import { Modal } from 'react-bootstrap';
import { CircularProgress, Backdrop, ThemeProvider } from '@mui/material';
import { MainAccent } from '../app.config';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import { InputLabel, MenuItem, Select, FormControl } from '@mui/material';

const Profile = (props) => {
  const profileContext = useContext(ProfileContext);
  const authContext = useContext(AuthContext);
  const { status, loading, profile_open, setProfilePopup, profile, getUserProfile, upateUserProfile, upateUserData } = profileContext
  const { loadUser } = authContext

  const [statusOps, setOpsStatus] = useState({open: false, severity: "", text: ""})
  const [UserData, setUserData] = useState({
    firstname: '',
    lastname: '',
    gender: '',
    country: '',
    dob: '',
    role: ''
  });

  useEffect(() => {
    getUserProfile()
    // eslint-disable-next-line
  },[])

  useEffect(() => {
      console.log(profile)
      setUserData({...UserData, ...profile})
  }, [profile])

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
    }
  }, [status])

  

  const onChangeUserData = (e) => {
    setUserData({ ...UserData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(UserData)
  };

  const convert = (dateTimeString) => {
    return JSON.stringify(new Date(dateTimeString)).slice(1,11)
  }

  return (
    <div className='container'>
      <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}>
          <CircularProgress color="inherit" />
      </Backdrop>
      <ThemeProvider theme={Theme}>
          <div className='row justify-content-center'>
            <Modal show={profile_open}
            onHide={() => setProfilePopup(false)}
            size="l" centered backdrop="static" keyboard={false}>
              <div style={{display: 'flex', right: 0, position: 'absolute', padding: '16px'}}>
                <IconButton onClick={() => setProfilePopup(false)}>
                  <CloseIcon />
                </IconButton>
              </div>
                <div style={{padding: '1rem 1.8rem'}}>
                    <div style={{ paddingTop: '16px', display: 'flex'}} className='justify-content-center'>
                        <Avatar style={{backgroundColor: MainAccent, height: '70px', width: '70px'}}>
                            <AccountCircleIcon style={{height: '40px', width: '40px'}} />
                        </Avatar>
                    </div>
                    <div style={{ paddingTop: '16px', display: 'flex'}} className='justify-content-center'>
                      <span style={{ fontWeight: 600}}>{`@${UserData.username}`}</span>
                    </div>
                  </div>
                <Modal.Body style={{padding: '1rem 1.8rem', paddingBottom: '2rem', paddingTop: '0px'}}>
                    <h4 style={{paddingTop: '14px', marginBottom: '25px', fontWeight: 600 }}>Personal details</h4>
                    <Box onSubmit={onSubmit}
                    component="form" sx={{'& > :not(style)': {  m: 1, marginLeft: '0px', width: '100%' }}}
                    noValidate
                    autoComplete="off">
                        <div className='row justify-content-center'>
                            <div className='col-12 col-md-6'>
                                <TextField id="outlined-basic 1" type="text"
                                    style={{ width: '100%', marginBottom: '10px'}}
                                    name="firstname"
                                    value={UserData.firstname}
                                    onChange={onChangeUserData}
                                    required label="Firstname" variant="outlined" />
                            </div>
                            <div className='col-12 col-md-6'>
                            <TextField id="outlined-basic 2" type="text"
                                style={{ width: '100%'}}
                                name="lastname"
                                value={UserData.lastname}
                                onChange={onChangeUserData}
                                required label="Lastname" variant="outlined" />
                            </div>
                        </div>
                        <div className='row justify-content-center'>
                            <div className='col-12'>
                              <TextField id="outlined-basic 2" type="text"
                                  style={{ width: '100%'}}
                                  name="email"
                                  value={UserData.email}
                                  onChange={onChangeUserData}
                                  required label="Email" variant="outlined" />
                            </div>
                        </div>
                        <div className='row'>
                          <Button className='mt-2' style={{background: MainAccent,  marginLeft: '16px', width: '100px'}} type="submit" variant="contained">
                              Save
                          </Button>
                        </div>
                    </Box>
                    <h4 style={{paddingTop: '14px', marginBottom: '25px', fontWeight: 600 }}>Other details</h4>
                    <Box onSubmit={onSubmit}
                    component="form" sx={{'& > :not(style)': {  m: 1, marginLeft: '0px', width: '100%' }}}
                    noValidate
                    autoComplete="off">
                        <div className='row justify-content-center'>
                            <div className='col-12'>
                                <TextField
                                  id="dob"
                                  name="dob"
                                  label="Birthday"
                                  type="date"
                                  defaultValue={convert(UserData.dob)}
                                  onChange={onChangeUserData}
                                  sx={{ width: '100%' }}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                />
                            </div>
                        </div>
                        <div className='row justify-content-center'>
                            <div className='col-12 mb-2 col-md-6'>
                              <TextField id="outlined-basic 2" type="text"
                                  style={{ width: '100%'}}
                                  name="role"
                                  value={UserData.role}
                                  onChange={onChangeUserData}
                                  required label="Role" variant="outlined" />
                            </div>
                            <div className='col-12 col-md-6'>
                              <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name="gender"
                                    value={UserData.gender}
                                    label="Gender"
                                    onChange={onChangeUserData}
                                  >
                                    <MenuItem value={'Male'}>Male</MenuItem>
                                    <MenuItem value={'Female'}>Female</MenuItem>
                                    <MenuItem value={'Others'}>Others</MenuItem>
                                  </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className='row'>
                          <Button className='mt-2' style={{background: MainAccent,  marginLeft: '16px', width: '100px'}} type="submit" variant="contained">
                              Save
                          </Button>
                        </div>
                    </Box>


                </Modal.Body>
            </Modal>
            </div>
        </ThemeProvider>
        <Snackbar open={statusOps.open} autoHideDuration={6000} onClose={() => setOpsStatus({...statusOps, open: false})}>
            <Alert onClose={() => setOpsStatus({...statusOps, open: false})} severity={statusOps.severity} sx={{ width: '100%' }}>
            {statusOps.text}
            </Alert>
        </Snackbar>
    </div>
  );
};

export default Profile;
