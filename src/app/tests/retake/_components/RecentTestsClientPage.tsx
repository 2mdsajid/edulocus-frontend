
'use client';

import Link from 'next/link';
import { TRecentTest } from '../page'; // Import the type from the page
import { ScoreCircle } from './HelperComponents';


export const RecentTestsClientPage = ({ tests }: { tests: TRecentTest[] }) => {
    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl">Your Recent Tests</h1>
                <p className="mt-4 text-lg text-gray-600">Review your performance and retake tests to master the material.</p>
            </div>

            {/* Test List */}
            <div className="space-y-6">
                {tests.map((test) => (
                    <div key={test.id} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-indigo-200">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                            {/* Test Info */}
                            <div className="flex-grow text-center sm:text-left">
                                <h2 className="text-2xl font-bold text-gray-800">{test.name}</h2>
                                <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-gray-500">
                                    <span>
                                        Taken on: {new Date(test.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </span>
                                    <span className="hidden sm:inline">|</span>
                                    <span>
                                        {test.totalQuestions} Questions
                                    </span>
                                </div>
                                <p className="mt-1 font-semibold text-gray-700">
                                    Score: {test.score} / {test.totalQuestions}
                                </p>
                            </div>

                            {/* Score Circle and Retake Button */}
                            <div className="flex items-center gap-6">
                                <ScoreCircle score={test.score} totalQuestions={test.totalQuestions} />
                                <Link href={`/tests/retake/${test.id}`} className="flex transform-gpu items-center justify-center rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 text-base font-bold text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-500/50" passHref>
                                        Retake Test
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
