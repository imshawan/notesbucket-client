import React, { useState, useContext, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import ProfileContext from '../context/userprofile/profileContext';
import AuthContext from '../context/auth/authContext';
import { Button, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { Alert, Theme } from '../components/layout/Layout';
import { CircularProgress, Backdrop, ThemeProvider } from '@mui/material';
import { MainAccent } from '../app.config';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { InputLabel, MenuItem, Select, FormControl, Tooltip } from '@mui/material';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import Countries from '../utils/countries';

const Profile = () => {
  const profileContext = useContext(ProfileContext);
  const authContext = useContext(AuthContext);
  const { status, loading, profile_open, setProfilePopup, profile, setLoading,
    getUserProfile, upateUserProfile, upateUserData } = profileContext
  const { updateUser } = authContext

  const [statusOps, setOpsStatus] = useState({open: false, severity: "", text: ""})
  const [button, setButton] = useState({btn1: false, btn2: false})
  const [UserData, setUserData] = useState({
    firstname: '',
    lastname: '',
    gender: '',
    country: '',
    dob: '',
    role: ''
  });

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    getUserProfile()
    // eslint-disable-next-line
  },[])

  useEffect(() => {
      setUserData({...UserData, ...profile})
      // eslint-disable-next-line
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
    // eslint-disable-next-line
  }, [status])

  const handleButtons = (btn) => {
    setButton({...button, [btn] : true})
  }

  const onChangeUserData = (e) => {
    setUserData({ ...UserData, [e.target.name]: e.target.value });
  };

  const closeProfile = () => {
    setButton({...button, btn1: false, btn2: false})
    setProfilePopup(false)
  }

  const onSubmitPersonal = (e) => {
    e.preventDefault();
    upateUserData({
      firstname: UserData.firstname,
      lastname: UserData.lastname,
    })
    setLoading(true)
    setButton({...button, btn1: false})
    updateUser({
      firstname: UserData.firstname,
      lastname: UserData.lastname,
      username: UserData.username
    })
  };

  const onSubmiBasic = (e) => {
    e.preventDefault();
    upateUserProfile({
      gender: UserData.gender,
      country: UserData.country,
      dob: UserData.dob,
      role: UserData.role
    })
    setLoading(true)
    setButton({...button, btn2: false})
  };

  const convert = (dateTimeString) => {
    return JSON.stringify(new Date(dateTimeString)).slice(1,11)
  }

  const countries = Countries.map(({ name }, index) => {
    return (
    <MenuItem key={index} value={name}>
      {name}
    </MenuItem>
    )})

  return (
    <div className='container'>
      <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}>
          <CircularProgress color="inherit" />
      </Backdrop>
      <ThemeProvider theme={Theme}>
          <div className='row justify-content-center'>
          <Dialog open={profile_open}
          fullScreen={fullScreen}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description">
            <DialogTitle className='p-0' id="scroll-dialog-title">
              <div style={{height: '58px', width: '100%', background: MainAccent, display: 'flex', justifyContent: 'center' }}>
                <span style={{ fontWeight: 600, fontSize: '20px', padding: '14px', color: '#fff'}}>
                    Profile information
                </span>
                <span style={{display: 'flex', right: 0, position: 'absolute', padding: '9px'}}>
                  <IconButton style={{ color: '#fff' }} onClick={closeProfile}>
                    <CloseIcon />
                  </IconButton>
                </span>
              </div>
            </DialogTitle>
            <DialogContent className='pt-3' dividers={true}>
                  <div style={{display: 'flex'}}>
                    <h5 className='mb-2' style={{paddingTop: '14px', fontWeight: 600 }}>Personal details</h5>
                    <span>
                    {!button.btn1 ? (<Tooltip title="Edit" placement="bottom" arrow>
                      <IconButton onClick={() => handleButtons('btn1')}>
                        <EditIcon style={{ height: '15px', width: '15px'}} />
                      </IconButton>
                    </ Tooltip>) : ''}
                    </span>
                  </div>
                    <Box onSubmit={onSubmitPersonal}
                    component="form" sx={{'& > :not(style)': {  m: 1, marginLeft: '0px', width: '100%' }}}
                    noValidate
                    autoComplete="off">
                        <div className='row justify-content-center'>
                            <div className='col-12 col-md-6'>
                                <TextField className="input-fields" id="outlined-basic 1" type="text"
                                    style={{ width: '100%', marginBottom: '10px'}}
                                    name="firstname"
                                    value={UserData.firstname}
                                    onChange={onChangeUserData}
                                    disabled={!button.btn1}
                                    label="Firstname" variant="outlined" />
                            </div>
                            <div className='col-12 col-md-6'>
                            <TextField className="input-fields" id="outlined-basic 2" type="text"
                                style={{ width: '100%'}}
                                name="lastname"
                                value={UserData.lastname}
                                onChange={onChangeUserData}
                                disabled={!button.btn1}
                                label="Lastname" variant="outlined" />
                            </div>
                        </div>
                        <div className='row justify-content-center'>
                            <div className='col-12'>
                              <TextField className="input-fields" id="outlined-basic 2" type="text"
                                  style={{ width: '100%'}}
                                  name="email"
                                  value={UserData.email}
                                  onChange={onChangeUserData}
                                  disabled
                                  label="Email" variant="outlined" />
                            </div>
                        </div>
                        {button.btn1 ? (<div className='row'>
                          <Button className='mt-2' style={{background: MainAccent,  marginLeft: '16px', width: '100px'}} type="submit" variant="contained">
                              Save
                          </Button>
                        </div>) : ''}
                    </Box>
                    <div style={{display: 'flex'}}>
                      <h5 className='mb-2' style={{paddingTop: '14px', fontWeight: 600 }}>Other details</h5>
                      <span>
                      {!button.btn2 ? (<Tooltip title="Edit" placement="top" arrow>
                        <IconButton onClick={() => handleButtons('btn2')} >
                          <EditIcon style={{ height: '15px', width: '15px'}} />
                        </IconButton>
                      </ Tooltip>) : ''}
                      </span>
                    </div>
                    <Box onSubmit={onSubmiBasic}
                    component="form" sx={{'& > :not(style)': {  m: 1, marginLeft: '0px', width: '100%' }}}
                    noValidate
                    autoComplete="off">
                        <div className='row justify-content-center'>
                            <div className='col-12'>
                                <TextField className="input-fields"
                                  id="dob"
                                  name="dob"
                                  label="Birthday"
                                  type="date"
                                  defaultValue={convert(UserData.dob)}
                                  disabled={!button.btn2}
                                  onChange={onChangeUserData}
                                  sx={{ width: '100%', marginBottom: '10px' }}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                />
                            </div>
                        </div>
                        <div className='row justify-content-center'>
                            <div className='col-12 mb-2 col-md-6'>
                              <TextField className="input-fields" id="outlined-basic 2" type="text"
                                  style={{ width: '100%'}}
                                  name="role"
                                  value={UserData.role}
                                  onChange={onChangeUserData}
                                  disabled={!button.btn2}
                                  label="Role" variant="outlined" />
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
                                    disabled={!button.btn2}
                                    onChange={onChangeUserData}
                                  >
                                    <MenuItem value={'Male'}>Male</MenuItem>
                                    <MenuItem value={'Female'}>Female</MenuItem>
                                    <MenuItem value={'Others'}>Others</MenuItem>
                                  </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className='row' >
                          <div className='col-12'>
                                <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Country</InputLabel>
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name="country"
                                    value={UserData.country}
                                    label="Country"
                                    disabled={!button.btn2}
                                    onChange={onChangeUserData}
                                  >
                                    {countries}
                                  </Select>
                                </FormControl>
                            </div>
                        </div>
                        {button.btn2 ? (<div className='row'>
                          <Button className='mt-2' style={{background: MainAccent,  marginLeft: '16px', width: '100px'}} type="submit" variant="contained">
                              Save
                          </Button>
                        </div>) : ''}
                    </Box>


                </DialogContent>
            </Dialog>
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
