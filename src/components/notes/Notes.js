import React, { Fragment, useContext, useEffect } from 'react';
import NoteContext from '../../context/notes/notesContext';
import NotesCard from './NotesCard';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import NoteView from './NoteView';
import NoteCreator from './NoteCreator';
import SpeedDial from '@mui/material/SpeedDial';
import AddIcon from '@mui/icons-material/Add';
import setAuthToken from '../../utils/setAuthToken'
import no_note from '../../assets/images/note.png';


const Notes = () => {
    const noteContext = useContext(NoteContext);
    const { notes, searched, getNotes, loading, setAdd, add } = noteContext 
    
    useEffect(()=>{
        if (localStorage.token){
            setAuthToken(localStorage.token)
          }
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

    return (
        <Fragment>
            {notes && notes.length !== 0 && !loading ?(
                    <div className='row'>
                    {
                        searched ? (
                            <Fragment>
                                {searched.length !== 0 ? (searched.map(note=><NotesCard note={note} key={note._id}/>)) : (
                                    <h3 style={{margin: 'auto'}}>Nothing found</h3>
                                )}
                            </Fragment>
                        ) 
                        : sortNotes(notes).map(note=><NotesCard note={note} key={note._id} />)
                    }
                    </div>
                ) : (
                    <div style={{height: '80vh'}} className='row justify-content-center'>
                        <div className='no-note-img' style={{margin: 'auto'}}>
                            <img className='no-notes-image' src={no_note}></img>
                        </div>
                    </div>
                )}
            <NoteView />
            <NoteCreator />
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <SpeedDial onClick={showNoteCreator}
            ariaLabel="SpeedDial basic example" sx={{ position: 'absolute', bottom: 16, right: 16 }} icon={<AddIcon />} />
        </Fragment>
    )
}

export default Notes