'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getFirstTwoUpperCase } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { LuNewspaper } from 'react-icons/lu';
import { RxCross2 } from 'react-icons/rx';
import { VscOutput } from 'react-icons/vsc';
import NavLink from "./NavLink";
import ProfileDialog from "./ProfileDialog";
import { TBaseUser } from "@/lib/auth/schema";
// import { LucideNewspaper } from 'lucide-react';



const dummyUser = {
  name: 'sajid aalam',
  email: 'somedummyemail&gmail.com',
  profile: '',
  image: '',
  medpoints: 100
}

const notifications = [
  'Review On Your Question',
  'Your Review Accepted',
  'Claim Your First Rewards'
]

type Props = {
  user: TBaseUser | null
}

const Header = (props: Props) => {

  const pathname = usePathname()

  const { user } = props

  const [showLinks, setShowLinks] = useState(false);
  const [isScrolled, setIsScrolled] = useState(true);

  const handleToggle = () => {
    setShowLinks(!showLinks);
  };

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
    <div className={`w-screen h-16 fixed top-0 left-0 z-100 flex items-center justify-between px-4 md:px-10 lg:px-20 xl:px-32 ${isScrolled ? 'border-b dark:border-white border-gray-800 shadow-sm dark:bg-dark-primary bg-primary ' : 'bg-transparent'} `}>
      <div className="w-full h-full flex items-center justify-between">

        <div className="sm:hidden">
          <button onClick={handleToggle}>
            <FaBars />
          </button>
        </div>

        <div>
          <Link className="font-bold text-lg" href={'/'}>Edulocus</Link>
        </div>

        {/* RxCross2 */}
        <div className={`${showLinks ? 'w-screen dark:bg-dark-primary bg-primary' : 'w-[0vw]'}  flex  flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 absolute top-[0rem] left-0  z-100 sm:static h-screen sm:h-auto sm:w-auto sm:items-center transition-width ease duration-200`}>
          <div className={`${showLinks ? 'block sm:hidden' : 'hidden sm:hidden'} relative h-16 flex px-4`}>
            <div className=' w-max flex space-x-1 items-center px-1 text-2xl cursor-pointer' onClick={handleToggle}>
              <RxCross2 />
            </div>
          </div>

          <NavLink
            navlabel='Membership'
            navlink='/membership'
            showLinks={showLinks}
            handleToggle={handleToggle}
            icon={<VscOutput />}
          />
          <NavLink
            navlabel='Tests'
            navlink='/tests'
            showLinks={showLinks}
            handleToggle={handleToggle}
            icon={<LuNewspaper />}
          />

          {/* <NavLink
            navlabel='Discussion'
            navlink='/discussion'
            showLinks={showLinks}
            handleToggle={handleToggle}
            icon={<GoCommentDiscussion />}
          /> */}

          {/* { <NavLink
            navlabel='Dashboard'
            navlink='/dashboard'
            showLinks={showLinks}
            handleToggle={handleToggle}
            icon={<BsFillHouseDashFill />}
          />} */}
          {/* {session && <NavLink
            navlabel='Organization'
            navlink='/org'
            showLinks={showLinks}
            handleToggle={handleToggle}
            icon={<BsFillHouseDashFill />}
          />} */}
        </div>


        <div className='flex space-x-2 items-center'>

          {/* <Popover>
            <PopoverTrigger>
              <div className='relative cursor-pointer' >
                <div className='text-color1 dark:text-dark-color1 text-4xl'>
                  <IoIosNotificationsOutline />
                </div>
                <div className={`absolute top-0 p-1 h-4 w-4 flex justify-center items-center rounded-full bg-red-500`}>
                  <p className='text-xs'>{notificationlength}</p>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className='m-4 '>
              <NotificationDialog />
            </PopoverContent>
          </Popover> */}

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
      </div>
    </div>
  );
};

export default Header;
