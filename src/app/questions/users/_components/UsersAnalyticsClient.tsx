'use client';

import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TBaseUser } from '@/lib/schema/users.schema';
import { Users, UserCheck, UserPlus, CalendarClock } from 'lucide-react';

const UserAnalyticsClient = ({ users }: { users: TBaseUser[] }) => {
    // Perform all calculations here, memoized for performance
    const analyticsData = useMemo(() => {
        const now = new Date();
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const yesterdayStart = new Date(todayStart);
        yesterdayStart.setDate(todayStart.getDate() - 1);
        
        let newUsersToday = 0;
        let newUsersYesterday = 0;

        // --- Daily Signups for Chart ---
        const sevenDaysAgo = new Date(todayStart);
        sevenDaysAgo.setDate(todayStart.getDate() - 6); // Calculate start of 7-day window
        
        // Initialize a map to hold signup counts for the last 7 days
        const dailyCounts: Map<string, number> = new Map();
        for (let i = 0; i < 7; i++) {
            const d = new Date(sevenDaysAgo);
            d.setDate(d.getDate() + i);
            dailyCounts.set(d.toISOString().split('T')[0], 0);
        }

        // Loop through users once to calculate all stats
        users.forEach(user => {
            const createdAt = new Date(user.createdAt);

            if (createdAt >= todayStart) {
                newUsersToday++;
            } else if (createdAt >= yesterdayStart) {
                newUsersYesterday++;
            }

            // Check if user signed up within the last 7 days
            if (createdAt >= sevenDaysAgo) {
                const dateKey = createdAt.toISOString().split('T')[0];
                if (dailyCounts.has(dateKey)) {
                    dailyCounts.set(dateKey, dailyCounts.get(dateKey)! + 1);
                }
            }
        });
        
        const dailySignups = Array.from(dailyCounts.entries()).map(([date, count]) => ({
             date: new Date(date + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
             count,
        }));

        return {
            totalUsers: users.length,
            subscribedUsers: users.filter(u => u.isSubscribed).length,
            newUsersToday,
            newUsersYesterday,
            dailySignups,
        };
    }, [users]); // Recalculate only when 'users' prop changes

    return (
        <div className="space-y-8">
            {/* Stat Cards Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{analyticsData.totalUsers}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Subscribed Users</CardTitle>
                        <UserCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{analyticsData.subscribedUsers}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">New Users (Today)</CardTitle>
                        <UserPlus className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+{analyticsData.newUsersToday}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">New Users (Yesterday)</CardTitle>
                        <CalendarClock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+{analyticsData.newUsersYesterday}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Daily Signups Chart */}
            <Card>
                <CardHeader>
                    <CardTitle>Daily Signups (Last 7 Days)</CardTitle>
                </CardHeader>
                <CardContent>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <BarChart data={analyticsData.dailySignups}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                                <Tooltip />
                                <Bar dataKey="count" name="New Users" fill="#16a34a" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default UserAnalyticsClient;