import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog"
import Link from 'next/link'
import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { SiCoinmarketcap } from 'react-icons/si'
import { CgProfile } from 'react-icons/cg'
import { BiLogOutCircle } from 'react-icons/bi'
import { logOut } from '@/lib/auth/auth'
import { ROLES_HIEARCHY } from '@/lib/data'

const ProfileDialog = () => {

  // const { data: session } = useSession();
  const [isloginclicked, setIsLoginclicked] = useState(false)

  // const handleGoogleLogin = async () => {
  //   setIsLoginclicked(true)
  //   await signIn('google', { callbackUrl: '/' })
  // };

  // const handleLogout = async () => {
  //   setIsLoginclicked(true)
  //   await signOut({ callbackUrl: '/' })
  // }

  // const dummyUser = {
  //   name: 'sajid aalam',
  //   email: 'somedummyemail&gmail.com',
  //   profile: '',
  //   image:'',
  //   role:'user',
  //   medpoints: 100
  // } 

  const dummyUser: { [key: string]: string } = {}

  // const userdecoded = decodeAndDisplayData('userdata', 'key')

  return (
    <div className=''>
      {dummyUser ? <>
        <div className="my-2">
          <p className="font-medium">{dummyUser.name}</p>
          <p className="text-gray-500">{dummyUser.email}</p>
          {ROLES_HIEARCHY.ADMIN.includes(dummyUser.role || '') && <p className="text-gray-500">Role : {dummyUser.role}</p>}
          <div>
            <p className='flex items-center gap-3 my-2'><span><SiCoinmarketcap /></span><span>{dummyUser.medpoints}</span></p>
          </div>
        </div>
        <hr className='bg-primary text-primary' />
        <div className="my-2">
          <Link className='my-2 flex gap-3 items-center text-lg cursor-pointer rounded-sm p-1 hover:bg-gray-500' href={'/dashboard'}>
            <CgProfile />
            Profile
          </Link>
          <div className='my-2 flex gap-3 items-center text-lg cursor-pointer rounded-sm p-1 hover:bg-gray-500' onClick={logOut}>
            <BiLogOutCircle />
            Log Out
          </div>
        </div>
      </> : <>
        <p>Not logged in</p>
        <Dialog>
          <DialogTrigger>
            <Button>Login</Button>
          </DialogTrigger>
          <DialogContent>
            <div className='flex flex-col items-center'>
              <h2>Welcome To Edulocus</h2>
              {/* <p className='text-center'>{MEDLOCUS_INTRO}</p> */}
              {/* <Button className="w-full flex gap-3 mt-5" onClick={handleGoogleLogin}>
                <span><FcGoogle /> </span>
                <span>{isloginclicked ? `Getting You In..` : `Continue With Google`}</span>
              </Button> */}
            </div>
          </DialogContent>
        </Dialog>
      </>}
    </div>
  )
}

export default ProfileDialog
