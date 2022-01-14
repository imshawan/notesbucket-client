import React,{useContext} from 'react'
import PropTypes from 'prop-types'
import NoteContext from '../../context/notes/notesContext'
import TimeFormatter from '../../utils/timeFormatter';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

  
const NotesCard = ({ note }) => {
    const { _id, title, updatedAt } = note;
    const noteContext = useContext(NoteContext)
    const { deleteNote, setCurrent, clearCurrent } = noteContext
  
    const onDelete = () =>{
        deleteNote(_id);
        clearCurrent()
    }
    const editNote =()=>{
        console.log(note)
        setCurrent(note)
    }
    return (
        <div className='col-12 col-md-6 col-lg-4' onClick={editNote} id={_id}>
            <List>
              <ListItemButton className='notes-card' style={{borderRadius: '10px'}}>
                    <IconButton style={{right: 0, position: 'absolute', marginRight: '14px'}} onClick={onDelete} edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  <ListItemAvatar>
                    <Avatar>
                      <NoteAltIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={(title.length > 25) ? `${title.slice(0, 25)}...` : title}
                    secondary={`Last moodified ${TimeFormatter(updatedAt)}`}
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