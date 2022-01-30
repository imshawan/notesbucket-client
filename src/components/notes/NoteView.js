import React, { Fragment, useState, useContext, useEffect } from 'react';
import NoteContext from '../../context/notes/notesContext';
import { Modal } from 'react-bootstrap';
import { Alert, Theme, OptionsMenu } from '../layout/Layout';
import TextField from '@mui/material/TextField';
import { Button, ThemeProvider } from '@mui/material';
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

import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function NoteView() {
    const noteContext = useContext(NoteContext)
    const { note, status, getNotesById, addToFavourites, removeFavourite, 
      current, deleteNotesById, updateNoteById, clearCurrent, SummerNoteOptions } = noteContext
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const menu = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const [statusOps, setOpsStatus] = useState({open: false, severity: "", text: ""})
    const [editing, setEditing] = useState(false)
    const [modify, setModify] = useState({text: "EDIT", icon: <EditIcon />})
    const [noteTitle, setNoteTitle] = useState("")
    const [editorContent, setEditorContent] = useState("")

    const submitPayload = (e) => {
      e.preventDefault();
      if (!noteTitle && !editorContent) return;
      updateNoteById(note._id, {title: noteTitle, content: editorContent})
    }

    const onDelete = () =>{
      if (!window.confirm("Are you sure to delete this note?")) return;
      deleteNotesById(note._id);
      clearCurrent()
      setOpen(false)
      setAnchorEl(null);
    }

    const closeModal = () => {
      setOpen(false)
      setAnchorEl(null);
    }

    const handleFavourites = (e) => {
      e.preventDefault();
      if (note.favourite) removeFavourite(note._id)
      else addToFavourites(note._id)
      setAnchorEl(null);
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
        fullscreen
      >
        <ThemeProvider theme={Theme}>
        <form onSubmit={submitPayload}>
          <div className='mb-1' style={{height: '64px', width: '100%', display: 'flex', justifyContent: 'center' }}>
                <span style={{ width: '100%', fontWeight: 600, fontSize: '20px', padding: '16px'}}>
                {editing ? (<TextField style={{width: '100%'}} id="outlined-textarea"
              label="Title"
              name="title"
              onChange={(e) => setNoteTitle(e.target.value)}
              defaultValue={note.title}
              InputProps={{
                className: "notes-title"
            }}
              multiline />) : (<div className='notes-title'>
                {note.title}
              </div>)}
                </span>
          </div>
          <Modal.Body>
            <p style={{ overflow: 'auto' }}>
            {editing ? (
                <ReactSummernote
                  onInit={() => {
                    document.querySelector(".note-editable").innerHTML = note.content
                  }}
                  options={SummerNoteOptions}
                  onChange={(editorText) => setEditorContent(editorText)}
                />
            ) : (
              <p dangerouslySetInnerHTML={{ __html: note.content }}></p>
            )}
          </p>
          </Modal.Body>
          <Modal.Footer>
            <div>
              <Button
                id="demo-customized-button"
                aria-controls={menu ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={menu ? 'true' : undefined}
                variant="contained"
                disableElevation
                style={{ marginRight: '6px' }} 
                endIcon={<KeyboardArrowDownIcon />}
                onClick={handleClick}> 
                Options
              </Button>
              <OptionsMenu
                id="demo-customized-menu"
                MenuListProps={{
                  'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={menu}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={handleFavourites} disableRipple>
                {note.favourite ? <FavoriteIcon /> :<FavoriteBorderIcon />}
                {note.favourite ? "Remove favourite" : "Add favourite" }
                </MenuItem>
                <MenuItem onClick={() => onDelete()} disableRipple>
                  <DeleteIcon />
                  Delete
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={closeModal} disableRipple>
                  <CloseIcon />
                  {editing ? 'Discard' : 'Close'}
                </MenuItem>
              </OptionsMenu>
            </div>
            <Button variant="contained" style={{ marginRight: '10px' }} type={!editing ? 'submit' : ''} startIcon={modify.icon} onClick={() => setEditing(true)}>
              {modify.text}
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