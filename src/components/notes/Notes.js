import React, { Fragment, useContext, useEffect, useState } from 'react';
import NoteContext from '../../context/notes/notesContext';
import NotesCard from './NotesCard';
import { Backdrop, ThemeProvider, CircularProgress, SpeedDial, IconButton, Tooltip, Snackbar } from '@mui/material';
import NoteView from './NoteView';
import NoteCreator from './NoteCreator';
import Shareing from './Shareing';
import AddIcon from '@mui/icons-material/Add';
import setAuthToken from '../../utils/setAuthToken'
import no_note from '../../assets/images/note.png';
import { Theme, Alert } from '../layout/Layout';
import SyncIcon from '@mui/icons-material/Sync';

const Default = () => {
    return (
        <div style={{height: '90vh'}} className='row justify-content-center'>
            <div className='no-note-img' style={{margin: 'auto'}}>
                <img className='no-notes-image' src={no_note} alt="Nothing here..."></img>
            </div>
        </div>
    )
}

const Notes = () => {
    const noteContext = useContext(NoteContext);
    const { notes, searched, getNotes, filtered, loading, setAdd, add, setLoading } = noteContext
    const [statusOps, setOpsStatus] = useState({open: false, severity: "", text: ""})
    const [sync, setSync] = useState(false)
    
    useEffect(()=>{
        if (localStorage.token){
            setAuthToken(localStorage.token)
          }
        getNotes()
        setLoading(true)
        setAdd(false)
        // eslint-disable-next-line
    },[])

    useEffect(() => {
        if (sync) { setOpsStatus({ ...statusOps, open: true, severity: "success", text: "List refreshed" }) }
        setSync(false)
        // eslint-disable-next-line
    }, [notes])

    const syncNotes = () => {
        setSync(true)
        getNotes()
    }

    const showNoteCreator = () => {
        if (!add) setAdd(true)
    }

    const closeAlerts = (e) => {
        //e.preventDefault();
        setOpsStatus({...statusOps, open: false})
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
        else if (filtered === "shared") {
            return elements.filter((elem) => elem.shared === true)
        }
    }

    const RenderNotes = () => {
        var filteredNotes = sortNotesByFileration(notes)
        return (
            <Fragment>
            {filteredNotes.length && filteredNotes !== [] ? (
                <div className='row' style={{ paddingTop: '90px' }}>
                    {filteredNotes.map(note => <NotesCard note={note} key={note._id} />)}
                </div>
                ) : <Default />}
            </Fragment>
        )
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
                                <div className='pb-2 filteration-header d-flex'>
                                    {filtered === 'none' ? (
                                        <Fragment>
                                        <span>notes</span>
                                        <span>
                                            <Tooltip title="Reload content" placement="bottom" arrow>
                                                <IconButton onClick={syncNotes}>
                                                    <SyncIcon style={{ animation: sync ? 'spin 2s linear infinite' : '' }} />
                                                </IconButton>
                                            </Tooltip>
                                        </span>
                                        </Fragment>
                                    ) : filtered }
                                </div>                     
                                    <RenderNotes />
                            </ Fragment>
                            ) : '')
                    }
                    </Fragment>
                ) : (
                    <Default />
                )}
            <NoteView />
            <NoteCreator />
            <Shareing />

            <SpeedDial onClick={showNoteCreator}
            ariaLabel="SpeedDial basic example" sx={{ position: 'fixed', bottom: 16, right: 16 }} icon={<AddIcon />} />
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar open={statusOps.open} autoHideDuration={5000} onClose={closeAlerts}>
                <Alert onClose={closeAlerts} severity={statusOps.severity} sx={{ width: '100%' }}>
                    {statusOps.text}
                </Alert>
            </Snackbar>
            </ThemeProvider>
        </Fragment>
    )
}

export default Notes