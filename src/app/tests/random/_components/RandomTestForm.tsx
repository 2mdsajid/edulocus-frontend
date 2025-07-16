
'use client';


import ShortErrorMessage from '@/components/reusable/ShortErrorMessage';
import { toast } from '@/hooks/use-toast';
import { startRandomTest } from '@/lib/actions/tests.actions';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';


const Spinner = () => (
    <svg
        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
    >
        <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
        ></circle>
        <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
    </svg>
);

const RandomTestForm = () => {
    const router = useRouter();
    const [numQuestions, setNumQuestions] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleStartTest = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // This is your server action call
            const { data: testid, message } = await startRandomTest(numQuestions);

            if (!testid) {
                // Display a destructive toast if the test creation fails
                toast({
                    variant: "destructive",
                    title: "Operation Failed",
                    description: message || "Unable to create the random test. Please try again."
                });
                return;
            }

            // Display a success toast
            toast({
                variant: "success",
                title: "Success!",
                description: "Your test has been created. Redirecting you now..."
            });

            // Redirect to the newly created test
            router.push(`/tests/view/${testid}`);

        } catch (err) {
            console.error(err);
            setError('An unexpected error occurred. Please check the console for details.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-2xl">
                
        {/* Header Section with an Icon */}
        <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-800">Random Test</h1>
            <p className="mt-3 text-gray-600">
                Challenge yourself with a set of random questions from our database.
            </p>
        </div>

        {/* The Form */}
        <form onSubmit={handleStartTest} className="mt-10 space-y-8">
            <div>
                <label htmlFor="numQuestions" className="block text-sm font-medium text-gray-700">
                    Number of Questions
                </label>
                <input
                    type="number"
                    id="numQuestions"
                    name="numQuestions"
                    min="10"
                    max="50"
                    value={numQuestions}
                    onChange={(e) => setNumQuestions(Number(e.target.value))}
                    disabled={isLoading}
                    className="mt-2 block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 shadow-sm transition duration-300 ease-in-out focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                />
                 <p className="mt-2 text-xs text-gray-500">Choose between 10 and 50 questions.</p>
            </div>

            <div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex w-full transform-gpu justify-center rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-3.5 text-base font-bold text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30 focus:outline-none focus:ring-4 focus:ring-purple-500/50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                >
                    {isLoading ? (
                        <>
                            <Spinner />
                            Preparing Your Test...
                        </>
                    ) : (
                        'Start Test'
                    )}
                </button>
            </div>
        </form>
        
        {/* Display error message if any */}
        <ShortErrorMessage message={error} />
    </div>
    );
};


export default RandomTestForm