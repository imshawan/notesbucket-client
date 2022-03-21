import React, { Fragment, useContext, useEffect, useState } from 'react';
import NoteContext from '../../context/notes/notesContext';
import NotesCard from './NotesCard';
import { Backdrop, ThemeProvider, SpeedDial, IconButton, Tooltip, Snackbar } from '@mui/material';
import NoteView from './NoteView';
import NoteCreator from './NoteCreator';
import Shareing from './Shareing';
import AddIcon from '@mui/icons-material/Add';
import setAuthToken from '../../utils/setAuthToken'
import { getRecentItems, getSortedNotes, getFavourites, getSharedNotes } from '../../utils/utils'
import no_note from '../../assets/images/note.png';
import { Theme, Alert } from '../layout/Layout';
import Loader from '../layout/Loader';
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
        switch (filtered) {
            case "none":
                return getSortedNotes(elements);

            case "recents":
                return getRecentItems(elements);

            case "favourites":
                return getFavourites(elements);

            case "shared":
                return getSharedNotes(elements);

            default:
                return null;
        };
    }

    const RenderNotes = () => {
        var filteredNotes = sortNotesByFileration(notes)
        return (
            <Fragment>
            {filteredNotes.length && filteredNotes !== [] ? (
                <div className='row' style={{ paddingTop: '100px' }}>
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
                                    <h3 className='font-poppins' style={{margin: 'auto', fontWeight: 600}}>Nothing was found!</h3>
                                )}
                            </div>
                        ) 
                        : (filtered ? (
                            <Fragment>
                                <div className='pb-2 filteration-header d-flex'>
                                    {filtered === 'none' ? (
                                        <Fragment>
                                        <span style={{ marginLeft: '5px' }}>notes</span>
                                        <span>
                                            <Tooltip title="Reload content" placement="bottom" arrow>
                                                <IconButton onClick={syncNotes}>
                                                    <SyncIcon style={{ animation: sync ? 'spin 2s linear infinite' : '' }} />
                                                </IconButton>
                                            </Tooltip>
                                        </span>
                                        </Fragment>
                                    ) : (<span style={{ marginLeft: '5px' }}>{filtered}</span>) }
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
                ariaLabel="SpeedDial basic example" sx={{ position: 'fixed', bottom: 16, right: 16 }} icon={<AddIcon style={{ height: '38px', width: '38px', fontWeight: 'bold' }} />} />
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}>
                    {/* <CircularProgress color="inherit" /> */}
                <Loader />
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