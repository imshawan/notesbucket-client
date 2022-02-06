import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import NoteContext from '../../context/notes/notesContext'
import TimeFormatter from '../../utils/timeFormatter';
import List from '@mui/material/List';
import { ListItemButton, Typography } from '@mui/material';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import {stringAvatar, stringToColor} from '../../utils/generateAvatar';
  
const NotesCard = ({ note }) => {
    const { _id, title, updatedAt } = note;
    const noteContext = useContext(NoteContext)
    const { setCurrent, setLoading } = noteContext

    const viewNote =(e)=>{
      e.preventDefault()
      setCurrent(note)
      setLoading(true)
    }
    return (
        <div className='col-12 col-md-6 col-lg-4' onClick={viewNote} id={_id}>
            <List>
              <ListItemButton className='notes-card' style={{borderRadius: '10px', background: `${stringToColor(title)}20`}}>
                  <ListItemAvatar>
                    <Avatar {...stringAvatar(title, 1)} />
                  </ListItemAvatar>
                  <ListItemText 
                    primary={
                    <Typography style={{fontWeight: 600, fontSize: '14px'}}>
                      {(title.length > 30) ? `${title.slice(0, 30)}...` : title}
                    </Typography>
                  }
                    secondary={<Typography style={{ fontSize: '13px'}}>{TimeFormatter(updatedAt)}</Typography>}
                  />
              </ListItemButton>
            </List>
          </div>
    )
}
NotesCard.propTypes={
    note:PropTypes.object.isRequired
}
export default NotesCard