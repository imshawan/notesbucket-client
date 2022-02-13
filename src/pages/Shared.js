
import React, { useState, useEffect, Fragment } from 'react'
import { Backdrop, CircularProgress } from '@mui/material';
import axios from 'axios';

const Shared = (props) => {
    const { token } = props.match.params;
    const [note, setNote] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState({ message: '' })
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
                    setNote({ ...note, title: resp.data[0].title, content: resp.data[0].content, author: resp.data[0].author })
                    setLoading(false)
              })
              .catch((err) => {
                  setError({ ...error, message: err.response ? err.response.data.message : err.message }) 
                  setLoading(false)
                })
        }
        getSharedNote(token)
        // eslint-disable-next-line
    }, [])

    return (
        <Fragment>
            <div style={{ marginTop: '7rem' }} className='container'>
            {!loading && note.title ?
            (
                <Fragment>
                <div style={{ textAlign: 'left' }}>
                    <h4 style={{ fontWeight: 600 }} className="main-head">
                        {note.title}
                    </h4>
                    <p>
                        <span>
                            {note.author ? (`by ${note.author.firstname} ${note.author.lastname} `) : ''}
                        </span>
                    </p>
                </div>

                <div style={{ overflow: 'scroll' }} className="note-content mt-5" dangerouslySetInnerHTML={{ __html: note.content }}>
                </div>
                </Fragment>
            ) : (
                <h4 style={{ fontWeight: 600 }} className="main-head">
                        {error.message}
                </h4>
            )}
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