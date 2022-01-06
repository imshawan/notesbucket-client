
import React from 'react';
import Paper from '@mui/material/Paper';
import MuiAlert from '@mui/material/Alert';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const lightTheme = createTheme({ palette: { mode: 'light' } });
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    height: 550,
    lineHeight: '60px',
    borderRadius: '15px'
    }));
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export { lightTheme, Item, Alert };