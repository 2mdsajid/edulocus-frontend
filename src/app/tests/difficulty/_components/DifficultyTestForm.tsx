'use client';

import { toast } from '@/hooks/use-toast';
import { startDifficultyTest } from '@/lib/actions/tests.actions';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { DifficultyButton, Spinner } from './HelperComponents';
import { TTotalQuestionsPerSubject } from '@/lib/schema/questions.schema';

export const DifficultyTestForm = ({ subjectsData }: { subjectsData: TTotalQuestionsPerSubject[] }) => {
    const router = useRouter();
    const [selectedSubject, setSelectedSubject] = useState<string>('');
    const [selectedLevel, setSelectedLevel] = useState<'e' | 'm' | 'h' | null>(null);
    const [numQuestions, setNumQuestions] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const QUESTION_LIMIT = 50;

    const handleSubjectChange = (subject: string) => {
        setSelectedSubject(subject);
        // Reset subsequent steps when subject changes
        setSelectedLevel(null);
        setNumQuestions(10);
    };

    const handleLevelSelect = (level: 'e' | 'm' | 'h') => {
        setSelectedLevel(level);
    };

    const handleCountChange = (value: number) => {
        // Find the max questions for the selected subject from the props
        const maxForSubject = subjectsData.find(s => s.subject === selectedSubject)?.count || QUESTION_LIMIT;
        // The final limit is the smaller of the subject's max and the global 50 limit
        const finalLimit = Math.min(maxForSubject, QUESTION_LIMIT);
        const validValue = Math.max(0, Math.min(value, finalLimit));
        setNumQuestions(validValue);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedSubject) {
            return toast({ variant: 'destructive', title: 'Missing Information', description: 'Please select a subject.' });
        }
        if (!selectedLevel) {
            return toast({ variant: 'destructive', title: 'Missing Information', description: 'Please select a difficulty level.' });
        }
        if (numQuestions === 0) {
            return toast({ variant: 'destructive', title: 'No Questions Selected', description: 'Please select at least one question.' });
        }

        setIsLoading(true);

        // Pass the selected subject, level, and the number of questions (limit)
        const { data: testId, message } = await startDifficultyTest(
            selectedLevel,
            numQuestions,
            selectedSubject
        );

        if (!testId) {
            toast({ variant: 'destructive', title: 'Error', description: message || "Failed to create test." });
        } else {
            toast({ variant: 'success', title: 'Success!', description: 'Your test is ready. Redirecting...' });
            router.push(`/tests/view/${testId}`);
        }

        setIsLoading(false);
    };

    // Calculate the max questions for the currently selected subject to display in the UI
    const maxQuestionsForCurrentSubject = Math.min(
        subjectsData.find(s => s.subject === selectedSubject)?.count || QUESTION_LIMIT,
        QUESTION_LIMIT
    );

    return (
            <div className="w-full max-w-md">
                <div className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-gray-800">Difficulty Based Test</h1>
                    <p className="mt-3 max-w-2xl mx-auto text-gray-600">Build your test in three simple steps.</p>
                </div>

                <form onSubmit={handleSubmit} className="mt-10 w-full rounded-2xl border border-gray-200 bg-white p-8 shadow-2xl space-y-8">
                    {/* Step 1: Select Subject */}
                    <div>
                        <label htmlFor="subject-select" className="block text-center text-sm font-medium text-gray-700 mb-3">1. Select a Subject</label>
                        <select
                            id="subject-select"
                            value={selectedSubject}
                            onChange={(e) => handleSubjectChange(e.target.value)}
                            disabled={isLoading}
                            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        >
                            <option value="" disabled>-- Choose a subject --</option>
                            {subjectsData.map(subjectInfo => (
                                <option key={subjectInfo.subject} value={subjectInfo.subject}>
                                    {subjectInfo.subject}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Step 2: Select Difficulty (conditionally rendered) */}
                    {selectedSubject && (
                        <div className="border-t border-gray-200 pt-8">
                            <label className="block text-center text-sm font-medium text-gray-700 mb-3">2. Select a Difficulty Level</label>
                            <div className="grid grid-cols-3 gap-3">
                                <DifficultyButton label="Easy" onClick={() => handleLevelSelect('e')} isActive={selectedLevel === 'e'} disabled={isLoading} />
                                <DifficultyButton label="Medium" onClick={() => handleLevelSelect('m')} isActive={selectedLevel === 'm'} disabled={isLoading} />
                                <DifficultyButton label="Hard" onClick={() => handleLevelSelect('h')} isActive={selectedLevel === 'h'} disabled={isLoading} />
                            </div>
                        </div>
                    )}

                    {/* Step 3: Set Number of Questions (conditionally rendered) */}
                    {selectedSubject && selectedLevel && (
                        <div className="border-t border-gray-200 pt-8">
                            <label className="block text-center text-sm font-medium text-gray-700 mb-3">3. Set Number of Questions (Max: {maxQuestionsForCurrentSubject})</label>
                            <div className="flex items-center gap-4">
                                <input type="range" min="0" max={maxQuestionsForCurrentSubject} value={numQuestions} onChange={(e) => handleCountChange(parseInt(e.target.value, 10))} disabled={isLoading} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                                <input type="number" min="0" max={maxQuestionsForCurrentSubject} value={numQuestions} onChange={(e) => handleCountChange(parseInt(e.target.value, 10))} disabled={isLoading} className="w-20 rounded-md border-gray-300 text-center text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                            </div>
                        </div>
                    )}

                    <div>
                        <button type="submit" disabled={isLoading || !selectedSubject || !selectedLevel || numQuestions === 0} className="mt-4 flex w-full transform-gpu justify-center rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-3.5 text-base font-bold text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30 focus:outline-none focus:ring-4 focus:ring-purple-500/50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100">
                            {isLoading ? <><Spinner /> Creating Test...</> : 'Start Test'}
                        </button>
                    </div>
                </form>
            </div>
    );
};
