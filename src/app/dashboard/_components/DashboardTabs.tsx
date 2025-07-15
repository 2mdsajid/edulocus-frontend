import { TDashboardAnalyticData } from "@/lib/schema/analytics.schema";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // from shadcn/ui
import { ChapterPerformanceCard, DailyProgressChart, KeyMetrics, RecentTestsList, ScoreCompositionChart, SubjectPerformanceCard } from "./Components";

type DashboardTabsProps = {
    analyticsData: TDashboardAnalyticData;
};

export const DashboardTabs = ({ analyticsData }: DashboardTabsProps) => {
    return (
        <Tabs defaultValue="analysis" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:w-[400px] bg-gray-200">
                <TabsTrigger value="analysis">Analysis</TabsTrigger>
                <TabsTrigger value="chapters">Chapter Analysis</TabsTrigger>
                {/* <TabsTrigger value="settings">Settings</TabsTrigger> */}
            </TabsList>
            <TabsContent value="analysis" className="mt-6">
                <AnalysisTab data={analyticsData} />
            </TabsContent>
            <TabsContent value="chapters" className="mt-6">
                <ChapterAnalysisTab data={analyticsData} />
            </TabsContent>
            <TabsContent value="settings" className="mt-6">
                <SettingsTab />
            </TabsContent>
        </Tabs>
    );
};




type AnalysisTabProps = {
    data: TDashboardAnalyticData;
};


export const AnalysisTab = ({ data }: AnalysisTabProps) => {
    return (
        <div className="space-y-6">
            {/* Top row with key metrics and score composition */}
            <KeyMetrics
                totalTests={data.totalTests}
                totalQuestions={data.totalQuestionsAttempt- data.totalUnattemptQuestions}
                accuracy={data.averageAccuracy}
                totalCorrectAnswers={data.totalCorrectAnswers}
            />
            <ScoreCompositionChart
                data={data.scoreParametersData}
            />

            
            {/* Middle row with performance insights */}
            {/* Render the self-contained subject practice card */}
            <SubjectPerformanceCard stats={data.performance.subjects.stats} />

            {/* Loop through subjects to render a self-contained chapter practice card for each */}
            {/* {Object.entries(data.performance.chapters.stats).map(([subjectName, chapterStats]) => (
                <ChapterPerformanceCard
                    key={subjectName}
                    subjectName={subjectName}
                    chapterStats={chapterStats}
                />
            ))} */}


            {/* Bottom row with daily progress and recent tests */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3">
                    <DailyProgressChart data={data.dailyTestProgressChartData} />
                </div>
                <div className="lg:col-span-2">
                    <RecentTestsList tests={data.recentTests} />
                </div>
            </div>
        </div>
    );
};

export const ChapterAnalysisTab = ({ data }: AnalysisTabProps) => {
    return (
        <div className="space-y-6">
            {/* <SubjectPerformanceCard stats={data.performance.subjects.stats} /> */}

            {/* Loop through subjects to render a self-contained chapter practice card for each */}
            {Object.entries(data.performance.chapters.stats).map(([subjectName, chapterStats]) => (
                <ChapterPerformanceCard
                    key={subjectName}
                    subjectName={subjectName}
                    chapterStats={chapterStats}
                />
            ))}
        </div>
    );
};



export const SettingsTab = () => {
    return (
        <Card className="shadow-sm">
            <CardHeader>
                <CardTitle>Settings</CardTitle>
                <p className="text-sm text-gray-500">Manage your account and preferences.</p>
            </CardHeader>
            <CardContent>
                <p>Settings page is under construction.</p>
            </CardContent>
        </Card>
    );
};
