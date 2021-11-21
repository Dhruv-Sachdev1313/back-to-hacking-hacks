import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useRouter, NextRouter } from 'next/router';
import { useFirestore } from '../hooks/useFirestore';
import { NonAuthNavbar } from '../navigator/navbar';
import { useRole } from '../hooks/useRole';

const withAuthentication = (Component: React.ReactNode) => {
    function AuthenticationHOC() {
        
        const Router: NextRouter = useRouter()
        const { loggedIn, currentUser } = useAuth()
        const role = useRole()

        React.useEffect(() => {
            if(role) {
                if(role === 'tutor') {
                    Router.replace('/tutor/students')
                } else if ( role == 'student ') {
                    Router.replace('/student/browse')
                }
            }
        }, [loggedIn, role])

        return (
            <> 
                <NonAuthNavbar />
                <Component />
            </>
        )
    }

    return AuthenticationHOC
}

export default withAuthentication