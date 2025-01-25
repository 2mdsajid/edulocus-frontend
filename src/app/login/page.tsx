import SignInLuciaGoogleButton from '@/components/reusable/SignInLuciaGoogleButton'
import { Card, CardContent } from "@/components/ui/card"
import { getUserSession } from '@/lib/auth/auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'

type Props = {}

const Page = async (props: Props) => {
    const{data:user, message:authMessage} = await getUserSession()
    if (user && user.googleId && user.id) {
        redirect('/dashboard')
    }

    return (
        <div className='min-h-screen bg-background flex items-center justify-center p-8 py-12'>
            <Card className='w-full max-w-4xl mx-auto overflow-hidden'>
                <div className='flex flex-col md:flex-row md:py-10'>
                    <div className='hidden md:block md:w-1/2 relative '>
                        <Image 
                            src='/thumbnail.jpg'
                            layout='fill'
                            objectFit='cover'
                            alt='Login background'
                        />
                    </div>
                    <div className='w-full md:w-1/2 py-4 pr-2'>
                        {/* error box to display error message from session.authErrorMessage if present */}
                        {/* {session?.authErrorMessage && (
                            <div className="bg-red-500 text-white p-4 rounded-md text-center">
                                {session.authErrorMessage}
                            </div>
                        )} */}

                        <CardContent className='p-4'>
                            <h1 className="text-2xl font-bold mb-4">
                                Welcome to EduLocus
                            </h1>
                            <p className="text-gray-700 mb-6">
                                EduLocus is your all-in-one platform for medical students and aspirants.
                                Join the community now and take your learning to the next level.
                            </p>
                            <SignInLuciaGoogleButton />
                        </CardContent>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default Page
