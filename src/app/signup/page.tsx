import { getUserSession } from '@/lib/auth/auth'
import { redirect } from 'next/navigation'
import SignupForm from './_components/SignupForm'

type Props = {}

const page = async (props: Props) => {
    redirect('/login')

    const { data, message } = await getUserSession()
    if (data && data?.id) redirect('/profile')

    return (
        <div className='min-h-[85vh] bg-primary text-black flex items-center justify-center px-4 md:px-10 lg:px-20 xl:px-32'>
            <div className='w-full md:w-2/3 mx-auto flex flex-col md:flex-row border bg-accent3 '>
                <div className='hidden md:block md:w-1/2 relative'>
                    <img src='/momo.jpeg' className='w-full h-full object-cover' alt='' />
                </div>
                <div className='w-full md:w-1/2 h-full p-10'>
                    <SignupForm />
                </div>
            </div>
        </div>
    )
}

export default page