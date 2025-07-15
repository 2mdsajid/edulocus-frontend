import { z } from 'zod';

// Schema for the raw data we expect from the Prisma query
const QuestionForAnalyticsSchema = z.object({
    answer: z.string(),
    subject: z.string().default('Unknown'),
    chapter: z.string().default('Unknown'),
});

const TestQuestionAnswerForAnalyticsSchema = z.object({
    userAnswer: z.string().nullable(),
    question: QuestionForAnalyticsSchema,
});

export const TestAnalyticForDashboardSchema = z.object({
    testQuestionAnswer: z.array(TestQuestionAnswerForAnalyticsSchema),
    createdAt: z.date(),
    customTest: z.object({
        name: z.string(),
        id: z.string(),
    }),
});

export type TTestAnalyticsForDashboardData = z.infer<typeof TestAnalyticForDashboardSchema>;

// Schemas for our processed, final analytics data
export const PerformanceStatSchema = z.object({
    correct: z.number(),
    incorrect: z.number(),
    unattempted: z.number(),
    total: z.number(),
    accuracy: z.number(),
    fill: z.string(),
});
export type TPerformanceStat = z.infer<typeof PerformanceStatSchema>;

const PerformanceInsightSchema = PerformanceStatSchema.extend({
    name: z.string(),
});
export type TPerformanceInsight = z.infer<typeof PerformanceInsightSchema>;

// ✨ New schema for the nested chapter stats: { [subjectName]: { [chapterName]: TPerformanceStat } }
export const ChapterStatsBySubjectSchema = z.record(z.string(), z.record(z.string(), PerformanceStatSchema));
export type TChapterStatsBySubject = z.infer<typeof ChapterStatsBySubjectSchema>;

// ✨ New schema for chapter insights, which will also be nested by subject
const ChapterInsightsSchema = z.object({
    top: z.array(PerformanceInsightSchema),
    weakest: z.array(PerformanceInsightSchema),
});


const ScoreParameterSchema = z.object({
    name: z.enum(['correct', 'incorrect', 'unattempt']),
    value: z.number(),
    total: z.number(),
    fill: z.string(),
});
export type TScoreParameter = z.infer<typeof ScoreParameterSchema>;


const RecentTestSchema = z.object({
    id: z.string(),
    name: z.string(),
    date: z.string().datetime(),
    totalQuestions: z.number(),
    score: z.number(),
});
export type TRecentTestInDashboardData = z.infer<typeof RecentTestSchema>;


const DailyTestProgressSchema = z.object({
    date: z.string(),
    score: z.number(),
    fill: z.string(),
});
export type TDailyTestProgressChartData = z.infer<typeof DailyTestProgressSchema>;


// The main schema for the entire dashboard analytics response payload
export const DashboardAnalyticDataSchema = z.object({
    totalTests: z.number(),
    totalQuestionsAttempt: z.number(),
    totalCorrectAnswers: z.number(),
    totalIncorrectanswers: z.number(),
    totalUnattemptQuestions: z.number(),
    averageAccuracy: z.number(),
    scoreParametersData: z.array(ScoreParameterSchema),
    recentTests: z.array(RecentTestSchema),
    dailyTestProgressChartData: z.array(DailyTestProgressSchema),
    performance: z.object({
        subjects: z.object({
            stats: z.record(z.string(), PerformanceStatSchema),
            insights: z.object({
                top: z.array(PerformanceInsightSchema),
                weakest: z.array(PerformanceInsightSchema),
            }),
        }),
        // 👇 The 'chapters' object is now updated to use the new nested schemas
        chapters: z.object({
            stats: ChapterStatsBySubjectSchema,
            // The insights are now a record, keyed by subject name
            insights: z.record(z.string(), ChapterInsightsSchema),
        }),
    }),
    groupData: z.array(z.object({ id: z.string(), name: z.string() })),
});

export type TDashboardAnalyticData = z.infer<typeof DashboardAnalyticDataSchema>;
