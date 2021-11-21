import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useRouter, NextRouter } from 'next/router';
import { useFirestore } from '../hooks/useFirestore';
import { TutorNavbar } from '../navigator/navbar';
import { useRole } from '../hooks/useRole';

const withTutor = (Component: React.ReactNode) => {
    function TutorHOC () {

        const Router: NextRouter = useRouter()
        const { loggedIn, currentUser } = useAuth()
        const role = useRole()
        
        React.useEffect(() => {

            if(!role == null) {
                Router.replace('/login')
                if(role == 'student') {
                    Router.replace('/student/browse')
                }
            }
        }, [loggedIn, role])

        return (
            <> 
                <TutorNavbar />
                <Component />
            </>
        )
    }

    return TutorHOC
}

export default withTutor