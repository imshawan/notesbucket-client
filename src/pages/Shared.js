
import React, { useState, useEffect, Fragment } from 'react'
import { Backdrop, CircularProgress } from '@mui/material';
import axios from 'axios';

const Shared = (props) => {
    const { token } = props.match.params;
    const [note, setNote] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const headers = {
        "Content-Type" : "application/json",
        "accept": "*/*"
      }

    useEffect(() => {
        const getSharedNote = (token) => {
            axios.request({
                url: `${process.env.REACT_APP_PROD_URL}/api/share/${token}`,
                method: 'GET',
                data: {},
                headers: headers
              }).then((resp) => {
                    setNote({ ...note, ...resp.data[0] })
                    setLoading(false)
              })
              .catch((err) => {
                  setError(true) 
                  setLoading(false)
                })
        }
        getSharedNote(token)
        // eslint-disable-next-line
    }, [])

    const dateFormatter = (timestamp) => {
        let date = new Date(timestamp)
        return `${date.getDate()} ${date.toLocaleDateString(undefined, { month: "long" })}, ${date.getFullYear()}`
    }

    return (
        <Fragment>
            <div style={{ marginTop: '7rem', marginBottom: '4rem' }} className='container'>
            {!loading && note.title ?
            (
                <div style={{ borderRadius: '10px' }} className='m-1 p-3 border'>
                <div style={{ textAlign: 'left' }}>
                    <h4 style={{ fontWeight: 600 }} className="shared-note-head mt-2">
                        {note.title}
                    </h4>
                    <p className='d-flex' style={{ justifyContent: 'space-between'}}>
                        <span>
                            {note.author ? (`by ${note.author.firstname} ${note.author.lastname} `) : ''}
                        </span>
                        <span style={{ fontWeight: 600 }}>
                            {dateFormatter(note.updatedAt)} 
                        </span>
                    </p>
                </div>

                <div style={{ overflow: 'auto', textAlign: 'left' }} className="note-content mt-5" dangerouslySetInnerHTML={{ __html: note.content }}>
                </div>
                </div>
            ) : (error ? (
                <div style={{ textAlign: 'left' }} className='row justify-content-center m-2'>
                    <div className="alert alert-danger" role="alert">
                        <h4 style={{ fontWeight: 600 }} className="alert-heading mt-2 mb-3">Oh snap! You got an error!</h4>
                        <p>The note that you requested was not found on this link. The possible reason for this error can be either: </p>
                        <ul className='mt-2'>
                            <li>
                                The link shared doesn't exist or might be mistyped.
                            </li>
                            <li>
                                The person sharing this link has disabled sharing of this note.
                            </li>
                        </ul>
                        <hr/>
                        <p className="mb-2">Please ask the person to re-share the note with you.</p>
                    </div>
                </div>
            ) : '')}
            </div>
            <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Fragment>
    )
}

export default Shared