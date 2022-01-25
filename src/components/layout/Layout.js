
import React from 'react';
import Paper from '@mui/material/Paper';
import MuiAlert from '@mui/material/Alert';
import { createTheme, styled } from '@mui/material/styles';
import { MainAccentHex } from '../../app.config';

const lightTheme = createTheme({ palette: { mode: 'light' } });
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    height: 590,
    lineHeight: '60px',
    borderRadius: '15px'
    }));
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Theme = createTheme({
    palette: {
      primary: {
          main: MainAccentHex
    },
    },
  });

export { lightTheme, Item, Alert, Theme };