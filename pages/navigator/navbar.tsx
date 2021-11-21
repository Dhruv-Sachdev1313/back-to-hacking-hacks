import React from 'react'
import { useAuth } from '../hooks/useAuth'
import NavbarItem from './navbar.component';
import { NonAuthItems, StudentNavbarItems, TutorNavbarItems  } from './navbar.items';
import tw from 'tailwind-styled-components'
import { Nav } from 'react-bootstrap';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../hooks/firebase';
import { useRole } from '../hooks/useRole';


export const TutorNavbar = () => {

    const { loggedIn, signOut, currentUser } = useAuth()
 
    return (
        <NavWrapper>
            {TutorNavbarItems.map((props, k) => {
                return (
                    <NavbarItem 
                        key={k}
                        {...props}
                    />
                )
            })}
            <button onClick={signOut!} >Sign Out</button>
        </NavWrapper>
    )
}

export const StudentNavbar = () => {

    const { loggedIn, signOut, currentUser } = useAuth()

    return (
        <NavWrapper>
            {StudentNavbarItems.map((props, k) => {
                return (
                    <NavbarItem 
                        key={k}
                        {...props}
                    />
                )
            })}
            <button onClick={signOut!} >Sign Out</button>
        </NavWrapper>
    )
}

export const NonAuthNavbar = () => {


    const { loggedIn, signOut, currentUser } = useAuth()
    
    return (
        <NavWrapper>
            {NonAuthItems.map((props, k) => {
                return (
                    <NavbarItem 
                      {...props}
                      key={k}
                    />
                )
            })}
        </NavWrapper>
    )
}



const NavWrapper = tw.div`
flex flex-row-reverse bg-green-400 
`
