"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart";
import { TDailyTestProgressChartData, TPerformanceInsight, TPerformanceStat, TScoreParameter } from "@/lib/schema/analytics.schema";
import { BookOpen, CheckCircle, ChevronDown, ChevronUp, Folder, HelpCircle, RotateCw, Target, TrendingDown, TrendingUp, Trophy, Eye, Loader2, PlayCircle } from "lucide-react";
import React, { useMemo, useState } from 'react';
import { Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { TRecentTestInDashboardData } from "@/lib/schema/users.schema";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { startChapterWiseTest, startSubjectWiseTest } from "@/lib/actions/tests.actions";


/* --------- THEME-COLORS (feel free to tweak) --------- */
const COLORS = {
    correct: '#10b981',   // emerald-500
    incorrect: '#f43f5e',   // rose-500
    unattempt: '#8b5cf6',   // violet-500
};

const COLORS_CHART = {
    correct: 'hsl(var(--emerald))',
    incorrect: 'hsl(var(--rose))',
    unattempt: 'hsl(var(--violet))',
};

const chartConfig = {
    correct: { label: "Correct", color: "hsl(var(--emerald))" },
    incorrect: { label: "Incorrect", color: "hsl(var(--rose))" },
    unattempt: { label: "Unattempted", color: "hsl(var(--violet))" },
} satisfies ChartConfig;

/* ---------- METRIC CARDS ---------- */
type MetricCardProps = {
    title: string;
    value: number | string;
    icon: React.ElementType;
    unit?: string;
    colorClasses: string; // e.g., "text-blue-600 bg-blue-100"

};

const MetricCard = ({ title, value, icon: Icon, colorClasses }: MetricCardProps) => (
    <Card className={`shadow-sm hover:shadow-md transition-shadow duration-300 ${colorClasses}`}>
        <CardContent className="pt-6">
            <div className={`flex items-center justify-between `}>
                <p className="text-sm font-medium text-gray-600">{title}</p>
                <div className={`p-2 rounded-lg ${colorClasses}`}>
                    <Icon className="h-5 w-5" />
                </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
        </CardContent>
    </Card>
);


type KeyMetricsProps = {
    totalTests: number;
    totalQuestions: number;
    totalCorrectAnswers: number;
    accuracy: number;
};


export const KeyMetrics = ({ totalTests, totalQuestions, totalCorrectAnswers, accuracy }: KeyMetricsProps) => {
    return (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <MetricCard
                title="Total Tests Taken"
                value={totalTests}
                icon={Target}
                colorClasses="bg-blue-100 text-blue-600"
            />
            <MetricCard
                title="Questions Attempted"
                value={totalQuestions}
                icon={HelpCircle}
                colorClasses="bg-purple-100 text-purple-600"
            />
            <MetricCard
                title="Correct Answers"
                value={totalCorrectAnswers}
                icon={Trophy}
                colorClasses="bg-green-100 text-green-600"
            />
            <MetricCard
                title="Overall Accuracy"
                value={`${accuracy}%`}
                icon={CheckCircle}
                colorClasses="bg-teal-100 text-teal-600"
            />
        </div>
    );
};

/* ---------- SCORE COMPOSITION (Pie) ---------- */
type ScoreCompositionChartProps = { data: TScoreParameter[] };

export const ScoreCompositionChart = ({ data }: ScoreCompositionChartProps) => {
    const chartData = data.map(item => ({
        name: item.name,
        value: item.value,
        fill: COLORS_CHART[item.name as keyof typeof COLORS_CHART],
    }));
    const totalValue = React.useMemo(() => data.reduce((a, c) => a + c.value, 0), [data]);

    return (
        <Card className="bg-gradient-to-br from-slate-50 to-slate-100 shadow-md hover:shadow-xl transition-all">
            <CardHeader className="items-center pb-0">
                <CardTitle className="text-lg font-bold text-indigo-700">Questions Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer config={chartConfig} className="mx-auto aspect-square h-full max-h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                            <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="name"
                                innerRadius="60%"
                                strokeWidth={5}
                                label={({ cx, cy }) => (
                                    <text x={cx} y={cy} fill="#1e293b" textAnchor="middle" dominantBaseline="central">
                                        <tspan x={cx} y={cy} className="text-3xl font-bold">{totalValue.toLocaleString()}</tspan>
                                        <tspan x={cx} y={cy + 20} className="text-sm text-slate-600">Total</tspan>
                                    </text>
                                )}
                                labelLine={false}
                            >
                                {chartData.map((entry, idx) => (
                                    <Cell key={`cell-${idx}`} fill={entry.fill} />
                                ))}
                            </Pie>
                            <ChartLegend 
  content={({ payload }) => <ChartLegendContent payload={payload as any} nameKey="name" />}
  className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center" 
/>
                            </PieChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

// SUBJECT WISE PERFORMANCE
const InsightList = ({ title, items, trendIcon: TrendIcon, trendColor }: { title: string; items: TPerformanceInsight[]; trendIcon: React.ElementType; trendColor: string; }) => (
    <div className="flex-1 min-w-[200px]">
        <h3 className={`flex items-center text-md font-bold mb-3 ${trendColor}`}><TrendIcon className="w-5 h-5 mr-2" />{title}</h3>
        <ul className="space-y-2">
            {items.length > 0 ? items.map(item => (
                <li key={item.name} className="flex items-center justify-between bg-gradient-to-r from-rose-50 to-amber-50 p-3 rounded-xl border border-rose-200">
                    <div className="flex items-center overflow-hidden">
                        <BookOpen className="w-4 h-4 mr-3 text-indigo-600 flex-shrink-0" />
                        <span className="text-sm font-semibold text-indigo-800 truncate" title={item.name}>{item.name.replace(/_/g, ' ')}</span>
                    </div>
                    <span className="text-sm font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-500 ml-2">{item.accuracy}%</span>
                </li>
            )) : <p className="text-sm text-gray-500 p-3">Not enough data.</p>}
        </ul>
    </div>
);

type SubjectPerformanceCardProps = {
    stats: Record<string, TPerformanceStat>;
};

export const SubjectPerformanceCard = ({ stats }: SubjectPerformanceCardProps) => {
    const [isLoading, setIsLoading] = useState<string | null>(null);
    const [showAll, setShowAll] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const { sortedList, strongest, weakest } = useMemo(() => {
        const sorted = Object.entries(stats).map(([name, data]) => ({ name, ...data })).sort((a, b) => b.accuracy - a.accuracy);
        return {
            sortedList: sorted,
            strongest: sorted.slice(0, 3),
            weakest: sorted.length > 3 ? sorted.slice(-3).reverse() : sorted.slice().reverse(),
        };
    }, [stats]);

    const handleStartTest = async (subjectName: string) => {
        setIsLoading(subjectName);
        try {
            const { data: testId, message } = await startSubjectWiseTest(subjectName, 'SUBJECT_WISE');
            if (!testId) toast({ variant: 'destructive', title: 'Error', description: message });
            else router.push(`/tests/attend/${testId}`);
        } catch (error) {
            toast({ variant: 'destructive', title: 'Error', description: 'Could not start test.' });
        } finally {
            setIsLoading(null);
        }
    };

    return (
        <Card className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 shadow-md">
            <CardHeader>
                <CardTitle className="text-xl font-bold text-indigo-800">Subject Performance</CardTitle>
                <p className="text-sm text-indigo-600">Your top and bottom performing subjects.</p>
            </CardHeader>
            <CardContent>
                {/* Section 1: Insights */}
                <div className="flex flex-col sm:flex-row gap-6">
                    <InsightList title="Strongest" items={strongest} trendIcon={TrendingUp} trendColor="text-emerald-600" />
                    <InsightList title="Weakest" items={weakest} trendIcon={TrendingDown} trendColor="text-rose-600" />
                </div>

                {/* Section 2: Practice Weaknesses */}
                {weakest.length > 0 && (
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold text-purple-700 mb-4 text-center">Practice Your Weaknesses</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {weakest.map(item => (
                                <Button key={item.name} variant="outline" className="w-full justify-start p-3 h-auto bg-white/60" onClick={() => handleStartTest(item.name)} disabled={!!isLoading}>
                                    {isLoading === item.name ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <PlayCircle className="w-4 h-4 mr-2 text-purple-600" />}
                                    <div className="text-left"><p className="text-sm font-semibold text-purple-800">{item.name.replace(/_/g, ' ')}</p><p className="text-xs text-purple-500">{item.accuracy}% Accuracy</p></div>
                                </Button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Section 3: View All */}
                {sortedList.length > 3 && (
                    <div className="mt-6 text-center">
                        <Button variant="outline" onClick={() => setShowAll(!showAll)} className="bg-white/50">{showAll ? 'Show Less' : 'View All'}{showAll ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}</Button>
                    </div>
                )}
                {showAll && (
                    <div className="mt-6"><h3 className="text-lg font-semibold text-purple-700 mb-4 text-center">Full Breakdown</h3><ul className="space-y-2 max-h-60 overflow-y-auto pr-2">{sortedList.map(item => (<li key={item.name} className="flex items-center justify-between bg-white/70 p-3 rounded-lg"><span className="text-sm font-medium text-gray-700 truncate">{item.name.replace(/_/g, ' ')}</span><span className={`text-sm font-bold ${item.accuracy >= 75 ? 'text-green-600' : item.accuracy >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>{item.accuracy}%</span></li>))}</ul></div>
                )}
            </CardContent>
        </Card>
    );
};



// CHAPTERWISE PERFORMANCE

type ChapterPerformanceCardProps = {
    subjectName: string;
    chapterStats: Record<string, TPerformanceStat>;
};

export const ChapterPerformanceCard = ({ subjectName, chapterStats }: ChapterPerformanceCardProps) => {
    const [isLoading, setIsLoading] = useState<string | null>(null);
    const [showAll, setShowAll] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const { sortedList, strongest, weakest } = useMemo(() => {
        const sorted = Object.entries(chapterStats).map(([name, data]) => ({ name, ...data })).sort((a, b) => b.accuracy - a.accuracy);
        return {
            sortedList: sorted,
            strongest: sorted.slice(0, 3),
            weakest: sorted.length > 3 ? sorted.slice(-3).reverse() : sorted.slice().reverse(),
        };
    }, [chapterStats]);

    const handleStartTest = async (chapterName: string) => {
        setIsLoading(chapterName);
        try {
            const { data: testId, message } = await startChapterWiseTest(subjectName, chapterName, 'CHAPTER_WISE');
            if (!testId) toast({ variant: 'destructive', title: 'Error', description: message });
            else router.push(`/tests/attend/${testId}`);
        } catch (error) {
            toast({ variant: 'destructive', title: 'Error', description: 'Could not start test.' });
        } finally {
            setIsLoading(null);
        }
    };

    return (
        <Card className="bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50 shadow-md">
            <CardHeader>
                <CardTitle className="text-xl font-bold text-teal-800">Chapter Performance in {subjectName.replace(/_/g, ' ')}</CardTitle>
                <p className="text-sm text-teal-600">Your top and bottom performing chapters in this subject.</p>
            </CardHeader>
            <CardContent>
                {/* Section 1: Insights */}
                <div className="flex flex-col sm:flex-row gap-6">
                    <InsightList title="Strongest" items={strongest} trendIcon={TrendingUp} trendColor="text-emerald-600" />
                    <InsightList title="Weakest" items={weakest} trendIcon={TrendingDown} trendColor="text-rose-600" />
                </div>

                {/* Section 2: Practice Weaknesses */}
                {weakest.length > 0 && (
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold text-teal-700 mb-4 text-center">Practice Weakest Chapters</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {weakest.map(item => (
                                <Button key={item.name} variant="outline" className="w-full justify-start p-3 h-auto bg-white/60" onClick={() => handleStartTest(item.name)} disabled={!!isLoading}>
                                    {isLoading === item.name ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <PlayCircle className="w-4 h-4 mr-2 text-teal-600" />}
                                    <div className="text-left"><p className="text-sm font-semibold text-teal-800">{item.name.replace(/_/g, ' ')}</p><p className="text-xs text-teal-500">{item.accuracy}% Accuracy</p></div>
                                </Button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Section 3: View All */}
                {sortedList.length > 3 && (
                    <div className="mt-6 text-center">
                        <Button variant="outline" onClick={() => setShowAll(!showAll)} className="bg-white/50">{showAll ? 'Show Less' : 'View All'}{showAll ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}</Button>
                    </div>
                )}
                {showAll && (
                    <div className="mt-6"><h3 className="text-lg font-semibold text-teal-700 mb-4 text-center">Full Breakdown</h3><ul className="space-y-2 max-h-60 overflow-y-auto pr-2">{sortedList.map(item => (<li key={item.name} className="flex items-center justify-between bg-white/70 p-3 rounded-lg"><span className="text-sm font-medium text-gray-700 truncate">{item.name.replace(/_/g, ' ')}</span><span className={`text-sm font-bold ${item.accuracy >= 75 ? 'text-green-600' : item.accuracy >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>{item.accuracy}%</span></li>))}</ul></div>
                )}
            </CardContent>
        </Card>
    );
};

/* ---------- DAILY PROGRESS CHART ---------- */
type DailyProgressChartProps = { data: TDailyTestProgressChartData[] };

export const DailyProgressChart = ({ data }: DailyProgressChartProps) => (
    <Card className="bg-gradient-to-br from-sky-50 to-indigo-50 shadow-md hover:shadow-xl transition-all">
        <CardHeader>
            <CardTitle className="text-lg font-bold text-sky-800">Daily Progress</CardTitle>
            <p className="text-sm text-sky-600">Average test score over the last few days.</p>
        </CardHeader>
        <CardContent className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                    <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                    <XAxis dataKey="date" tick={{ fill: '#334155', fontSize: 12 }} />
                    <YAxis unit="%" width={30} tick={{ fill: '#334155', fontSize: 12 }} />
                    <Tooltip
                        contentStyle={{
                            background: "white",
                            border: "1px solid #e2e8f0",
                            borderRadius: "0.5rem",
                        }}
                    />
                    <Area type="monotone" dataKey="score" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorScore)" />
                </AreaChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
);



/* ----------Recent Tests ----------*/
type RecentTestsListProps = {
    tests: TRecentTestInDashboardData[];
};

export const RecentTestsList = ({ tests }: RecentTestsListProps) => {
    // State to manage whether all tests are shown
    const [showAll, setShowAll] = useState(false);

    // Determine which tests to display based on the state
    const displayedTests = showAll ? tests : tests.slice(0, 5);

    return (
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">Recent Tests</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
                {tests.length > 0 ? (
                    <>
                        {/* The list now has a max height and will scroll if needed when expanded */}
                        <div className="flex-grow space-y-4 overflow-y-auto max-h-[450px] pr-2">
                            {displayedTests.map(test => (
                                <li key={test.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200/80 list-none">
                                    {/* Test Info Section */}
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start">
                                            <FileText className="w-5 h-5 mr-4 text-gray-500 mt-1 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900 leading-tight">{test.name}</p>
                                                <p className="text-xs text-gray-500 mt-1">{new Date(test.date).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className={`font-bold text-sm ml-2 ${test.score >= 50 ? 'text-green-600' : 'text-red-600'}`}>
                                            {test.score}%
                                        </div>
                                    </div>

                                    {/* Action Buttons Section */}
                                    <div className="mt-4 flex gap-3">
                                        <Link href={`/dashboard/view/${test.id}`} className="flex-1">
                                            <Button variant="outline" size="sm" className="w-full">
                                                <Eye className="w-4 h-4 mr-2" />
                                                View
                                            </Button>
                                        </Link>
                                        <Link href={`/tests/retake/${test.id}`} className="flex-1">
                                            <Button variant="default" size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                                                <RotateCw className="w-4 h-4 mr-2" />
                                                Re-attempt
                                            </Button>
                                        </Link>
                                    </div>
                                </li>
                            ))}
                        </div>

                        {/* "View More" / "Show Less" button, only shown if there are more than 5 tests */}
                        {tests.length > 5 && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <Button
                                    variant="ghost"
                                    className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                    onClick={() => setShowAll(!showAll)}
                                >
                                    {showAll ? 'Show Less' : `View All ${tests.length} Tests`}
                                    {showAll ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
                                </Button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-sm text-gray-500">No recent tests found.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};