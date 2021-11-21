import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useRouter, NextRouter } from 'next/router';
import { useFirestore } from '../hooks/useFirestore';
import Navbar from '../navigator/navbar';
import { useRole } from '../hooks/useRole';

const withStudent = (Component: React.ReactNode) => {
    function StudentHOC () {
        
        const Router: NextRouter = useRouter()
        const { loggedIn, currentUser } = useAuth()
        const role = useRole()

        React.useEffect(() => {


            if(loggedIn) {
                if(role == 'tutor') {
                    Router.replace('/tutor/students')
                }
            } else {
                Router.replace('/login')
            }
        }, [loggedIn, role])

        return (
            <> 
                <Navbar />
                <Component />
            </>
        )
    }

    return StudentHOC
}

export default withStudent