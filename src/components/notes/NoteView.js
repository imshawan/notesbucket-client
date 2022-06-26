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
import ShareIcon from '@mui/icons-material/Share';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/tooltip';
import 'bootstrap/dist/css/bootstrap.css';
import { Editor } from '@tinymce/tinymce-react';

import MenuItem from '@mui/material/MenuItem';
// import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { MainAccent } from '../../app.config';
import swal from "sweetalert";

function NoteView() {
    const noteContext = useContext(NoteContext)
    const { note, status, getNotesById, addToFavourites, removeFavourite, setShareing,
      current, deleteNotesById, updateNoteById, clearCurrent, TinyEditorOptions, setLoading } = noteContext
    
    const { apiKey, initialConfig } = TinyEditorOptions
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
    const mobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleEditorChange = (e) => {
      setEditorContent(e.target.getContent())
    }

    const submitPayload = (e) => {
      e.preventDefault();
      if (!editing) {
        setEditing(true)
        return;
      }
      if (!noteTitle && !editorContent) {
        setOpsStatus({...statusOps, open: true,
          severity: "info", text: "The note is already saved and updated to it's latest"})
        return;
      }
      updateNoteById(note._id, {title: noteTitle, content: editorContent})
      setisSaving(true)
    }

    const onDelete = () => {
      swal({
        title: "Are you sure?",
        text: "This will delete this document from our servers and the action cannot be undone",
        buttons: true,
        dangerMode: true,
      }).then((value) => {
        if (value) {
          deleteNotesById(note._id)
          clearCurrent()
          setOpen(false)
          setLoading(true)
        }
      })
      setAnchorEl(null)
    }

    const closeModal = () => {
      setOpen(false)
      setAnchorEl(null)
      clearCurrent()
    }

    const closeAlerts = () => {
      setOpsStatus({...statusOps, open: false})
    }

    const handleShare = (value) => {
      setShareing(value)
      setOpen(false)
      setAnchorEl(null)
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
      if (status && status.message.toLowerCase() === 'unauthorized') { return; }
      if (status.success === true) {
        setOpsStatus({...statusOps, open: true, severity: "success", text: status.message})
      }
      if (status.success === false) {
        setOpsStatus({...statusOps, open: true, severity: "error", text: status.message})
      }
      console.log(status)
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
          fullScreen={true}
          fullWidth={true}
          maxWidth={'lg'}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          PaperProps={{
            sx: {
              minHeight: '60vh'
            }
          }}
          >
            <DialogTitle style={{ height: '58px', background: MainAccent, marginTop: '-2px' }} id="scroll-dialog-title">
              <div style={{width: '100%', background: MainAccent, display: 'flex', justifyContent: 'center', marginTop: '-2px' }}>
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
            <DialogContent className='pt-3' dividers={true} style={{ minHeight: '75%' }}>
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
                    <Editor
                      initialValue={note.content}
                      apiKey={apiKey}
                      init={{ ...initialConfig, menubar: !mobile}}
                      onChange={handleEditorChange}
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
                    style={{ marginRight: '10px' }} 
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
                    <MenuItem onClick={() => handleShare(true)} disableRipple>
                      <ShareIcon />
                      Share
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
        <Snackbar open={statusOps.open} autoHideDuration={6000} onClose={closeAlerts}>
          <Alert onClose={closeAlerts} severity={statusOps.severity} sx={{ width: '100%' }}>
            {statusOps.text}
          </Alert>
        </Snackbar>
      </Fragment>
    );
    else return (<></>)
  }
  

export default NoteView