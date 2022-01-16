
import React, { useContext, useEffect } from 'react'
//import Notes from '../'
import Notes from '../components/notes/Notes'
//import ContactFilter from '../contacts/ContactFilter'
import AuthContext from '../context/auth/authContext'
const Home = () => {
    const authContext = useContext(AuthContext);
    const { loadUser } = authContext
    useEffect(()=>{
        console.log("load")
        loadUser()
    },[])
    return (
        <div className='notes-container'>
            <Notes></Notes>
        </div>
    )
}

export default Home