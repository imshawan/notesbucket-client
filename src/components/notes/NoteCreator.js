import React, { Fragment, useState, useContext, useEffect } from 'react';
import NoteContext from '../../context/notes/notesContext';
import { Modal } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import { Button, ThemeProvider } from '@mui/material/';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Theme } from '../layout/Layout';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/tooltip';
import 'bootstrap/dist/css/bootstrap.css';
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css'; // import styles


function NoteCreator() {
    const noteContext = useContext(NoteContext)
    const { createNote, status, add, setAdd, SummerNoteOptions } = noteContext
    const [open, setOpen] = useState(false)
    const [statusOps, setOpsStatus] = useState({open: false, text: ""})
    const [noteTitle, setNoteTitle] = useState("")
    const [editorContent, setEditorContent] = useState("")
    const [alert, setAlert] = useState({
        open: false,
        message: '',
        severity: 'error'
      });
    
    const submitPayload = (e) => {
        e.preventDefault();
        if (!noteTitle && !editorContent) {
          setAlert({...alert, open: true, message: "Note's body is empty. Cannot create a note without content", severity: "error"});
          return;
        }
        if (!noteTitle) {
            setAlert({...alert, open: true, message: "Title cannot be blank", severity: "error"});
            return;
        }
        if (!editorContent) {
            setAlert({...alert, open: true, message: "Content cannot be blank", severity: "error"});
            return;
        }
        createNote({title: noteTitle, content: editorContent})
        setOpen(false)
    }
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setAlert({...alert, open: false});
      };

    useEffect(() => {
      if (!status) return;
      if (status.success === true) {
        setOpsStatus({...statusOps, open: true, severity: "success", text: status.message})
      }
      if (status.success === false) {
        setOpsStatus({...statusOps, open: true, severity: "error", text: status.message})
      }
    }, [status])
    
    useEffect(() => {
        if (add) setOpen(true)
    }, [add])

    useEffect(() => {
        if (!open) {
          setAdd(false)
          setNoteTitle("")
          setEditorContent("")
        }
    }, [open])

    return (
      <Fragment>
      <Modal show={open}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard={false}
      >
        <ThemeProvider theme={Theme}>
        <form onSubmit={submitPayload}>
          <Modal.Header style={{padding: '1rem 1.8rem'}}>
            <Modal.Title style={{width: '100%', marginTop: '10px'}} id="contained-modal-title-vcenter">
              <TextField style={{width: '100%'}} id="outlined-textarea"
                    label="Title"
                    name="title"
                    onChange={(e) => setNoteTitle(e.target.value)}
                    placeholder='Title of your note'
                    InputProps={{
                        className: "notes-title"
                    }}
                    multiline />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{padding: '1rem 1.8rem'}}>
              <ReactSummernote
                options={SummerNoteOptions}
                onChange={(editorText) => setEditorContent(editorText)}
              />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="contained" style={{ marginRight: '10px' }} type="submit" startIcon={<NoteAddIcon />}>CREATE</Button>
            <Button variant="contained" style={{ marginRight: '16px' }} startIcon={<CloseIcon />} onClick={() => setOpen(false)}>DISCARD</Button>
          </Modal.Footer>
        </form>
        </ThemeProvider>
        <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={alert.open} autoHideDuration={5000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={alert.severity} sx={{ width: '100%' }}>
            {alert.message}
          </Alert>
        </Snackbar>
      </Stack>
      </Modal>
        <Snackbar open={statusOps.open} autoHideDuration={6000} onClose={() => setOpsStatus({open: false})}>
          <Alert onClose={() => setOpsStatus({open: false})} severity={statusOps.severity} sx={{ width: '100%' }}>
            {statusOps.text}
          </Alert>
        </Snackbar>
      </Fragment>
    );
  }
  

export default NoteCreator