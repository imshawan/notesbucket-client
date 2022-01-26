
import React, { useContext, useEffect } from 'react'
import Notes from '../components/notes/Notes'
import AuthContext from '../context/auth/authContext'
import Queries from '../components/Queries'
const Home = () => {
    const authContext = useContext(AuthContext);
    const { loadUser } = authContext

    useEffect(()=>{
        loadUser()
    })
    return (
        <div className='container'>
            <div className='notes-container'>
                <Notes></Notes>
            </div>
            <div>
                <Queries />
            </div>
        </div>
    )
}

export default Home