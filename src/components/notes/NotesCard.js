import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import NoteContext from '../../context/notes/notesContext'
import TimeFormatter from '../../utils/timeFormatter';
import List from '@mui/material/List';
import { ListItemButton, Typography } from '@mui/material';
import { withStyles } from '@mui/styles';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { stringAvatar } from '../../utils/generateAvatar';
//import {stringAvatar, stringToColor} from '../../utils/generateAvatar';
import { MainAccent } from '../../app.config';


const NotesListItems = withStyles({
  root: {
    "&": {
      backgroundColor: '#fff'
    },
    "& .time": {
      color: MainAccent,
      fontSize: '12px',
      transition: '.3s',
      marginTop: '2px'
    },
    "&:hover": {
      backgroundColor: MainAccent,
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white"
      },
      "& .time": {
        color: "white"
      },
    }
  },
  selected: {}
})(ListItemButton);
  
const NotesCard = ({ note }) => {
    const { _id, title, teaser, updatedAt } = note;
    const noteContext = useContext(NoteContext)
    const { setCurrent, setLoading } = noteContext

    const viewNote = (e) => {
      e.preventDefault()
      setCurrent(note)
      setLoading(true)
    }

    return (
        <div className='col-12 col-md-6 col-lg-4' style={{ paddingRight: '10px', paddingLeft: '10px', overflow: 'hidden'}} onClick={viewNote} id={_id}>
            <List className='note-list'>
              <NotesListItems data-id={_id} className='notes-card' > 
                  <ListItemAvatar>
                    <Avatar {...stringAvatar(title, 1)} />
                  </ListItemAvatar>
                  <ListItemText 
                    primary={
                      <div>
                        <Typography data-id={_id} style={{fontWeight: 600, fontSize: '16px', maxHeight: '22px', width: '100%', display: 'flex', overflow: 'hidden'}}>
                          {(title.length > 30) ? `${title.slice(0, 30)}...` : title}
                        </Typography>
                        <Typography data-id={_id} style={{fontWeight: 600, fontSize: '13px', maxHeight: '20px', width: '100%', display: 'flex', overflow: 'hidden'}}>
                          {(teaser.length > 38) ? `${teaser.slice(0, 38)}...` : teaser}
                        </Typography>
                      </div>
                  }
                    secondary={<Typography data-id={_id} className='time'>{TimeFormatter(updatedAt)}</Typography>}
                  />
              </NotesListItems>
            </List>
          </div>
    )
}
NotesCard.propTypes = {
    note: PropTypes.object.isRequired
}
export default NotesCard