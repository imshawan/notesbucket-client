import React, { Fragment, useContext, useEffect } from 'react';
import NoteContext from '../../context/notes/notesContext';
import NotesCard from './NotesCard';
import { Backdrop, ThemeProvider, CircularProgress, SpeedDial } from '@mui/material';
import NoteView from './NoteView';
import NoteCreator from './NoteCreator';
import AddIcon from '@mui/icons-material/Add';
import setAuthToken from '../../utils/setAuthToken'
import no_note from '../../assets/images/note.png';
import { Theme } from '../layout/Layout';


const Notes = () => {
    const noteContext = useContext(NoteContext);
    const { notes, searched, getNotes, filtered, loading, setAdd, add, setLoading } = noteContext 
    
    useEffect(()=>{
        if (localStorage.token){
            setAuthToken(localStorage.token)
          }
        getNotes()
        setLoading(true)
        setAdd(false)
        // eslint-disable-next-line
    },[])

    const showNoteCreator = () => {
        if (!add) setAdd(true)
    }

    const sortNotesByFileration = (elements) => {
        if (filtered === "none") {
            return elements.sort((a, b) => {
                return new Date(a.updatedAt).getTime() - 
                    new Date(b.updatedAt).getTime()
            }).reverse();
        }
        else if (filtered === "recents") {
            return elements.filter((elem) => {
                var timeStamp = Math.round(new Date().getTime() / 1000);
                var filterationTime = timeStamp - (24 * 3600); //24 hours
                return new Date(elem.updatedAt) >= new Date(filterationTime*1000).getTime();
            })
        }
        else if (filtered === "favourites") {
            return elements.filter((elem) => elem.favourite === true)
        }
    }

    return (
        <Fragment>
            <ThemeProvider theme={Theme}>
            {notes && notes.length !== 0 ?(
                    <Fragment>
                    {
                        searched ? (
                            <div className='row' style={{ paddingTop: '45px' }}>
                                {searched.length !== 0 ? (searched.map(note=><NotesCard note={note} key={note._id}/>)) : (
                                    <h3 style={{margin: 'auto'}}>Nothing found!</h3>
                                )}
                            </div>
                        ) 
                        : (filtered ? (
                            <Fragment>
                                <div className='pb-2 filteration-header'>
                                    {filtered === 'none' ? 'notes' : filtered}
                                </div>
                                <div className='row' style={{ paddingTop: '90px' }}>
                                    {sortNotesByFileration(notes).map(note=><NotesCard note={note} key={note._id} />)}
                                </div>
                            </ Fragment>
                            ) : '')
                    }
                    </Fragment>
                ) : (
                    <div style={{height: '80vh'}} className='row justify-content-center'>
                        <div className='no-note-img' style={{margin: 'auto'}}>
                            <img className='no-notes-image' src={no_note} alt="Nothing here..."></img>
                        </div>
                    </div>
                )}
            <NoteView />
            <NoteCreator />

            <SpeedDial onClick={showNoteCreator}
            ariaLabel="SpeedDial basic example" sx={{ position: 'fixed', bottom: 16, right: 16 }} icon={<AddIcon />} />
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            </ThemeProvider>
        </Fragment>
    )
}

export default Notes