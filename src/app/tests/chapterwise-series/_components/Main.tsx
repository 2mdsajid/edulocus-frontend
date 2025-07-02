'use client'

import { getCurrentChapterWiseTest } from '@/lib/actions/tests.actions';
import { TSingleCustomTestWithQuestions } from '@/lib/schema/tests.schema';
import React, { useEffect, useState } from 'react';
import LiveTestBox from './LiveTestBox';
import NoLiveTestsPage from './NoLiveTestError';



const ChapterWiseTestsPage: React.FC = () => {
    const [liveTest, setLiveTest] = useState<TSingleCustomTestWithQuestions | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTests = async () => {
            setLoading(true);
            setError(null);
            try {
                // Get current date and time in ISO format
                const now = new Date();
                const dateandtime = now.toISOString(); // e.g., "2025-07-03T20:30:00.000Z"
                console.log(dateandtime)

                const { data, message } = await getCurrentChapterWiseTest(dateandtime);

                if (data) {
                    setLiveTest(data);
                } else {
                    setError(message || "Failed to fetch tests.");
                    setLiveTest(null); // Set to empty array to indicate no data
                }
            } catch (err) {
                console.error("Error fetching chapter-wise tests:", err);
                setError("An unexpected error occurred while fetching tests.");
                setLiveTest(null); // Set to empty array on unexpected error
            } finally {
                setLoading(false);
            }
        };

        fetchTests();
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div className="m ">


            {loading && (
                <div className="text-center text-gray-600 text-lg">Loading tests...</div>
            )}

            {error && (
                <NoLiveTestsPage />
            )}

            {!loading && !error && (!liveTest ) && (
                <div className="text-center text-gray-600 text-lg">No live chapter-wise tests available today.</div>
            )}

            {!loading && !error && liveTest && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <LiveTestBox
                        key={liveTest.id}
                        id={liveTest.id}
                        archive={liveTest.archive}
                        name={liveTest.name}
                        createdBy={liveTest.createdBy || 'Edulocus'} // Use 'createdBy' from fetched data
                    />
                </div>
            )}
        </div>
    );
};

export default ChapterWiseTestsPage;
