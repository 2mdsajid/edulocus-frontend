import ErrorPage from '@/components/reusable/ErrorPage'
import { getAllUsers } from '@/lib/actions/users.actions'
import React from 'react'
import UsersTableClient from './_components/UserTableClient'
import { Metadata } from 'next';
import { constructMetadata } from '@/lib/data';
import UserAnalyticsClient from './_components/UsersAnalyticsClient';

export const metadata: Metadata = constructMetadata({
    title: 'Admin | User Management',
    description: 'Manage all users, their streams, and subscription status.'
});

const UsersPage = async () => {
    // Note: Ensure your getAllUsers function returns a 'createdAt' field for default sorting.
    const { data: users, message } = await getAllUsers()
    if (!users || users.length === 0) {
        return <ErrorPage errorMessage={message || 'No users found.'} />
    }    

    return (
        <div className="container mx-auto py-8 px-4 space-y-5">
            <UserAnalyticsClient users={users} />
            <UsersTableClient initialUsers={users} />
        </div>
    )
}

export default UsersPage