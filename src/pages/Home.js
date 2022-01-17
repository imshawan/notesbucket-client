
import React, { useContext, useEffect } from 'react'
//import Notes from '../'
import Notes from '../components/notes/Notes'
//import ContactFilter from '../contacts/ContactFilter'
import AuthContext from '../context/auth/authContext'
const Home = () => {
    const authContext = useContext(AuthContext);
    const { loadUser } = authContext
    useEffect(()=>{
        loadUser()
    },[])
    return (
        <div className='container'>
            <div className='notes-container'>
                <Notes></Notes>
            </div>
        </div>
    )
}

export default Home