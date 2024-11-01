import React from 'react'
import SubscriptionForm from './_components/SubscriptionForm'
import { constructMetadata } from '@/lib/data'

type Props = {}

export const metadata = constructMetadata({
    title: "Edulocus | Subscription",
    description: "Explore membership plan by edulocus"
})

const page = (props: Props) => {
    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-bg1  to-bg2'>
            <SubscriptionForm />
        </div>
    )
}

export default page