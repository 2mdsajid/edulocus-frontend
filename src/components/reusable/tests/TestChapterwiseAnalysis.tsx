"use client"

import { CardDescription, CardTitle } from '@/components/ui/card'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { TSubjectWiseChapterScores } from '@/lib/schema/tests.schema'
import { subjectWiseChapterScore } from '@/lib/methods/tests.methods'
import { SubjectScoreBreakdownGraph } from './SubjectScoreBreakdownGraph'
import { ChaptersAccuracyGraph } from '@/app/tests/attend/[id]/_components/ChaptersAccuracyGraph'

type Props = {
    data: TSubjectWiseChapterScores
}

export default function TestChapterwiseAnalysis({ data }: Props) {
    const eachSubjectData = subjectWiseChapterScore(data)

    return (
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8 mt-10 border-t-8 border-purple-500">
            <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">
                Individual Subjects
            </h2>

            <Accordion type="multiple" className="w-full [&>*:not(:first-child)]:mt-px">
                {eachSubjectData.sort().map((subject) => {
                    // Calculate subject statistics
                    const totalQuestions = subject.total;
                    const correctAnswers = subject.correct;
                    const incorrectAnswers = subject.incorrect;
                    const unattemptedQuestions = subject.unattempt;

                    // Find highest and lowest scoring chapters
                    const chapterScores = subject.chapterAccuracies.map((data) => ({
                        name: data.chapter,
                        accuracy: data.accuracy
                    }));

                    const sortedChapters = [...chapterScores].sort((a, b) => b.accuracy - a.accuracy);
                    const bestChapters = sortedChapters;
                    const improveChapters = [...sortedChapters].reverse();

                    const allHaveFullAccuracy = chapterScores.every(chapter => chapter.accuracy === 100);
                    const allHaveZeroAccuracy = chapterScores.every(chapter => chapter.accuracy === 0);

                    const highestChapter = sortedChapters[0];
                    const lowestChapter = sortedChapters[sortedChapters.length - 1];

                    return (
                        <AccordionItem key={subject.name} value={subject.name} className="border-b">
                            <AccordionTrigger className="text-black hover:no-underline">
                                {subject.name.replace('_', ' ').toUpperCase()}
                            </AccordionTrigger>
                            <AccordionContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                                <div className="flex flex-col gap-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg">
                                        <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                                            <h3 className="font-semibold text-lg mb-2">Overview</h3>
                                            <div className="space-y-2">
                                                <p>Total Questions: <span className="font-bold">{totalQuestions}</span></p>
                                                <p>Correct: <span className="font-bold text-green-600">{correctAnswers}</span></p>
                                                <p>Incorrect: <span className="font-bold text-red-600">{incorrectAnswers}</span></p>
                                                <p>Unattempted: <span className="font-bold text-yellow-600">{unattemptedQuestions}</span></p>
                                            </div>
                                        </div>

                                        {allHaveFullAccuracy ? (
                                            <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                                                <h3 className="font-semibold text-lg mb-2">Best Performance</h3>
                                                {sortedChapters.map((chapter, i) => (
                                                    <div key={i}>
                                                        <p className="font-bold">{chapter.name.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} - {chapter.accuracy.toFixed(1)}%</p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : allHaveZeroAccuracy ? (
                                            <div className="p-4 bg-red-50 dark:bg-red-900 rounded-lg">
                                                <h3 className="font-semibold text-lg mb-2">Needs Improvement</h3>
                                                {sortedChapters.map((chapter, i) => (
                                                    <div key={i}>
                                                        <p className="font-bold">{chapter.name.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} - {chapter.accuracy.toFixed(1)}%</p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <>
                                                <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                                                    <h3 className="font-semibold text-lg mb-2">Best Performance</h3>
                                                    {bestChapters.filter(c => c.accuracy === highestChapter.accuracy).map((chapter, i) => (
                                                        <div key={i}>
                                                            <p className="font-bold">{chapter.name.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} - {chapter.accuracy.toFixed(1)}%</p>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="p-4 bg-red-50 dark:bg-red-900 rounded-lg">
                                                    <h3 className="font-semibold text-lg mb-2">Needs Improvement</h3>
                                                    {improveChapters.filter(c => c.accuracy === lowestChapter.accuracy).map((chapter, i) => (
                                                        <div key={i}>
                                                            <p className="font-bold">{chapter.name.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} - {chapter.accuracy.toFixed(1)}%</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    <SubjectScoreBreakdownGraph
                                        data={subject}
                                    />
                                    <ChaptersAccuracyGraph
                                        data={subject.chapterAccuracies}
                                    />
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    )
                })}
            </Accordion>
        </div>
    )
}