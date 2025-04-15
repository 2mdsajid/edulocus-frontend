'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { TBaseUser } from '@/lib/schema/users.schema'
import { navItems, ROLES_HIEARCHY } from '@/lib/data'
import { getFirstTwoUpperCase } from '@/lib/utils'
import { LogOut, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { IoIosArrowDropdownCircle } from 'react-icons/io'
import ProfileDialog from './ProfileDialog'
import { logOut } from "@/lib/auth/auth"

type Props = {
    user: TBaseUser | null
    authToken?: string
}

export default function NavBarNew(props: Props) {
    const { user } = props

    const pathname = usePathname()

    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(true);


    useEffect(() => {
        (pathname === '/') ? setIsScrolled(false) : setIsScrolled(true);
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true)
            } else {
                (pathname === '/') ? setIsScrolled(false) : setIsScrolled(true);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [pathname]);

    return (
        <nav className={`w-screen h-16 fixed top-0 left-0 z-100 ${!isScrolled ? "bg-transparent" : "bg-gradient-to-br from-purple-50 to-pink-50 dark:bg-gray-900 shadow-md"}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-2xl font-bold text-gray-700 dark:text-purple-400">
                            EduLocus
                        </Link>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${pathname === item.href
                                    ? 'border-purple-500 text-gray-900 dark:text-white'
                                    : 'border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700 hover:text-gray-700 dark:hover:text-gray-200'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        <Popover>
                            <PopoverTrigger>
                                <div className='relative border  -white rounded-full cursor-pointer' >
                                    <Avatar>
                                        {user?.image
                                            ? <AvatarImage src={user.image} />
                                            : <AvatarFallback className='text-black dark:text'>{getFirstTwoUpperCase(user?.name || 'EDULOCUS')}</AvatarFallback>}
                                    </Avatar>
                                    <div className='absolute right-0 bottom-0'>
                                        <IoIosArrowDropdownCircle />
                                    </div>
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className='m-2 dark:bg-dark-primary bg-primary border  '>
                                <ProfileDialog user={user} />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="-mr-2 flex items-center sm:hidden">
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="inline-flex pt-16 items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
                                >
                                    <span className="sr-only">Open main menu</span>
                                    {isOpen ? (
                                        <X
                                            className={` ${!isScrolled ? "hidden" : "block"} text-gray-700 text-3xl h-12 w-10`}
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <Menu className="block text-gray-700 text-3xl h-12 w-10" aria-hidden="true" />
                                    )}
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[240px] pt-16 sm:hidden space-y-5 flex flex-col justify-between">
                                {/* Top Content */}
                                <div>
                                    <div className="">
                                        {user ? (
                                            <div className="pl-3 pr-4 text-base">
                                                <div className="my-2">
                                                    <Avatar className="mb-2">
                                                        {user?.image
                                                            ? <AvatarImage src={user.image} />
                                                            : <AvatarFallback className='text-black dark:text'>{getFirstTwoUpperCase(user?.name || 'EDULOCUS')}</AvatarFallback>}
                                                    </Avatar>
                                                    <p className="font-medium">{user.name}</p>
                                                    <p className="text-gray-500">{user.email}</p>
                                                    {ROLES_HIEARCHY.ADMIN.includes(user.role || '') && (
                                                        <p className="text-gray-500">Role : {user.role}</p>
                                                    )}
                                                </div>
                                                <hr className="bg-primary text-primary" />
                                            </div>
                                        ) : (
                                            <Button asChild>
                                                <Link onClick={() => setIsOpen(false)} href={'/login'}>Login</Link>
                                            </Button>
                                        )}
                                    </div>
                                    <div className="pt-2 pb-3 space-y-1">
                                        {navItems.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${pathname === item.href
                                                    ? 'bg-purple-50 dark:bg-purple-900 border-purple-500 text-purple-700 dark:text-purple-300'
                                                    : 'border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:text-gray-700 dark:hover:text-gray-200'
                                                    }`}
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Bottom Logout Button */}
                                {props.authToken &&
                                    props.authToken !== '' &&
                                    <div className="p-3">
                                        <button
                                            onClick={async () => logOut()} // Replace with your logout function
                                            className="w-full flex items-center justify-center gap-2 p-2 rounded-md bg-black text-white hover:bg-gray-800 transition"
                                        >
                                            <LogOut className="h-5 w-5" />
                                            Logout
                                        </button>
                                    </div>}
                            </SheetContent>
                        </Sheet>

                    </div>
                </div>
            </div>
        </nav>
    )
}