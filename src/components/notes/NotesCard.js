import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import NoteContext from '../../context/notes/notesContext'
import TimeFormatter from '../../utils/timeFormatter';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
  
const NotesCard = ({ note }) => {
    const { _id, title, updatedAt } = note;
    const noteContext = useContext(NoteContext)
    const { setCurrent } = noteContext

    const viewNote =(e)=>{
      e.preventDefault()
      setCurrent(note)
    }
    return (
        <div className='col-12 col-md-6 col-lg-4' onClick={viewNote} id={_id}>
            <List>
              <ListItemButton className='notes-card' style={{borderRadius: '10px'}}>
                  <ListItemAvatar>
                    <Avatar>
                      <NoteAltIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={(title.length > 30) ? `${title.slice(0, 30)}...` : title}
                    secondary={TimeFormatter(updatedAt)}
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