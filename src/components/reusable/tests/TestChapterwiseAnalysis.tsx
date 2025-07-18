"use client"

import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { TSubjectWiseChapterScores, TScoreBreakdown, TChapterAccuracy, TIndividualSubjectScores } from '@/lib/schema/tests.schema';
import { CheckCircle, XCircle, HelpCircle, Target } from "lucide-react";


// This function ensures the data structure is clean and safe before rendering.
export function processScoreData(data: TSubjectWiseChapterScores): TIndividualSubjectScores[] {
    const result: TIndividualSubjectScores[] = [];
    if (!data || typeof data !== 'object') {
        return []; // Return empty array if data is invalid
    }

    for (const subjectKey in data) {
        if (Object.prototype.hasOwnProperty.call(data, subjectKey)) {
            const subjectName = String(subjectKey || 'Unnamed Subject');
            const subjectData = data[subjectKey];
            
            let total = 0, correct = 0, incorrect = 0, unattempt = 0;
            const chapterAccuracies: TChapterAccuracy[] = [];

            if (subjectData && typeof subjectData === 'object') {
                for (const chapterKey in subjectData) {
                    if (Object.prototype.hasOwnProperty.call(subjectData, chapterKey)) {
                        const chapterName = String(chapterKey || 'Unnamed Chapter');
                        const chapterData = subjectData[chapterKey];

                        if (chapterData && typeof chapterData.total === 'number') {
                             total += chapterData.total;
                             correct += chapterData.correct;
                             incorrect += chapterData.incorrect;
                             unattempt += chapterData.unattempt;

                             const accuracy = chapterData.total > 0 ? (chapterData.correct / chapterData.total) * 100 : 0;
                             chapterAccuracies.push({ chapter: chapterName, accuracy });
                        }
                    }
                }
            }
            result.push({ name: subjectName, total, correct, incorrect, unattempt, chapterAccuracies });
        }
    }
    return result;
}

// Helper for presentation formatting (capitalization, etc.)
const formatNameForDisplay = (name: string): string => {
    return name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};


const SimpleBreakdownChart = ({ data }: { data: TIndividualSubjectScores }) => {
    const items = [
        { label: 'Correct', value: data.correct, color: 'bg-green-500' },
        { label: 'Incorrect', value: data.incorrect, color: 'bg-red-500' },
        { label: 'Unattempted', value: data.unattempt, color: 'bg-yellow-500' },
    ];
    const total = Math.max(1, data.total); // Avoid division by zero

    return (
        <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
            {items.map(item => (
                <div key={item.label} className="flex items-center">
                    <span className="w-28 text-sm text-gray-600 dark:text-gray-400">{item.label}</span>
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-5">
                        <div
                            className={`${item.color} h-5 rounded-full flex items-center justify-center text-white text-xs font-bold`}
                            style={{ width: `${(item.value / total) * 100}%` }}
                        >
                           {item.value}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

// A simple, dependency-free list with progress bars for chapter accuracy
const ChapterAccuracyList = ({ chapters }: { chapters: TChapterAccuracy[] }) => {
    return (
         <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
            {chapters.map(({ chapter, accuracy }) => {
                const color = accuracy >= 75 ? 'bg-green-500' : accuracy >= 40 ? 'bg-yellow-500' : 'bg-red-500';
                return (
                    <div key={chapter} className="flex items-center">
                        <p className="w-2/5 truncate pr-4 text-sm font-medium text-gray-600 dark:text-gray-400">{formatNameForDisplay(chapter)}</p>
                        <div className="w-3/5 flex items-center">
                            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                <div className={`${color} h-2.5 rounded-full`} style={{ width: `${accuracy}%` }}></div>
                            </div>
                            <span className="ml-4 w-16 text-right font-semibold text-sm text-gray-800 dark:text-gray-200">{accuracy.toFixed(1)}%</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};


// --- 3. MAIN COMPONENT ---
type Props = {
    data: TSubjectWiseChapterScores
}

export default function TestChapterwiseAnalysis({ data }: Props) {
    const eachSubjectData = React.useMemo(() => processScoreData(data), [data]);

    if (!eachSubjectData || eachSubjectData.length === 0) {
        return (
            <div className="w-full max-w-4xl p-8 mt-10 text-center text-gray-500 bg-white rounded-2xl shadow-lg">
                <h3 className="text-xl font-semibold">No Chapter Data Available</h3>
                <p>Could not generate a chapter-wise analysis for this test.</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-6xl mx-auto mt-10">
            <div className="p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 text-center">
                    Subject Performance Breakdown
                </h2>
                <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
                    Expand each subject to see a detailed analysis of your performance by chapter.
                </p>

                <Accordion type="multiple" className="w-full">
                    {[...eachSubjectData]
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((subject) => {
                            const sortedChapters = [...subject.chapterAccuracies].sort((a, b) => b.accuracy - a.accuracy);

                            return (
                                <AccordionItem key={subject.name} value={subject.name} className="border-b-2 border-gray-100 dark:border-gray-700 last:border-b-0">
                                    <AccordionTrigger className="text-xl font-semibold text-gray-700 dark:text-gray-200 hover:no-underline py-5">
                                        {formatNameForDisplay(subject.name)}
                                    </AccordionTrigger>
                                    <AccordionContent className="pt-4 pb-8 px-2 space-y-8">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
                                            <div>
                                                <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Score Breakdown</h3>
                                                <SimpleBreakdownChart data={subject} />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Chapter Accuracy</h3>
                                                <ChapterAccuracyList chapters={sortedChapters} />
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            );
                        })}
                </Accordion>
            </div>
        </div>
    );
}
