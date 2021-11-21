import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useRouter, NextRouter } from 'next/router';
import { useFirestore } from '../hooks/useFirestore';
import Navbar from '../navigator/navbar';
import { useRole } from '../hooks/useRole';

const withTutor = (Component: React.ReactNode) => {
    function TutorHOC () {

        const Router: NextRouter = useRouter()
        const { loggedIn, currentUser } = useAuth()
        const role = useRole()
        
        React.useEffect(() => {

            if(!loggedIn) {
                Router.replace('/login')
                if(role == 'student') {
                    Router.replace('/student/browse')
                }
            }
        }, [loggedIn, role])

        return (
            <> 
                <Navbar />
                <Component />
            </>
        )
    }

    return TutorHOC
}

export default withTutor