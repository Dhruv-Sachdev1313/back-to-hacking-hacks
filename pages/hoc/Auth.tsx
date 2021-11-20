import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useRouter, NextRouter } from 'next/router';

const withAuthentication = (Component: React.ReactNode) => {
    function AuthenticationHOC() {
        
        const Router: NextRouter = useRouter()
        const {  loggedIn } = useAuth()
        
        React.useEffect(() => {
            if(!loggedIn) {
                Router.replace('/courses')
            }
        }, [loggedIn])

        return (
            <> 
                <Component />
            </>
        )
    }
}