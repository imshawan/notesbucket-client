import React, { Fragment, useState, useContext, useEffect } from 'react';
import NoteContext from '../../context/notes/notesContext';
import { Modal } from 'react-bootstrap';
import { Alert, Theme } from '../layout/Layout';
import TextField from '@mui/material/TextField';
import { Button, Tooltip, ThemeProvider } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/tooltip';
import 'bootstrap/dist/css/bootstrap.css';
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css'; // import styles
import { MainAccent } from '../../app.config';

function NoteView() {
    const noteContext = useContext(NoteContext)
    const { note, status, getNotesById, addToFavourites, removeFavourite, 
      current, deleteNotesById, updateNoteById, clearCurrent, SummerNoteOptions } = noteContext
    const [open, setOpen] = useState(false)
    const [statusOps, setOpsStatus] = useState({open: false, severity: "", text: ""})
    const [editing, setEditing] = useState(false)
    const [modify, setModify] = useState({text: "EDIT", icon: <EditIcon />})
    const [noteTitle, setNoteTitle] = useState("")
    const [editorContent, setEditorContent] = useState("")

    const submitPayload = (e) => {
      e.preventDefault();
      if (!noteTitle && !editorContent) return;
      updateNoteById(note._id, {title: noteTitle, content: editorContent})
      setOpen(false)
    }

    const onDelete = () =>{
      if (!window.confirm("Are you sure to delete this note?")) return;
      deleteNotesById(note._id);
      clearCurrent()
      setOpen(false)
    }

    const handleFavourites = (e) => {
      e.preventDefault();
      if (note.favourite) removeFavourite(note._id)
      else addToFavourites(note._id)
    }

    useEffect(() => {
      if (!status) return;
      if (status.success === true) {
        setOpsStatus({...statusOps, open: true, severity: "success", text: status.message})
      }
      if (status.success === false) {
        setOpsStatus({...statusOps, open: true, severity: "error", text: status.message})
      }
    }, [status])

    useEffect(()=>{
      if (current){
        getNotesById(current._id)
        clearCurrent()
      }
    },[current])

    useEffect(() => {
      if (note.content) {
      setEditing(false)
      setOpen(true)
      }
    }, [note])

    useEffect(() => {
      if (editing) {
        setModify({text: "SAVE", icon: <SaveIcon />})
      }
      else {
        setModify({text: "EDIT", icon: <EditIcon />})
        setNoteTitle("")
        setEditorContent("")
      }
    }, [editing])

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
          <Modal.Header style={{padding: '1.3rem 2rem'}}>
            <Modal.Title style={{width: '100%', marginTop: '10px'}} id="contained-modal-title-vcenter">
              {editing ? (<TextField style={{width: '100%'}} id="outlined-textarea"
              label="Title"
              name="title"
              onChange={(e) => setNoteTitle(e.target.value)}
              defaultValue={note.title}
              InputProps={{
                className: "notes-title"
            }}
              multiline />) : (note.title)}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{padding: '1rem 1.8rem'}}>
            {editing ? (
                <ReactSummernote
                  onInit={() => {document.querySelector(".note-editable").innerHTML = note.content}}
                  options={SummerNoteOptions}
                  onChange={(editorText) => setEditorContent(editorText)}
                />
            ) : (
              <p dangerouslySetInnerHTML={{ __html: note.content }}></p>
            )}
          
          </Modal.Body>
          <Modal.Footer>
            <Tooltip title={note.favourite ? "Remove favourite" : "Add favourite" } placement="top">
              <Button style={{ marginLeft: '25px', left: 0, position: 'absolute', maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}
              onClick={handleFavourites}>
                {note.favourite ? <FavoriteIcon /> :<FavoriteBorderIcon />}
              </Button>
            </Tooltip>
            <Button variant="contained" style={{ marginRight: '10px' }} startIcon={<DeleteIcon />} onClick={() => onDelete()}>
              DELETE
            </Button>
            <Button variant="contained" style={{ marginRight: '10px' }} type={!editing ? 'submit' : ''} startIcon={modify.icon} onClick={() => setEditing(true)}>
              {modify.text}
            </Button>
            <Button variant="contained" style={{ marginRight: '16px' }} startIcon={<CloseIcon />} onClick={() => setOpen(false)}>
              CLOSE
            </Button>
          </Modal.Footer>
        </form>
        </ ThemeProvider>
      </Modal>
        <Snackbar open={statusOps.open} autoHideDuration={6000} onClose={() => setOpsStatus({...statusOps, open: false})}>
          <Alert onClose={() => setOpsStatus({...statusOps, open: false})} severity={statusOps.severity} sx={{ width: '100%' }}>
            {statusOps.text}
          </Alert>
        </Snackbar>
      </Fragment>
    );
  }
  

export default NoteView