import React,{useContext} from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types'
import NoteContext from '../../context/notes/notesContext'
import TimeFormatter from '../../utils/timeFormatter';


const NotesCard = ({ note }) => {
    const { _id, title, content, updatedAt } = note;
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
        <div id="notes-card" style={{width: 350, display: 'inline-block', margin: 5}}>
        <Card style={{maxHeight: 300}}>
        <CardContent>
            <Typography variant="h6" component="div">
               {title}
            </Typography>
            <Typography variant="body2">
                {content}
            </Typography>
            <Typography sx={{ fontSize: 14, bottom: '0px'}} color="text.secondary" gutterBottom>
            Last modified: {TimeFormatter(updatedAt)}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small">View</Button>
            <Button size="small" onClick={editNote}>Edit</Button>
            <Button size="small" onClick={onDelete}>Delete</Button>
        </CardActions>
        </Card>
    </div>
    )
}
NotesCard.propTypes={
    note:PropTypes.object.isRequired
}
export default NotesCard