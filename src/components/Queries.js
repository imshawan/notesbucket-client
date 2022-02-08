import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Box, TextField, Backdrop, CircularProgress } from '@mui/material';
import { Button, IconButton, useMediaQuery, useTheme } from '@mui/material';
import QueriesContext from '../context/queries/queriesContext';
import { MainAccent } from '../app.config';
import { Alert, Theme } from './layout/Layout';
import { Stack, Snackbar, ThemeProvider } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

const FeedbackModal = () => {
    const queriesContext = useContext(QueriesContext)
    const { sendQuery, status, popup, loading, setQueryLoading, setPopUp } = queriesContext
    const [show, setShow] = useState(false)
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [Message, setMessage] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [alertOpen, setAlertOpen] = useState({
        open: false,
        message: '',
        severity: 'error'
      });
      
    useEffect(() => {
        setShow(popup)
    }, [popup])

    useEffect(() => {
        if (status 
          && Object.keys(status).length === 0
          && Object.getPrototypeOf(status) === Object.prototype) return;
        else {
          if (status.success === true) {
            setAlertOpen({...alertOpen, open: true, severity: "success", message: status.message})
          }
          if (status.success === false) {
            setAlertOpen({...alertOpen, open: true, severity: "error", message: status.message})
          }
          setPopUp(false)
          setMessage({ name: '', email: '', message: '' })
        }
        // eslint-disable-next-line
      }, [status])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setAlertOpen({...alertOpen, open: false});
    };

    const onMessageDataChange = (e) => {
        setMessage({ ...Message, [e.target.name]: e.target.value });
      };

    const onQuerySubmit = (e) => {
        e.preventDefault();
        if (!Message.name) {
            setAlertOpen({...alertOpen, open: true, message: "Name cannot be blank", severity: "error"});
            return;
        }
        if (!Message.email) {
            setAlertOpen({...alertOpen, open: true, message: "Enter an email Id so that we can reach you", severity: "error"});
            return;
        }
        if (!Message.message) {
            setAlertOpen({...alertOpen, open: true, message: "Please write something for us", severity: "error"});
            return;
        }
        setQueryLoading(true)
        sendQuery(Message)
    };

    return(
        <Fragment>
            <ThemeProvider theme={Theme}>
            <Dialog open={show}
            fullScreen={fullScreen}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description">
                <DialogTitle className='p-0' id="scroll-dialog-title">
              <div style={{height: '58px', width: '100%', background: MainAccent, display: 'flex', justifyContent: 'center' }}>
                <span style={{ fontWeight: 600, fontSize: '20px', padding: '14px', color: '#fff'}}>
                Send us your thoughts
                </span>
                <span style={{display: 'flex', right: 0, position: 'absolute', padding: '9px'}}>
                  <IconButton style={{ color: '#fff' }} onClick={() => setPopUp(false)}>
                    <CloseIcon />
                  </IconButton>
                </span>
              </div>
            </DialogTitle>
            <DialogContent className='pt-3' dividers={true}>
            <div className='justify-content-center'>
                    <Box component="form"
                    sx={{
                        '& > :not(style)': { m: 1, marginLeft: '0px', width: '100%' },
                    }}
                    noValidate autoComplete="off">
                        <TextField key={8} id="outlined-basic name" type="text"
                            name="name"
                            value={Message.name}
                            onChange={onMessageDataChange}
                            required label="Your name" variant="outlined" />
                        <TextField key={9} id="outlined-basic email" type="text"
                            name="email"
                            value={Message.email}
                            onChange={onMessageDataChange}
                            required label="Your email" variant="outlined" />
                        <TextField key={10} id="outlined-basic message" type="text"
                            name="message"
                            value={Message.message}
                            multiline
                            rows={6}
                            onChange={onMessageDataChange}
                            required label="Your message" variant="outlined" />
                    </Box>

            </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onQuerySubmit} style={{background: MainAccent,  marginRight: '10px', width: '100px'}} variant="contained" startIcon={<SendIcon />}>
                    Send
                </Button>
            </DialogActions>
        </Dialog>
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={alertOpen.open} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={alertOpen.severity} sx={{ width: '100%' }}>
                {alertOpen.message}
            </Alert>
            </Snackbar>
        </Stack>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}>
            <CircularProgress color="inherit" />
        </Backdrop>
        </ThemeProvider>
    </Fragment>
    )
}

export default FeedbackModal;