'use client';

import { TPerformanceAnalyzerTest } from '@/lib/schema/tests.schema'; // Import your types
import { OverallPerformanceCard, Card, InsightsList, SubjectPerformanceChart, ChapterPerformanceAccordion } from './HelperComponents';

type Props = {
    data:TPerformanceAnalyzerTest
}

export const PerformanceAnalyzerClientPage = (props:Props) => {
    const { data } = props;

    return (
        <div className="min-h-screen w-full p-4 pt-20 sm:p-6 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl">Performance Analysis</h1>
                    <p className="mt-4 text-lg text-gray-600">Here&apos;s a detailed breakdown of your strengths and weaknesses.</p>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                    <OverallPerformanceCard subjectStats={data.performance.subjects.stats} />
                    {/* <Card className="col-span-1 md:col-span-3 space-y-6">
                        <h3 className="text-2xl font-bold text-gray-800">Subject Insights</h3>
                        <InsightsList title="Top Subjects" insights={data.performance.subjects.insights.top} color="green" />
                        <InsightsList title="Weakest Subjects" insights={data.performance.subjects.insights.weakest} color="red" />
                    </Card> */}
                    {/* <SubjectPerformanceChart subjectStats={data.performance.subjects.stats} /> */}
                    <ChapterPerformanceAccordion chaptersData={data.performance.chapters} />
                </div>
            </div>
        </div>
    );
};
