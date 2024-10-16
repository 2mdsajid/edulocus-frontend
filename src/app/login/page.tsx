import { getUserSession } from '@/lib/auth/auth'
import { redirect } from 'next/navigation'
import LoginForm from './_components/LoginForm'

type Props = {}

const page = async (props: Props) => {
    const { data, message } = await getUserSession()
    if (data && data.isSubscribed) redirect('/dashboard')

    return (
        <div className='min-h-[85vh] bg-primary text-black flex items-center justify-center px-4 md:px-10 lg:px-20 xl:px-32'>
            <div className='w-full md:w-2/3 mx-auto flex flex-col md:flex-row border bg-accent3 '>
                <div className='hidden md:block md:w-1/2 relative'>
                    <img src='/...jpeg' className='w-full h-full object-cover' alt='' />
                </div>
                <div className='w-full md:w-1/2 h-full p-10'>
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}

export default page