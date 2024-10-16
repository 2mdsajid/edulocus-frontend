import Link from 'next/link'
import React from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md';

type TypeNavLink = {
    navlabel: string;
    navlink: string;
    showLinks: boolean;
    handleToggle?: () => void
    icon?: React.ReactNode
}

const NavLink = (props: TypeNavLink) => {
    const { navlabel, navlink, showLinks, handleToggle, icon } = props
    return (
        <div className={`${showLinks ? 'block sm:block px-4 sm:px-0' : 'hidden sm:block'} relative`}>
            <div className=' w-max flex gap-3 items-center px-1'>
                <div className='text-2xl sm:text-sm md:text-lg sm:hidden'>
                    {icon}
                </div>
                <Link className='navLink text-2xl sm:text-sm md:text-lg' onClick={handleToggle} href={navlink}>{navlabel}</Link>
            </div>
        </div>
    )
}

export default NavLink
