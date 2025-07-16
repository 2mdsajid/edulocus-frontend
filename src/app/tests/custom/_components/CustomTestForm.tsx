'use client';

import { toast } from '@/hooks/use-toast';
import { startCustomTest } from '@/lib/actions/tests.actions'; // Assuming you'll create this action
import { CustomTestQuestionCounts, CustomTestSelections, TTotalQuestionsPerSubjectAndChapter } from '@/lib/schema/tests.schema';
import { useRouter } from 'next/navigation';
import React, { useState, useMemo } from 'react';
import { Checkbox, QuestionInput, Spinner } from './HelperComponents';


export const CustomTestForm = ({ allQuestionsData }: { allQuestionsData: TTotalQuestionsPerSubjectAndChapter }) => {
    const router = useRouter();
    const [selections, setSelections] = useState<CustomTestSelections>({});
    const [questionCounts, setQuestionCounts] = useState<CustomTestQuestionCounts>({});
    const [isLoading, setIsLoading] = useState(false);

    // Memoized calculation for totals - no changes here
    const { subjectTotals, grandTotal } = useMemo(() => {
        let grandTotal = 0;
        const subjectTotals: { [subject: string]: number } = {};

        for (const subject in questionCounts) {
            let subjectTotal = 0;
            const chapters = questionCounts[subject];
            for (const chapter in chapters) {
                subjectTotal += Number(chapters[chapter]) || 0;
            }
            subjectTotals[subject] = subjectTotal;
            grandTotal += subjectTotal;
        }
        return { subjectTotals, grandTotal };
    }, [questionCounts]);

    const handleSubjectToggle = (subject: string) => {
        setSelections(prev => {
            const newSelections = { ...prev };
            if (newSelections[subject]) {
                delete newSelections[subject];
            } else {
                newSelections[subject] = {};
            }
            return newSelections;
        });
        setQuestionCounts(prev => {
            const newCounts = { ...prev };
            delete newCounts[subject];
            return newCounts;
        });
    };

    // *** THE FIX IS HERE ***
    const handleChapterToggle = (subject: string, chapter: string) => {
        setSelections(prev => {
            // Create a new top-level selections object
            const newSelections = { ...prev };
            
            // Create a new copy of the specific subject's chapter selections
            const newChapters = { ...(newSelections[subject] || {}) };

            // Modify the new copy
            if (newChapters[chapter]) {
                delete newChapters[chapter];
            } else {
                newChapters[chapter] = true;
            }

            // Assign the new chapter object back to the new selections object
            newSelections[subject] = newChapters;

            return newSelections;
        });

        // This part remains the same
        setQuestionCounts(prev => {
            const newCounts = { ...prev };
            if (newCounts[subject]) {
                delete newCounts[subject][chapter];
            }
            return newCounts;
        });
    };


    const handleCountChange = (subject: string, chapter: string, count: number) => {
        const maxQuestions = allQuestionsData[subject]?.[chapter] ?? 0;
        const validCount = Math.max(0, Math.min(count, maxQuestions));

        setQuestionCounts(prev => ({
            ...prev,
            [subject]: {
                ...prev[subject],
                [chapter]: validCount
            }
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        for (const subject in selections) {
            if (Object.keys(selections[subject] || {}).length === 0) {
                toast({
                    variant: 'destructive',
                    title: 'Chapter Selection Required',
                    description: `Please select at least one chapter for ${subject}.`,
                });
                return;
            }
        }
        
        if (grandTotal < 10) {
            return toast({
                variant: 'destructive',
                title: 'Not Enough Questions',
                description: 'Please select a total of at least 10 questions to start a test.',
            });
        }
        
        setIsLoading(true);
        
        const { data: testId, message } = await startCustomTest(questionCounts);

        if (!testId) {
            toast({ variant: 'destructive', title: 'Error', description: message || "Failed to create test." });
        } else {
            toast({ variant: 'success', title: 'Success!', description: 'Your custom test is ready. Redirecting...' });
            router.push(`/tests/view/${testId}`);
        }

        setIsLoading(false);
    };

    return (
        <div className="flex min-h-screen w-full items-start justify-center bg-gradient-to-b from-color1 to-color1 p-4 sm:p-6 md:p-8">
            <div className="w-full max-w-4xl space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-gray-800">Create a Custom Test</h1>
                    <p className="mt-3 max-w-2xl mx-auto text-gray-600">
                        <span className="hidden sm:inline">Select subjects and chapters to build a test tailored to your study needs.</span>
                        <span className="sm:hidden">Select subjects and chapters and Scroll to start test</span>
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Left Side: Selections */}
                        <div className="md:col-span-2 space-y-6">
                            {Object.keys(allQuestionsData).map(subject => (
                                <div key={subject} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300">
                                    <Checkbox
                                        id={subject}
                                        label={subject}
                                        checked={!!selections[subject]}
                                        onChange={() => handleSubjectToggle(subject)}
                                    />
                                    {selections[subject] && (
                                        <div className="mt-4 pl-6 border-l-2 border-indigo-100 space-y-4">
                                            {Object.keys(allQuestionsData[subject]).length > 0 ? (
                                                Object.keys(allQuestionsData[subject]).map(chapter => (
                                                    <Checkbox
                                                        key={chapter}
                                                        id={`${subject}-${chapter}`}
                                                        label={`${chapter} (${allQuestionsData[subject][chapter]} Qs)`}
                                                        checked={!!selections[subject]?.[chapter]}
                                                        onChange={() => handleChapterToggle(subject, chapter)}
                                                    />
                                                ))
                                            ) : (
                                                <p className="text-sm text-gray-500">No chapters available for this subject.</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Right Side: Counts & Summary */}
                        <div className="md:col-span-1">
                            <div className="sticky top-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
                                <h2 className="text-xl font-bold text-gray-800 mb-4">Your Test Summary</h2>
                                <p className="text-sm text-gray-600 mb-6">
                                    Enter the number of questions you want for each selected chapter.
                                </p>
                                <div className="space-y-4">
                                    {Object.keys(selections).length === 0 ? (
                                        <p className="text-sm text-gray-500">Select subjects to begin.</p>
                                    ) : (
                                        Object.keys(selections).map(subject => {
                                            const selectedChapters = Object.keys(selections[subject] || {});
                                            return (
                                                <div key={subject}>
                                                    <h3 className="font-semibold text-gray-700">{subject}</h3>
                                                    <div className="mt-2 pl-4 space-y-3">
                                                        {selectedChapters.length > 0 ? (
                                                            selectedChapters.map(chapter => (
                                                                <QuestionInput
                                                                    key={chapter}
                                                                    label={chapter}
                                                                    max={allQuestionsData[subject][chapter]}
                                                                    value={questionCounts[subject]?.[chapter] || 0}
                                                                    onChange={(val) => handleCountChange(subject, chapter, val)}
                                                                />
                                                            ))
                                                        ) : (
                                                            <p className="text-sm text-red-600 p-2 bg-red-50 rounded-md">
                                                                Please select one or more chapters.
                                                            </p>
                                                        )}
                                                    </div>
                                                    {selectedChapters.length > 0 && (
                                                        <div className="mt-2 pl-4 text-right text-sm font-medium text-indigo-600">
                                                            Subject Total: {subjectTotals[subject] || 0}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                                <div className="mt-6 pt-4 border-t border-gray-200">
                                    <div className="flex justify-between items-center text-lg font-bold">
                                        <span className="text-gray-800">Grand Total:</span>
                                        <span className="text-indigo-600">{grandTotal}</span>
                                    </div>
                                    {grandTotal < 10 && Object.keys(selections).length > 0 && (
                                        <p className="mt-2 text-sm text-red-500 text-center">
                                            A minimum of 10 questions is required.
                                        </p>
                                    )}
                                    <button
                                        type="submit"
                                        disabled={isLoading || grandTotal < 10}
                                        className="mt-4 flex w-full transform-gpu justify-center rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-3.5 text-base font-bold text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30 focus:outline-none focus:ring-4 focus:ring-purple-500/50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                                    >
                                        {isLoading ? <><Spinner /> Creating...</> : 'Start Custom Test'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};


