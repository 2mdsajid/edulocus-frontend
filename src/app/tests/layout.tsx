import { getStreamCookieForUnauthenticatedUser } from '@/lib/actions/try.actions'
import { redirect } from 'next/navigation'
import { constructMetadata } from '@/lib/data'
import React from 'react'
import { headers } from 'next/headers';
import { pathname } from 'next-extra/pathname';

type Props = {
    children: React.ReactNode
    params: {}
}

export const metadata = constructMetadata({
    title: "Edulocus | Tests",
    description: "Explore various modes of tests by edulocus"
})

const layout = async (props: Props) => {
    const stream = await getStreamCookieForUnauthenticatedUser();

    const base = `${headers().get('x-forwarded-proto')}://${headers().get('host')}`;
    const fullUrl = new URL(await pathname(), base);

    if (!stream || stream === 'null' || stream === 'undefined' || stream === '') {
        redirect(`/try?ru=${encodeURIComponent(fullUrl.pathname)}`);
    }

    return (
        <div className='min-h-screen w-full bg-color1 dark:bg-dark-primary pt-20 pb-10 px-4 md:px-10 lg:px-20 xl:px-32'>
            {props.children}
        </div>
    )
}

export default layout