'use client'; // This directive is necessary for client-side interactivity

import ErrorPage from '@/components/reusable/ErrorPage';
import { setSubscription } from '@/lib/actions/users.actions'; // Assuming setSubscription is in the same actions file or imported correctly
import { TBaseUser } from '@/lib/schema/users.schema';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';


type Props = {
    users: TBaseUser[] 
};

const UsersTable = (props:Props) => {
    const {users} = props

    const router = useRouter()
    
    const [subscriptionStatus, setSubscriptionStatus] = useState<{ [key: string]: { type: 'success' | 'error', message: string } | null }>({});


    const handleSetSubscription = async (id: string) => {
        const { data, message: responseMessage } = await setSubscription(id);
        if (data) {
            router.refresh()
            setSubscriptionStatus(prevStatus => ({
                ...prevStatus,
                [id]: { type: 'success', message: 'Subscription status updated successfully!' }
            }));
        } else {
            setSubscriptionStatus(prevStatus => ({
                ...prevStatus,
                [id]: { type: 'error', message: responseMessage || 'Failed to update subscription.' }
            }));
        }
        setTimeout(() => {
            setSubscriptionStatus(prevStatus => ({
                ...prevStatus,
                [id]: null
            }));
        }, 3000); // Clear status message after 3 seconds
    };


    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">User List</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b text-left">Name</th>
                            <th className="py-2 px-4 border-b text-left">Email</th>
                            <th className="py-2 px-4 border-b text-left">Stream</th>
                            <th className="py-2 px-4 border-b text-left">Subscribed</th>
                            <th className="py-2 px-4 border-b text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <React.Fragment key={user.id}>
                                <tr>
                                    <td className="py-2 px-4 border-b">{user.name}</td>
                                    <td className="py-2 px-4 border-b">{user.email}</td>
                                    <td className="py-2 px-4 border-b">{user.stream}</td>
                                    <td className="py-2 px-4 border-b">
                                        {user.isSubscribed ? 'Yes' : 'No'}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <button
                                            onClick={() => handleSetSubscription(user.id)}
                                            className={`py-1 px-3 rounded text-white ${user.isSubscribed ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                                        >
                                            {user.isSubscribed ? 'Unsubscribe' : 'Subscribe'}
                                        </button>
                                    </td>
                                </tr>
                                {subscriptionStatus[user.id] && (
                                    <tr>
                                        <td colSpan={5} className="py-1 px-4 text-center">
                                            <span className={`${
                                                subscriptionStatus[user.id]?.type === 'success' ? 'text-green-600' : 'text-red-600'
                                            } text-sm`}>
                                                {subscriptionStatus[user.id]?.message}
                                            </span>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersTable;