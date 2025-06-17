import { getUserSession } from "@/lib/auth/auth"
import { ROLES_HIEARCHY } from "@/lib/data"
import { redirect } from 'next/navigation'
import { constructMetadata } from '@/lib/data'
import React from 'react'
import ErrorPage from "@/components/reusable/ErrorPage"

type Props = {
    children: React.ReactNode
}

export const metadata = constructMetadata({
    title: 'EduLocus | Groups',
    description: 'Create and manage collaborative workspaces for learning, progress monitoring, and test creation.'
});


const layout = async (props: Props) => {
    
    return (
        <div className='min-h-screen w-full bg-color1 dark:bg-dark-primary pt-20 pb-10 px-4 md:px-10 lg:px-20 xl:px-32'>
            {props.children}
        </div>
    )
}

export default layout