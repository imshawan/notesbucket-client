import React, { useState, useContext, useEffect } from 'react';
import NoteContext from '../../context/notes/notesContext';
import { Modal } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import CloseIcon from '@mui/icons-material/Close';
import { Alert } from '../layout/Layout';
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
    const { createNote, add, setAdd, SummerNoteOptions } = noteContext
    const [open, setOpen] = useState(false)
    const [notePayload, setNotePayload] = useState({
      title: "",
      content: ""
    })
    const [alert, setAlert] = useState({
        open: false,
        message: '',
        severity: 'error'
      });
    
    const payloadOnChange = (e) => {
        setNotePayload({ ...notePayload, [e.target.name]: e.target.value });
    };
    
    const submitPayload = (e) => {
        e.preventDefault();
        if (!notePayload.title) {
            setAlert({...alert, open: true, message: "Title cannot be blank", severity: "error"});
            return;
        }
        if (!notePayload.content) {
            setAlert({...alert, open: true, message: "Content cannot be blank", severity: "error"});
            return;
        }
        createNote(notePayload)
        setOpen(false)
    }
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setAlert({...alert, open: false});
      };

    useEffect(() => {
        if (add) setOpen(true)
    }, [add])

    useEffect(() => {
        if (!open) {
            setAdd(false)
            setNotePayload({
                title: "",
                content: ""
              })
        }
    }, [open])

    return (
      <Modal show={open}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard={false}
      >
        <form onSubmit={submitPayload}>
          <Modal.Header style={{padding: '1rem 1.8rem'}}>
            <Modal.Title style={{width: '100%', marginTop: '10px'}} id="contained-modal-title-vcenter">
              <TextField style={{width: '100%'}} id="outlined-textarea"
                    label="Title"
                    name="title"
                    onChange={payloadOnChange}
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
                      onChange={(editorText) => setNotePayload({content: editorText})}
                    />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outlined" style={{ marginRight: '10px' }} type="submit" startIcon={<NoteAddIcon />}>CREATE</Button>
            <Button variant="outlined" style={{ marginRight: '16px' }} startIcon={<CloseIcon />} onClick={() => setOpen(false)}>DISCARD</Button>
          </Modal.Footer>
        </form>
        <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={alert.open} autoHideDuration={5000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={alert.severity} sx={{ width: '100%' }}>
            {alert.message}
          </Alert>
        </Snackbar>
      </Stack>
      </Modal>
    );
  }
  

export default NoteCreator