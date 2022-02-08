import React, { Fragment, useState, useContext, useEffect } from 'react';
import NoteContext from '../../context/notes/notesContext';
import { Alert, Theme, OptionsMenu } from '../layout/Layout';
import TextField from '@mui/material/TextField';
import { Button, ThemeProvider, CircularProgress, IconButton } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
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
// import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { MainAccent } from '../../app.config';

function NoteView() {
    const noteContext = useContext(NoteContext)
    const { note, status, getNotesById, addToFavourites, removeFavourite, 
      current, deleteNotesById, updateNoteById, clearCurrent, SummerNoteOptions, setLoading } = noteContext
    const [open, setOpen] = useState(false)
    const [isSaving, setisSaving] = useState(false)
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

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const submitPayload = (e) => {
      e.preventDefault();
      if (!editing) {
        setEditing(true)
        return;
      }
      if (!noteTitle && !editorContent) return;
      updateNoteById(note._id, {title: noteTitle, content: editorContent})
      setisSaving(true)
    }

    const onDelete = () =>{
      if (!window.confirm("Are you sure to delete this note?")) return;
      deleteNotesById(note._id);
      clearCurrent()
      setOpen(false)
      setLoading(true)
      setAnchorEl(null)
    }

    const closeModal = () => {
      setOpen(false)
      setAnchorEl(null)
      clearCurrent()
    }

    const handleFavourites = (e) => {
      e.preventDefault();
      if (note.favourite) removeFavourite(note._id)
      else addToFavourites(note._id)
      setAnchorEl(null);
    }

    useEffect(() => {
      if (!status) return;
      setisSaving(false)
      if (status.success === true) {
        setOpsStatus({...statusOps, open: true, severity: "success", text: status.message})
      }
      if (status.success === false) {
        setOpsStatus({...statusOps, open: true, severity: "error", text: status.message})
      }
      // eslint-disable-next-line
    }, [status])

    useEffect(()=>{
      if (current){
        getNotesById(current._id)
        clearCurrent()
      }
      // eslint-disable-next-line
    },[current])

    useEffect(() => {
      if (note && note.content) {
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
    if (note) return (
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
                    {editing ? 'Editing note' : 'Viewing note'}
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
                    <span style={{ width: '100%'}}>
                    {editing ? (<TextField style={{width: '100%'}} id="outlined-textarea"
                  label="Title"
                  name="title"
                  onChange={(e) => setNoteTitle(e.target.value)}
                  defaultValue={note.title}
                  InputProps={{
                    className: "notes-input-title"
                }}
                  multiline />) : (<div className='notes-title'>
                    {note.title}
                  </div>)}
                    </span>
              </div>
              <div className='pt-0'>
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
              </div>
              </DialogContent>
              <DialogActions>
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
                    {/* <Divider sx={{ my: 0.5 }} /> */}
                  </OptionsMenu>
                </div>
                <Button variant="contained" style={{ marginRight: '10px', minWidth: '88px' }} startIcon={ isSaving ? '' : modify.icon} onClick={submitPayload}>
                  { isSaving ? <CircularProgress style={{width: '24px', height: '24px', color: '#fff', margin: 'auto'}} /> : modify.text }
                </Button>
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
    else return (<></>)
  }
  

export default NoteView