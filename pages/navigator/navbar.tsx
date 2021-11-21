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

const AuthNavbar: React.FunctionComponent<AuthNavbarProps> = ({  }: AuthNavbarProps) => {
    
    const role = useRole()
   
    return (
       <NavWrapper>
           {role === 'tutor' ? (
               TutorNavbarItems.map((tutor, k) => {
                   return (<NavbarItem
                       {...tutor}
                       key={k}
                   />)
               })
           ): null}
           
           {role === 'student' ? (
               StudentNavbarItems.map((student, k) => {
                   return ( <NavbarItem 
                       {...student}
                       key={k}
                   /> )
               })
           ): null}
       </NavWrapper>
   )
}

const NonAuthNavbar = () => {
    return (
        <NavWrapper>
            {NonAuthItems.map((i, k) => {
                return (
                    <NavbarItem 
                      {...i}
                      key={k}
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
