
import React, { Fragment, useContext, useEffect } from 'react'
//import Notes from '../'
import Notes from '../components/notes/Notes'
import AppBar from '../components/layout/AppBar';
//import ContactFilter from '../contacts/ContactFilter'
import AuthContext from '../context/auth/authContext'
const Home = () => {
    const authContext = useContext(AuthContext);
    const { loadUser } = authContext
    useEffect(()=>{
        loadUser()
    },[])
    return (
        <Fragment>
            <AppBar />
            <div className='container'>
                <div className='notes-container'>
                    <Notes></Notes>
                </div>
            </div>
        </Fragment>
    )
}

export default Home