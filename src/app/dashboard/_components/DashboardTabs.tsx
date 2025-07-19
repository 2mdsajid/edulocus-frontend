'use client';

import { TDashboardAnalyticData } from "@/lib/schema/analytics.schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Bookmark, Settings } from "lucide-react";
import React, { useState } from 'react';
import { ChapterPerformanceCard, DailyProgressChart, KeyMetrics, RecentTestsList, ScoreCompositionChart, SubjectPerformanceCard } from "./Components";
import ChangeStreamForm from "./ChangeStreamForm";
import { TBaseUser, TStream } from "@/lib/schema/users.schema";

// Define the types for the tab content components' props
type AnalysisTabProps = {
    data: TDashboardAnalyticData;
};

// =================================================================================
// Tab Content Components (Can be in this file or imported from elsewhere)
// =================================================================================

const AnalysisTab = ({ data }: AnalysisTabProps) => {
    return (
        <div className="space-y-6 animate-fade-in">
            <KeyMetrics
                totalTests={data.totalTests}
                totalQuestions={data.totalQuestionsAttempt - data.totalUnattemptQuestions}
                accuracy={data.averageAccuracy}
                totalCorrectAnswers={data.totalCorrectAnswers}
            />
            <ScoreCompositionChart data={data.scoreParametersData} />
            <SubjectPerformanceCard stats={data.performance.subjects.stats} />
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

const ChapterAnalysisTab = ({ data }: AnalysisTabProps) => {
    return (
        <div className="space-y-6 animate-fade-in">
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

const SettingsTab = ({stream}:{stream:TStream}) => {
    return (
        <div className="animate-fade-in">
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle>Settings</CardTitle>
                    <p className="text-sm text-gray-500">Manage your account and preferences.</p>
                </CardHeader>
                <CardContent>
                    <ChangeStreamForm currentStream={stream} />
                </CardContent>
            </Card>
        </div>
    );
};

// =================================================================================
// The Main Custom Tabs Component
// =================================================================================

type DashboardTabsProps = {
    analyticsData: TDashboardAnalyticData;
    user: TBaseUser
};

export const DashboardTabs = ({ analyticsData , user}: DashboardTabsProps) => {
    // Use useState to manage the active tab
    const [activeTab, setActiveTab] = useState('analysis');

    // Helper component for a single tab button for cleanliness
    const TabButton = ({ value, children }: { value: string; children: React.ReactNode }) => (
        <button
            onClick={() => setActiveTab(value)}
            className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-3 px-4 text-base font-semibold transition-all duration-300 ${
                activeTab === value
                    ? 'bg-white text-purple-600 shadow-md dark:bg-slate-900'
                    : 'bg-transparent text-slate-600 hover:bg-slate-200/70 dark:text-slate-300 dark:hover:bg-slate-700/50'
            }`}
        >
            {children}
        </button>
    );

    return (
        <div className="w-full">
            {/* The custom tab list acting as a segmented control */}
            <div className="flex items-center gap-2 rounded-xl bg-slate-100 p-2 dark:bg-slate-800">
                <TabButton value="analysis">
                    <BarChart3 className="h-5 w-5" />
                    <span>Analysis</span>
                </TabButton>
                <TabButton value="chapters">
                    <Bookmark className="h-5 w-5" />
                    <span>Chapters</span>
                </TabButton>
                <TabButton value="settings">
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                </TabButton>
            </div>

            {/* The content area that conditionally renders based on activeTab state */}
            <div className="mt-6">
                {activeTab === 'analysis' && <AnalysisTab data={analyticsData} />}
                {activeTab === 'chapters' && <ChapterAnalysisTab data={analyticsData} />}
                {activeTab === 'settings' && <SettingsTab stream={user.stream} />}
            </div>
        </div>
    );
};