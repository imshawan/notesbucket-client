import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import NoteContext from '../../context/notes/notesContext';
import { TextField, IconButton } from '@mui/material';
import { Button, ThemeProvider, useMediaQuery, useTheme } from '@mui/material/';
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
import { MainAccent } from '../../app.config';


function NoteCreator() {
    const noteContext = useContext(NoteContext)
    const { createNote, status, add, setAdd, SummerNoteOptions, setLoading } = noteContext
    const [open, setOpen] = useState(false)
    const [statusOps, setOpsStatus] = useState({open: false, text: ""})
    const [noteTitle, setNoteTitle] = useState("")
    const [editorContent, setEditorContent] = useState("")
    const [alert, setAlert] = useState({
        open: false,
        message: '',
        severity: 'error'
      });
      
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
        setLoading(true)
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
      // eslint-disable-next-line
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
        // eslint-disable-next-line
    }, [open])

    return (
      <Fragment>
        <ThemeProvider theme={Theme}>
      <Dialog open={open}
          fullScreen={fullScreen}
          fullWidth={true}
          maxWidth={'md'}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          >
        <DialogTitle style={{ height: '58px', background: MainAccent, marginTop: '-2px' }} id="scroll-dialog-title">
        <div style={{width: '100%', background: MainAccent, display: 'flex', justifyContent: 'center' }}>
          <span style={{ fontWeight: 600, fontSize: '20px', color: '#fff'}}>
              Create note
          </span>
          <span style={{display: 'flex', right: 0, position: 'absolute', marginRight: '10px', marginTop: '-4px'}}>
            <IconButton style={{ color: '#fff' }} onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </span>
        </div>
        </DialogTitle>
        <DialogContent className='pt-3' dividers={true}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <span className='pt-1 pb-2' style={{ width: '100%', fontWeight: 600, fontSize: '20px', color: '#fff'}}>
              <TextField style={{width: '100%'}} id="outlined-textarea"
                  label="Title"
                  name="title"
                  onChange={(e) => setNoteTitle(e.target.value)}
                  placeholder='Title of your note'
                  InputProps={{
                      className: "notes-input-title"
                  }}
                  multiline />
            </span>
          </div>
          <ReactSummernote
            options={SummerNoteOptions}
            onChange={(editorText) => setEditorContent(editorText)}/>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" style={{ marginRight: '16px' }} startIcon={<CloseIcon />} onClick={() => setOpen(false)}>DISCARD</Button>
          <Button variant="contained" style={{ marginRight: '10px' }} onClick={submitPayload} startIcon={<NoteAddIcon />}>CREATE</Button>
        </DialogActions>
      </Dialog>
      </ThemeProvider>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={alert.open} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={alert.severity} sx={{ width: '100%' }}>
              {alert.message}
            </Alert>
          </Snackbar>
        </Stack>
      
        <Snackbar open={statusOps.open} autoHideDuration={6000} onClose={() => setOpsStatus({open: false})}>
          <Alert onClose={() => setOpsStatus({open: false})} severity={statusOps.severity} sx={{ width: '100%' }}>
            {statusOps.text}
          </Alert>
        </Snackbar>
      </Fragment>
    );
  }
  

export default NoteCreator