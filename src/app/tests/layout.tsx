import { getStreamCookieForUnauthenticatedUser } from '@/lib/actions/try.actions'
import { redirect } from 'next/navigation'
import { constructMetadata } from '@/lib/data'
import React from 'react'

type Props = {
    children: React.ReactNode
}

export const metadata = constructMetadata({
    title: "Edulocus | Tests",
    description: "Explore various modes of tests by edulocus"
})

const layout = async (props: Props) => {
    const stream = await getStreamCookieForUnauthenticatedUser();
    if (!stream || stream === 'null' || stream === 'undefined' || stream === '') {
      redirect('/try');
    }
  
    return (
        <div className='min-h-screen w-full bg-color1 dark:bg-dark-primary pt-20 pb-10 px-4 md:px-10 lg:px-20 xl:px-32'>
            {props.children}
        </div>
    )
}

export default layout