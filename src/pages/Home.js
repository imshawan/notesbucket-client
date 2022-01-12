
import React, { useContext, useEffect } from 'react'
//import Notes from '../'
import Notes from '../components/notes/Notes'
//import ContactFilter from '../contacts/ContactFilter'
import AuthContext from '../context/auth/authContext'

const Home = () => {
    const authContext = useContext(AuthContext);
    const {loadUser} = authContext
    useEffect(()=>{
        loadUser()
    },[])
    return (
        <div className='grid-2'>
            <div>
                <Notes></Notes>
            </div>
            <div>
                
            </div>
        </div>
    )
}

export default Home