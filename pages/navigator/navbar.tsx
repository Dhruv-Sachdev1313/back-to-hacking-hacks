import React from 'react'
import { useAuth } from '../hooks/useAuth'
import NavbarItem from './navbar.component';
import { NonAuthItems, StudentNavbarItems, TutorNavbarItems  } from './navbar.items';
import tw from 'tailwind-styled-components'
import { Nav } from 'react-bootstrap';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../hooks/firebase';
import { useRole } from '../hooks/useRole';

interface AuthNavbarProps { 
    role: string
}

const AuthNavbar: React.FunctionComponent<AuthNavbarProps> = ({ role }: AuthNavbarProps) => {
   return (
       <NavWrapper>
           {role === 'tutor' ? (
               TutorNavbarItems.map(tutor => {
                   return (<NavbarItem
                       {...tutor}
                   />)
               })
           ): null}
           
           {role === 'student' ? (
               StudentNavbarItems.map(student => {
                   return ( <NavbarItem 
                       {...student}
                   /> )
               })
           ): null}
       </NavWrapper>
   )
}

const NonAuthNavbar = () => {
    return (
        <NavWrapper>
            {NonAuthItems.map(i => {
                return (
                    <NavbarItem 
                      {...i}
                    />
                )
            })}
        </NavWrapper>
    )
}

const Navbar = () => {

    const { loggedIn, signOut, currentUser } = useAuth()
    const role = useRole()


    return (
        <NavWrapper>
            {loggedIn ? <AuthNavbar role={role!} /> : <NonAuthNavbar />}
            {loggedIn && <button onClick={signOut!} >Sign Out</button>}
        </NavWrapper>
    )
}

const NavWrapper = tw.div`
 flex-row bg-green-400 
`

export default Navbar
