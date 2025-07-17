
import React, { useMemo, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { TPerformanceAnalyzerTest } from '@/lib/schema/tests.schema'; // Import your types
import { TPerformanceInsight, TPerformanceStat } from '@/lib/schema/analytics.schema';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { startChapterWiseTest } from '@/lib/actions/tests.actions';

const formatName = (name: string) => name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

// A simple card wrapper for consistent styling
export const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={`rounded-2xl border border-gray-200 bg-white p-6 shadow-lg ${className}`}>
        {children}
    </div>
);

// Component for displaying top/weakest insights
export const InsightsList = ({ title, insights, color }: { title: string; insights: TPerformanceInsight[]; color: 'green' | 'red' }) => (
    <div>
        <h4 className="font-semibold text-gray-700 mb-2">{title}</h4>
        <ul className="space-y-2">
            {insights.length > 0 ? insights.map(insight => (
                <li key={insight.name} className="flex justify-between items-center text-sm">
                    <span>{insight.name}</span>
                    <span className={`font-bold ${color === 'green' ? 'text-green-600' : 'text-red-600'}`}>
                        {insight.accuracy}%
                    </span>
                </li>
            )) : <p className="text-sm text-gray-500">Not enough data.</p>}
        </ul>
    </div>
);


export const OverallPerformanceCard = ({ subjectStats }: { subjectStats: TPerformanceAnalyzerTest['performance']['subjects']['stats'] }) => {
    const overall = useMemo(() => {
        let total = 0, correct = 0, incorrect = 0, unattempted = 0;
        Object.values(subjectStats).forEach(stat => {
            total += stat.total;
            correct += stat.correct;
            incorrect += stat.incorrect;
            unattempted += stat.unattempted;
        });
        const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
        return { total, correct, incorrect, unattempted, accuracy };
    }, [subjectStats]);

    const chartData = [
        { name: 'Correct', value: overall.correct, fill: '#10B981' },
        { name: 'Incorrect', value: overall.incorrect, fill: '#EF4444' },
        { name: 'Unattempted', value: overall.unattempted, fill: '#6B7280' },
    ];

    return (
        <Card className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Overall Performance</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="sm:col-span-1 h-48">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart innerRadius="60%" outerRadius="100%" barSize={15} data={chartData} startAngle={90} endAngle={-270}>
                            <RadialBar background dataKey="value" />
                            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-3xl font-bold fill-gray-800">
                                {overall.accuracy}%
                            </text>
                            <text x="50%" y="65%" textAnchor="middle" dominantBaseline="middle" className="text-sm fill-gray-500">
                                Accuracy
                            </text>
                        </RadialBarChart>
                    </ResponsiveContainer>
                </div>
                <div className="sm:col-span-2 grid grid-cols-2 gap-4 content-center">
                    <div className="text-center p-2 rounded-lg bg-gray-50">
                        <p className="text-2xl font-bold text-gray-800">{overall.total}</p>
                        <p className="text-sm text-gray-500">Total Questions</p>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-green-50">
                        <p className="text-2xl font-bold text-green-600">{overall.correct}</p>
                        <p className="text-sm text-green-500">Correct</p>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-red-50">
                        <p className="text-2xl font-bold text-red-600">{overall.incorrect}</p>
                        <p className="text-sm text-red-500">Incorrect</p>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-gray-100">
                        <p className="text-2xl font-bold text-gray-600">{overall.unattempted}</p>
                        <p className="text-sm text-gray-500">Unattempted</p>
                    </div>
                </div>
            </div>
        </Card>
    );
};

// 2. Subject Performance Bar Chart
export const SubjectPerformanceChart = ({ subjectStats }: { subjectStats: TPerformanceAnalyzerTest['performance']['subjects']['stats'] }) => {
    const chartData = useMemo(() => {
        return Object.entries(subjectStats).map(([name, stats]) => ({
            name,
            Accuracy: stats.accuracy,
            fill: stats.fill,
        }));
    }, [subjectStats]);

    return (
        <Card className="col-span-1 md:col-span-3">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Subject Accuracy</h3>
            <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis unit="%" />
                        <Tooltip cursor={{ fill: 'rgba(238, 242, 255, 0.6)' }} />
                        <Legend />
                        <Bar dataKey="Accuracy" barSize={30} radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};

const ChapterListItem = ({ chapter, stats, subject }: { chapter: string; stats: TPerformanceStat; subject: string; }) => {
    const router = useRouter();
    const [isBtnClicked, setIsbtnClicked] = useState(false);

    const startTest = async () => {
        setIsbtnClicked(true);
        const { data: testId, message } = await startChapterWiseTest(subject, chapter, 'CHAPTER_WISE');
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
        setIsbtnClicked(false);
    };

    return (
        <li className="flex flex-col sm:flex-row justify-between items-center text-sm border-b py-3 gap-3">
            <div className="w-full sm:w-auto flex-grow">
                <div className="font-medium text-gray-800">{formatName(chapter)}</div>
                <div className="text-xs text-gray-500">
                    Accuracy: <span className="font-semibold">{stats.accuracy}%</span> ({stats.correct}/{stats.total} Correct)
                </div>
            </div>
            <button
                onClick={startTest}
                disabled={isBtnClicked}
                className="w-full sm:w-auto flex-shrink-0 rounded-md bg-indigo-100 px-4 py-2 text-xs font-semibold text-indigo-700 shadow-sm transition-all hover:bg-indigo-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isBtnClicked ? 'Starting...' : 'Start Test'}
            </button>
        </li>
    );
};

export const ChapterPerformanceAccordion = ({ chaptersData }: { chaptersData: TPerformanceAnalyzerTest['performance']['chapters'] }) => {
    const [openSubject, setOpenSubject] = useState<string | null>(Object.keys(chaptersData.stats)[0] || null);

    return (
        <div className="col-span-1 md:col-span-5">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center md:text-left">Chapter-wise Breakdown</h3>
            <div className="space-y-4">
                {Object.keys(chaptersData.stats).map(subject => (
                    <Card key={subject} className="overflow-hidden transition-all duration-500">
                        <button
                            onClick={() => setOpenSubject(openSubject === subject ? null : subject)}
                            className="w-full flex justify-between items-center text-left p-2 -m-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <span className="text-xl font-bold text-gray-800">{formatName(subject)}</span>
                            <svg className={`w-6 h-6 transform transition-transform text-gray-500 ${openSubject === subject ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </button>
                        {openSubject === subject && (
                            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-6">
                                <div className="lg:col-span-2">
                                    <h4 className="font-semibold text-gray-700 mb-2">Chapter Stats</h4>
                                    <ul className="space-y-1">
                                        {Object.entries(chaptersData.stats[subject]).map(([chapter, stats]) => (
                                            <ChapterListItem key={chapter} chapter={chapter} stats={stats} subject={subject} />
                                        ))}
                                    </ul>
                                </div>
                                <div className="lg:col-span-1 space-y-4 border-t lg:border-t-0 lg:border-l lg:pl-6 pt-4 lg:pt-0">
                                    <InsightsList title="Top Chapters" insights={chaptersData.insights[subject]?.top || []} color="green" />
                                    <InsightsList title="Weakest Chapters" insights={chaptersData.insights[subject]?.weakest || []} color="red" />
                                </div>
                            </div>
                        )}
                    </Card>
                ))}
            </div>
        </div>
    );
};