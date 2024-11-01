import { getUserSession } from '@/lib/auth/auth'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import LoginForm from './_components/LoginForm'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

type Props = {}

const Page = async (props: Props) => {
    const { data, message } = await getUserSession()
    if (data && data.isSubscribed) redirect('/dashboard')

    return (
        <div className='min-h-screen bg-background flex items-center justify-center p-4'>
            <Card className='w-full max-w-4xl mx-auto overflow-hidden'>
                <div className='flex flex-col md:flex-row'>
                    <div className='hidden md:block md:w-1/2 relative'>
                        <Image 
                            src='/thumbnail.jpg' 
                            layout='fill'
                            objectFit='cover'
                            alt='Login background' 
                        />
                    </div>
                    <div className='w-full md:w-1/2'>
                        <CardContent className='p-8'>
                            <div className='mb-6'>
                                <h1 className='text-2xl font-bold mb-2'>Welcome Back</h1>
                                <p className='text-sm text-muted-foreground'>
                                    Login is exclusive to our members. Enjoy extra benefits by becoming a member.
                                </p>
                                <Button variant="link" asChild className='p-0 text-blue-700'>
                                    <Link className=' underline' href="/membership">Learn more about membership.</Link>
                                </Button>
                            </div>
                            <LoginForm />
                        </CardContent>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default Page