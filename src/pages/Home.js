
import React, { useContext, useEffect } from 'react'
import Notes from '../components/notes/Notes'
import AuthContext from '../context/auth/authContext'
import Queries from '../components/Queries'
import Profile from '../components/Profile'
const Home = () => {
    const authContext = useContext(AuthContext);
    const { loadUser } = authContext

    useEffect(()=>{
        loadUser()
        // eslint-disable-next-line
    }, [])
    return (
        <div className='container'>
            <div className='notes-container'>
                <Notes></Notes>
            </div>
            <div>
                <Queries />
            </div>
            <div>
                <Profile />
            </div>
        </div>
    )
}

export default Home