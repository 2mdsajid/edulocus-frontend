import React from 'react'
import FeedbackForm from './_components/FeedbackForm'

type Props = {}

const page = (props: Props) => {
    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 px-4 sm:px-0'>
            <FeedbackForm />
        </div>
    )
}

export default page