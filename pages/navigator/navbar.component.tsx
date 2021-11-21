import React, { FunctionComponent} from "react";
import { NextRouter, Router, useRouter } from 'next/router'
import tw from 'tailwind-styled-components'

interface NavbarProps {
    name: string,
    path: string
}

const NavbarItem: FunctionComponent<NavbarProps> = props => {
    const { name, path } = props
    const Router: NextRouter = useRouter()

    return (
        <NavItem onClick={() => Router.replace(path)}>
            {name}
        </NavItem>
    )
}

const NavItem = tw.div`
  p-3 text-white hover:cursor-pointer hover:bg-green-500 rounded-lg
`

export default NavbarItem
