'use client'

import Link from 'next/link';
import React, { useState } from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md';

type TypeDropDownProps = {
    navlabel: string
    showLinks: boolean;
    dropdowncontents: {
        label: string;
        link: string;
        desc?: string;
    }[]
    handleToggle?: () => void;
    icon?: React.ReactNode
}

const NavDropDown = (props: TypeDropDownProps) => {
    const { navlabel, dropdowncontents, showLinks, handleToggle, icon } = props;
    const [isDropdownShown, setIsDropdownShown] = useState(false)
    return (
        <div
            onMouseOver={() => setIsDropdownShown(true)}
            onMouseOut={() => setIsDropdownShown(false)}
            onClick={() => setIsDropdownShown(!isDropdownShown)}
            className={`${showLinks ? 'block sm:block' : 'hidden sm:block'} w-max h-fit relative `}>
            <div className='sm:justify-center text-2xl sm:text-sm md:text-lg  text-black dark:text-white w-max flex gap-3 sm:gap- items-center px-1 pl-5 md:pl-0 cursor-pointer'>
                {icon && <div className='sm:hidden'>{icon}</div>}
                <button className=''>{navlabel}</button>
                <button className={`${isDropdownShown ? 'rotate-180' : 'rotate-0'} `} ><MdKeyboardArrowDown /></button>
            </div>
            {isDropdownShown && <div className='sm:absolute w-max dark:bg-dark-primary bg-primary   border-gray-600 shadow-2xl rounded flex flex-col gap-2 pt-3'>
                <div className='flex flex-col gap-2 w-full pl-[2rem] sm:pl-4 p-4  rounded-md'>
                    {
                        dropdowncontents.map((dropdowncontent, index) => {
                            return <div key={index} className=' hover:bg-gray-300 hover:dark:bg-gray-800  p-2 hover:rounded-md cursor-pointer'>
                                <Link href={dropdowncontent.link} onClick={handleToggle}>
                                    <span className='font-semibold tracking-wider'>{dropdowncontent.label}</span>
                                    <span className='text-sm'>{dropdowncontent.desc && <p>{dropdowncontent.desc}</p>}</span>
                                </Link>
                            </div>
                        })
                    }
                </div>
            </div>}
        </div>
    )
}

export default NavDropDown
