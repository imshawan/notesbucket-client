import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

export default function Alerts({ type, message}) {
    // Types: error, warning, info, success
    console.log(type, message);
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity={type}>
        <AlertTitle>Error</AlertTitle>
        {message}<strong>check it out!</strong>
      </Alert>
    </Stack>
  );
}