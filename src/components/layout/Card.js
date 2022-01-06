import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Cards() {
  return (
    <div id="notes-card" style={{width: 350, display: 'inline-block', margin: 5}}>
        <Card style={{maxHeight: 300}}>
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Word of the Day
            </Typography>
            <Typography variant="h5" component="div">
                Bla bla bla
            </Typography>
            <Typography variant="body2">
                This is a demo notes content
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small">Open</Button>
        </CardActions>
        </Card>
    </div>
  );
}
