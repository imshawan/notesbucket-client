import React, { Fragment, useState, useContext, useEffect } from 'react';
import NoteContext from '../../context/notes/notesContext';
import { Alert, Theme } from '../layout/Layout';
import TextField from '@mui/material/TextField';
import { Button, ThemeProvider, CircularProgress, IconButton } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import PublicIcon from '@mui/icons-material/Public';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CloseIcon from '@mui/icons-material/Close';
import { MainAccent } from '../../app.config';

function NoteView(props) {
    const noteContext = useContext(NoteContext)
    const { note, status, clearCurrent, shared_content, setShareing, shareNote, sharing } = noteContext

    const [currentNote, setCurrentNote] = useState({})
    const [isSharing, setIsSharing] = useState(false)
    const [statusOps, setOpsStatus] = useState({open: false, severity: "", text: ""})
    const [editing, setEditing] = useState(false)
    const [modify, setModify] = useState({text: "GENERATE LINK", icon: <PublicIcon />})

    const submitPayload = (e) => {
      e.preventDefault();
      if (currentNote.access_token) shareNote(currentNote._id, {enableSharing: false})
      else shareNote(currentNote._id, {enableSharing: true})
      setEditing(true)
    }

    const closeModal = () => {
        setShareing(false)
        clearCurrent()
    }

    const copyToClipboard = () => {
        /* Get the text field */
        var textField = document.getElementById("link");
        textField.select();
        textField.setSelectionRange(0, 99999); /* For mobile devices */

        /* Copy the text inside the text field */
        navigator.clipboard.writeText(textField.value);
        setOpsStatus({...statusOps, open: true, severity: "success", text: "Link copied to clipboard"})
        // window.open(currentNote.access_token);
    }

    useEffect(() => {
        if (note && note.content) {
        setCurrentNote({...note, 
            access_token: note.access_token ? `${window.location.protocol}//${window.location.host}/shared/${note.access_token}` : ''
        })
        }
        if (currentNote.token) setIsSharing(true)
        else setIsSharing(false)
        // eslint-disable-next-line
      }, [note])

    useEffect(() => {
      if (!status) return;
      if (status.success === true) {
          setOpsStatus({...statusOps, open: true, severity: "success", text: status.message})
      }
      if (status.success === false) {
        setOpsStatus({...statusOps, open: true, severity: "error", text: status.message})
      }
      setEditing(false)
      // eslint-disable-next-line
    }, [status])

    useEffect(() => {
        if (shared_content.token) {
            setCurrentNote({ ...currentNote, access_token: `${window.location.protocol}//${window.location.host}/shared/${shared_content.token}` })
          }
      else {
          setCurrentNote({ ...currentNote, access_token: '' })
      }
      // eslint-disable-next-line
    }, [shared_content])

    useEffect(() => {
      if (currentNote.access_token) {
        setModify({text: "REMOVE", icon: <RemoveCircleIcon />})
      }
      else {
        setModify({text: "GENERATE LINK", icon: <PublicIcon />})
      }
    }, [currentNote.access_token])


    return (
      <Fragment>
        <ThemeProvider theme={Theme}>
          <Dialog open={sharing}
          fullWidth={true}
          maxWidth={'md'}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          >
            <DialogTitle style={{ height: '58px', background: MainAccent, marginTop: '-2px' }} id="scroll-dialog-title">
              <div style={{width: '100%', background: MainAccent, display: 'flex', justifyContent: 'center' }}>
                <span style={{ fontWeight: 600, fontSize: '20px', color: '#fff'}}>
                    Share note
                </span>
                <span style={{display: 'flex', right: 0, position: 'absolute', marginRight: '10px', marginTop: '-4px'}}>
                  <IconButton style={{ color: '#fff' }} onClick={closeModal}>
                    <CloseIcon />
                  </IconButton>
                </span>
              </div>
            </DialogTitle>
            <DialogContent className='pt-3' dividers={true}>
              <div className='pb-2' style={{minHeigt: '64px', width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <span style={{ width: '100%', fontWeight: 600}}>
                    {currentNote.title}
                    </span>
              </div>
              <div className='pt-0'>
                <p style={{ overflow: 'auto' }}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="link"
                    label="Sharable link"
                    type="text"
                    defaultValue={currentNote.access_token}
                    value={currentNote.access_token}
                    fullWidth
                    variant="standard"/>
              </p>
              </div>
              </DialogContent>
              <DialogActions>
                <Button variant="contained" style={{ marginRight: !currentNote.access_token ? '10px' : '5px', minWidth: '88px' }} startIcon={ isSharing || editing ? '' : modify.icon} onClick={submitPayload}>
                  { editing ? <CircularProgress style={{width: '24px', height: '24px', color: '#fff', margin: 'auto'}} /> : modify.text }
                </Button>
                {currentNote.access_token ? (<Button variant="contained" style={{ marginRight: '10px', minWidth: '88px' }} startIcon={<ContentCopyIcon />} onClick={copyToClipboard}>
                  COPY URL
                </Button>) : ''}
              </DialogActions>
          </Dialog>
        </ ThemeProvider>
        <Snackbar open={statusOps.open} autoHideDuration={6000} onClose={() => setOpsStatus({...statusOps, open: false})}>
          <Alert onClose={() => setOpsStatus({...statusOps, open: false})} severity={statusOps.severity} sx={{ width: '100%' }}>
            {statusOps.text}
          </Alert>
        </Snackbar>
      </Fragment>
    );
  }
  

export default NoteView