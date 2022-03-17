import { React } from 'react';
import { useHistory } from "react-router-dom";
import { Theme } from '../components/layout/Layout';
import { Button, ThemeProvider } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
  
const NotFound = () => {
    const history = useHistory();

    return (
        <ThemeProvider theme={Theme}>
            <div className='d-flex' style={{ backgroundColor: 'rgba(255, 0, 0, 0.2)', height: '100vh'}}>
            <div className="container container-404">
                <div className="face">
                    <div className="band">
                        <div className="red"></div>
                        <div className="white"></div>
                        <div className="blue"></div>
                    </div>
                    <div className="eyes"></div>
                    <div className="dimples"></div>
                    <div className="mouth"></div>
                </div>

                <h1 className='not-found-head font-poppins'>Oops! Something went wrong!</h1>
                <h5 className='not-found-body font-poppins'>The page you are looking for might have been removed or is temporarily unavailable.</h5>
                <Button
                    className='back-home-btn'
                    style={{ minWidth: '320px', padding: '10px', marginBottom: '50px' }}
                    startIcon={<ArrowBackIcon />}
                    onClick={() => history.push('/')}
                    size="large"
                    color="primary"
                    variant="contained">
                    Return back Home
                </Button>
            </div>
            </div>
        </ ThemeProvider>
    );
};
  
export default NotFound;