'use client';

import { createRevisionTest } from '@/lib/actions/tests.actions';
import { TMistakeAnalysis, TQuestionForRevisionWithUserAnswer } from '@/lib/schema/tests.schema';
import { BookOpen, Target, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { groupQuestionsBySubject, PracticeFooter, QuestionCard } from './HelperComponents';
import { toast } from '@/hooks/use-toast';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {  FileWarning } from 'lucide-react';


export default function MistakeRevisionClient({ mistakeQuestionsData }: { mistakeQuestionsData: TMistakeAnalysis }) {
    const router = useRouter();
    const [selectedIds, setSelectedIds] = useState(new Set<string>());
    const [expandedIds, setExpandedIds] = useState(new Set<string>());
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<'incorrect' | 'unattempted'>('incorrect');

    const incorrectBySubject = useMemo(() => groupQuestionsBySubject(mistakeQuestionsData.incorrectQuestions), [mistakeQuestionsData.incorrectQuestions]);
    const unattemptedBySubject = useMemo(() => groupQuestionsBySubject(mistakeQuestionsData.unattemptedQuestions), [mistakeQuestionsData.unattemptedQuestions]);

    const handleSelectQuestion = (id: string) => {
        setSelectedIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const handleToggleExpand = (id: string) => {
        setExpandedIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const handleStartPractice = async () => {
        setIsLoading(true);
        const {data:testId, message} = await createRevisionTest(Array.from(selectedIds));
        if (!testId) {
            toast({
                variant: 'destructive',
                title: 'Error Starting Test',
                description: message || "Could not create the test. Please try again."
            });
        } else {
            toast({ variant: 'success', title: 'Success!', description: 'Redirecting to your test...' });
            router.push(`/tests/attend/${testId}`);
        }
        setIsLoading(false)
    };

    const renderQuestionList = (questionsBySubject: Record<string, TQuestionForRevisionWithUserAnswer[]>, isUnattempted = false) => {
        const subjects = Object.keys(questionsBySubject).sort();
        
        // Handle the case where there are no questions at all
        if (subjects.length === 0) {
            return (
                <div className="py-16 text-center text-gray-500">
                    <FileWarning className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-semibold">No questions in this category.</p>
                    <p className="mt-1">Great job keeping your mistakes list clear!</p>
                </div>
            );
        }
    
        // Render the list of subjects as an accordion
        return (
            <Accordion type="multiple"  className="w-full space-y-4">
                {subjects.map(subject => (
                    <AccordionItem 
                        key={subject} 
                        value={subject} 
                        className="border-none rounded-xl bg-white dark:bg-gray-800 shadow-sm transition-shadow hover:shadow-md"
                    >
                        <AccordionTrigger className="flex w-full items-center justify-between p-4 text-xl font-bold hover:no-underline">
                            <div className="flex items-center text-left">
                                <BookOpen className="w-6 h-6 mr-4 text-indigo-500 flex-shrink-0"/>
                                <span className="capitalize">{subject.replace(/_/g, ' ')}</span>
                            </div>
                            <Badge variant="secondary" className="ml-4">
                                {questionsBySubject[subject].length} Questions
                            </Badge>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                            <div className="space-y-4 border-t pt-4 dark:border-gray-700">
                                {questionsBySubject[subject].map(q => (
                                    <QuestionCard
                                        key={q.id}
                                        question={q}
                                        isSelected={selectedIds.has(q.id)}
                                        isExpanded={expandedIds.has(q.id)}
                                        onSelect={handleSelectQuestion}
                                        onToggleExpand={handleToggleExpand}
                                        isUnattempted={isUnattempted}
                                    />
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        );
    };
    
    const incorrectCount = mistakeQuestionsData.incorrectQuestions.length;
    const unattemptedCount = mistakeQuestionsData.unattemptedQuestions.length;

    return (
        <div className="w-full">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Mistake Revision</h1>
                <p className="mt-2 text-lg text-gray-600">Select questions from your past tests to start a new practice session.</p>

                <div className="mt-8 border-b border-gray-200">
                    <nav className="flex flex-col md:floex-row -mb-px space-y-3 md:space-y-0 md:space-x-8" aria-label="Tabs">
                        <button
                            onClick={() => setActiveTab('incorrect')}
                            className={`${activeTab === 'incorrect' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                            flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                           <XCircle className="w-5 h-5 mr-2"/> Incorrect Questions
                           <span className="ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">{incorrectCount}</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('unattempted')}
                            className={`${activeTab === 'unattempted' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                            flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            <Target className="w-5 h-5 mr-2"/> Unattempted Questions
                            <span className="ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">{unattemptedCount}</span>
                        </button>
                    </nav>
                </div>

                <div className="py-8 pb-32"> {/* Padding bottom to clear the fixed footer */}
                    {activeTab === 'incorrect' && renderQuestionList(incorrectBySubject, false)}
                    {activeTab === 'unattempted' && renderQuestionList(unattemptedBySubject, true)}
                </div>
            </div>

            <PracticeFooter
                selectedCount={selectedIds.size}
                isLoading={isLoading}
                onStartPractice={handleStartPractice}
            />
        </div>
    );
}
