import React, { Fragment, useContext, useEffect, useState } from 'react';
import NoteContext from '../../context/notes/notesContext';
import NotesCard from './NotesCard';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import NoteView from './NoteView';
import NoteCreator from './NoteCreator';
import SpeedDial from '@mui/material/SpeedDial';
import AddIcon from '@mui/icons-material/Add';


const Notes = () => {
    const noteContext = useContext(NoteContext);
    const { notes, filtered, getNotes, loading, setAdd, add } = noteContext 

    useEffect(()=>{
        getNotes()
        setAdd(false)
    },[])

    const showNoteCreator = () => {
        if (!add) setAdd(true)
    }

    const sortNotes = (elements) => {
        return elements.sort((a, b) => {
            return new Date(a.updatedAt).getTime() - 
                new Date(b.updatedAt).getTime()
        }).reverse();
    }

    if(notes !== [] && notes.length === 0 && !loading){
        return <h4>No notes found!</h4>
    }
    else{
        return (
            <Fragment>
                {notes !== [] && !loading ?(
                     <div className='row'>
                     {
                         filtered !== null ? filtered.map(note=><NotesCard note={note} key={note._id}/>) 
                         : sortNotes(notes).map(note=><NotesCard note={note} key={note._id} />)
                     }
                     </div>
                 ) : ''}
                <NoteView />
                <NoteCreator />
                <SpeedDial onClick={showNoteCreator}
                ariaLabel="SpeedDial basic example" sx={{ position: 'absolute', bottom: 16, right: 16 }} icon={<AddIcon />} />
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Fragment>
        )
    }  
}

export default Notes