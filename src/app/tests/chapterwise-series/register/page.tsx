import React from 'react'
import ChapterwiseRegistrationForm from './_components/ChapterWiseRegistrationForm'
import { getUserSession } from '@/lib/auth/auth'
import { redirect } from 'next/navigation'

type Props = {}

const page = async (props: Props) => {
    const {data:user, message} = await getUserSession()
    if(!user) redirect('/login?ru=/tests/chapterwise-series/register')

    return (
        <div className='w-full'>
            <ChapterwiseRegistrationForm user={user} />
        </div>
    )
}

export default page