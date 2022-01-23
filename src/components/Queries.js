import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Box, TextField, Backdrop, CircularProgress } from '@mui/material';
import { Modal } from 'react-bootstrap';
import Button from '@mui/material/Button';
import QueriesContext from '../context/queries/queriesContext';
import { MainAccent } from '../app.config';
import { Alert } from './layout/Layout';
import { Stack, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

const FeedbackModal = () => {
    const queriesContext = useContext(QueriesContext)
    const { sendQuery, status, popup, loading, setQueryLoading, setPopUp } = queriesContext
    const [show, setShow] = useState(false)
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
        <Modal
            show={show}
            onHide={() => setPopUp(false)}
            size="l"
            centered
            backdrop="static"
            keyboard={false}
            >
            <Modal.Header style={{padding: '1rem 1.8rem'}}>
                <Modal.Title style={{width: '100%', marginTop: '10px', fontWeight: 600, fontSize: '2rem'}} id="contained-modal-title-vcenter">
                    Send us your thoughts
                </Modal.Title>
            </Modal.Header>
            <div className='justify-content-center'>
                <Modal.Body style={{padding: '1rem 1.8rem'}}>
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
                </Modal.Body>
            </div>
            <Modal.Footer>
                <Button onClick={onQuerySubmit} style={{background: MainAccent,  marginRight: '10px', width: '100px'}} variant="contained" startIcon={<SendIcon />}>
                    Send
                </Button>
                <Button onClick={() => setPopUp(false)} style={{background: MainAccent,  marginRight: '18px', width: '100px'}} 
                variant="contained" startIcon={<CloseIcon />}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
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
    </Fragment>
    )
}

export default FeedbackModal;