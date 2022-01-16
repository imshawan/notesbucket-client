import React, { useState, useContext, useEffect } from 'react';
import NoteContext from '../../context/notes/notesContext';
import { Modal } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/tooltip';
import 'bootstrap/dist/css/bootstrap.css';
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css'; // import styles

function NoteView() {
    const noteContext = useContext(NoteContext)
    const { note, getNotesById, current, deleteNotesById, updateNoteById, clearCurrent, SummerNoteOptions } = noteContext
    const [open, setOpen] = useState(false)
    const [editing, setEditing] = useState(false)
    const [modify, setModify] = useState({text: "EDIT", icon: <EditIcon />})
    const [notePayload, setNotePayload] = useState({
      title: "",
      content: ""
    })

    const payloadOnChange = (e) => {
      setNotePayload({ ...notePayload, [e.target.name]: e.target.value });
    };

    const submitPayload = (e) => {
      e.preventDefault();
      console.log(notePayload)
      if (!notePayload.title && !notePayload.content) return;
      updateNoteById(note._id, notePayload)
      setOpen(false)
    }

    const onDelete = () =>{
      if (!window.confirm("Are you sure to delete this note?")) return;
      deleteNotesById(note._id);
      clearCurrent()
      setOpen(false)
    }

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
        setNotePayload({
          title: "",
          content: ""
        })
      }
    }, [editing])

    return (
      <Modal show={open}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard={false}
      >
        <form onSubmit={submitPayload}>
          <Modal.Header style={{padding: '1.3rem 2rem'}}>
            <Modal.Title style={{width: '100%', marginTop: '10px'}} id="contained-modal-title-vcenter">
              {editing ? (<TextField style={{width: '100%'}} id="outlined-textarea"
              label="Title"
              name="title"
              onChange={payloadOnChange}
              defaultValue={note.title}
              InputProps={{
                className: "notes-title"
            }}
              multiline />) : (note.title)}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{padding: '1rem 1.8rem'}}>
            {editing ? (
            //   <TextField
            //   id="outlined-multiline-static"
            //   label="Content"
            //   name="content"
            //   onChange={payloadOnChange}
            //   style={{width: '100%', height: '100%'}}
            //   multiline
            //   InputProps={{
            //     className: "notes-creator-textarea"
            // }}
            //   defaultValue={note.content} />

                <ReactSummernote
                  onInit={() => {document.querySelector(".note-editable").innerHTML = note.content}}
                  options={SummerNoteOptions}
                  onChange={(editorText) => setNotePayload({content: editorText})}
                />
            ) : (
              <p dangerouslySetInnerHTML={{ __html: note.content }}></p>
            )}
          
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outlined" style={{ marginRight: '10px' }} startIcon={<DeleteIcon />} onClick={() => onDelete()}>DELETE</Button>
            <Button variant="outlined" style={{ marginRight: '10px' }} type={!editing ? 'submit' : ''} startIcon={modify.icon} onClick={() => setEditing(true)}>{modify.text}</Button>
            <Button variant="outlined" style={{ marginRight: '16px' }} startIcon={<CloseIcon />} onClick={() => setOpen(false)}>CLOSE</Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
  

export default NoteView