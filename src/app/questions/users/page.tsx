import ErrorPage from '@/components/reusable/ErrorPage'
import { getAllUsers } from '@/lib/actions/users.actions'
import React from 'react'
import UsersTable from './_components/UsersTable'

type Props = {}

const page = async (props: Props) => {
    const { data: users, message } = await getAllUsers()
    if (!users || users.length === 0) {
        return <ErrorPage errorMessage={message} />
    }    


    return (
        <div>
            <UsersTable users={users} />
        </div>
    )
}

export default page