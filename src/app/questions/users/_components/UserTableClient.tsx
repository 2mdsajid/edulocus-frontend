'use client';

import Pagination from "@/components/reusable/Pagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { removeSubscription, updateSubscription } from '@/lib/actions/users.actions';
import { TBaseUser } from '@/lib/schema/users.schema';
import { ArrowUpDown, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react';

type SortKey = keyof TBaseUser | 'createdAt';

const UsersTableClient = ({ initialUsers }: { initialUsers: TBaseUser[] }) => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'asc' | 'desc' }>({ key: 'createdAt', direction: 'desc' });
    
    // State to track the ID of the user being updated
    const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

    const usersPerPage = 10;

    const processedUsers = useMemo(() => {
        let filteredUsers = initialUsers.filter(user =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (sortConfig.key) {
            filteredUsers.sort((a, b) => {
                const aValue = a[sortConfig.key as keyof TBaseUser];
                const bValue = b[sortConfig.key as keyof TBaseUser];

                if (aValue === null && bValue === null) return 0;
                if (aValue === null) return sortConfig.direction === 'asc' ? -1 : 1;
                if (bValue === null) return sortConfig.direction === 'asc' ? 1 : -1;

                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return filteredUsers;
    }, [initialUsers, searchQuery, sortConfig]);
    
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = processedUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(processedUsers.length / usersPerPage);

    const handleSort = (key: SortKey) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handleToggleSubscription = async (id: string, isCurrentlySubscribed: boolean) => {
        setLoadingUserId(id); // Set loading state for this specific user
        
        try {
            const action = isCurrentlySubscribed ? removeSubscription : updateSubscription;
            const { data, message } = await action(id);
            
            if (data) {
                toast({ variant: 'success', title: 'Success!', description: 'Subscription status updated.' });
                router.refresh(); // Refresh the page to show updated data
            } else {
                toast({ variant: 'destructive', title: 'Error', description: message || 'Failed to update subscription.' });
            }
        } catch (error) {
            toast({ variant: 'destructive', title: 'Error', description: 'An unexpected error occurred.' });
        } finally {
            setLoadingUserId(null); // Clear loading state regardless of outcome
        }
    };

    const SortableHeader = ({ sortKey, children }: { sortKey: SortKey, children: React.ReactNode }) => (
        <th className="py-3 px-4 text-left cursor-pointer hover:bg-gray-100" onClick={() => handleSort(sortKey)}>
            <div className="flex items-center gap-2">
                {children}
                {sortConfig.key === sortKey ? (
                    sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                ) : (
                    <ArrowUpDown className="h-4 w-4 text-gray-400" />
                )}
            </div>
        </th>
    );

    return (
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="text-3xl font-bold">User Management</CardTitle>
                <div className="mt-4">
                    <Input
                        placeholder="Search by name or email..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="max-w-sm"
                    />
                </div>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto rounded-md border">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <SortableHeader sortKey="name">Name</SortableHeader>
                                <th className="py-3 px-4 text-left">Email</th>
                                <SortableHeader sortKey="stream">Stream</SortableHeader>
                                <th className="py-3 px-4 text-left">Subscribed</th>
                                <SortableHeader sortKey="createdAt">Date Joined</SortableHeader>
                                <th className="py-3 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {currentUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="py-3 px-4 font-medium">{user.name}</td>
                                    <td className="py-3 px-4 text-gray-600">{user.email}</td>
                                    <td className="py-3 px-4 text-gray-600">{user.stream}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                            user.isSubscribed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {user.isSubscribed ? 'Yes' : 'No'}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-gray-600">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="py-3 px-4">
                                        <Button
                                            onClick={() => handleToggleSubscription(user.id, user.isSubscribed)}
                                            size="sm"
                                            variant={user.isSubscribed ? 'destructive' : 'default'}
                                            className={`w-[100px] ${user.isSubscribed ? '' : 'bg-green-600 hover:bg-green-700'}`}
                                            disabled={loadingUserId === user.id} // Disable only the clicked button
                                        >
                                            {loadingUserId === user.id ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                user.isSubscribed ? 'Unsubscribe' : 'Subscribe'
                                            )}
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </CardContent>
        </Card>
    );
};

export default UsersTableClient;