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
import { TBaseUser } from '@/lib/auth/schema'
import { useRouter } from 'next/navigation'

type Props = {
  user: TBaseUser | null
}

const ProfileDialog = (props: Props) => {

  const router = useRouter()

  const { user } = props

  // const { data: session } = useSession();
  // const [isloginclicked, setIsLoginclicked] = useState(false)

  // const handleGoogleLogin = async () => {
  //   setIsLoginclicked(true)
  //   await signIn('google', { callbackUrl: '/' })
  // };

  // const handleLogout = async () => {
  //   setIsLoginclicked(true)
  //   await signOut({ callbackUrl: '/' })
  // }

  // const user = {
  //   name: 'sajid aalam',
  //   email: 'somedummyemail&gmail.com',
  //   profile: '',
  //   image:'',
  //   role:'user',
  //   medpoints: 100
  // } 

  // const userdecoded = decodeAndDisplayData('userdata', 'key')

  return (
    <div className=''>
      {user
        ? <div>
          <div className="my-2">
            <p className="font-medium">{user.name}</p>
            <p className="text-gray-500">{user.email}</p>
            {ROLES_HIEARCHY.ADMIN.includes(user.role || '') && <p className="text-gray-500">Role : {user.role}</p>}
          </div>
          <hr className='bg-primary text-primary' />
          <div className="my-2">
            <Link className='my-2 flex gap-3 items-center text-lg cursor-pointer rounded-sm p-1 hover:bg-gray-500' href={'/dashboard'}>
              <CgProfile />
              Profile
            </Link>
            <div className='my-2 flex gap-3 items-center text-lg cursor-pointer rounded-sm p-1 hover:bg-gray-500'
              onClick={() => {
                logOut()
                router.push('/')
              }}>
              <BiLogOutCircle />
              Log Out
            </div>
          </div>
        </div>
        : <div>
          <p>Not logged in</p>
          <Button asChild>
            <Link href={'/login'}>Login</Link>
          </Button>
        </div>}
    </div>
  )
}

export default ProfileDialog
