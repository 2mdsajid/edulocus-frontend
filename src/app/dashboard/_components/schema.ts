export type TRecentTestInDashboardData = {
    id: string
    name: string
    date: string
    totalQuestions: number
    score: number
}

export type TScoreParametersData = {
    name: string;
    value: number;
    total: number;
    fill: string;
}

export type TDailyTestProgressChartData = {
    date: string;
    score: number;
}

export type TSubjectwiseScoresChartData = {
    subject: string;
    score: number;
    total: number;
    fill: string;
}

export type TDashboardAnalyticData = {
    totalTests: number,
    totalQuestionsAttempt: number,
    totalCorrectAnswers: number,
    totalUnattemptQuestions: number,
    totalIncorrectanswers: number,
    averageScorePerTest: number,
    averageScorePerQuestion: number,
    scoreParametersData:TScoreParametersData[],
    recentTests: TRecentTestInDashboardData[],
    dailyTestProgressChartData: TDailyTestProgressChartData[],
    subjectWiseScoreChartData: TSubjectwiseScoresChartData[],
}