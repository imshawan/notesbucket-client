import React, { Fragment, useContext, useEffect } from 'react';
import NoteContext from '../../context/notes/notesContext';
import NotesCard from './NotesCard';
//import Spinner from '../layout/Spinner';


const Notes = () => {
    const noteContext = useContext(NoteContext);
    const { notes, filtered, getNotes, loading } = noteContext 
    useEffect(()=>{
        getNotes()
    },[])
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
                         : notes.map(note=><NotesCard note={note} key={note._id} />)
                     }
                     </div>
                 ) : <h3>Loading...</h3>}
            </Fragment>
        )
    }  
}

export default Notes