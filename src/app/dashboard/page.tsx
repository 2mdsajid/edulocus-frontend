import ErrorPage from '@/components/reusable/ErrorPage';
import { PieChartWithCenterLabel } from '@/components/reusable/PieChartWithCenterLabel';
import { ReusableLineChart } from '@/components/reusable/ReusableLineChart';
import { getUserSession } from '@/lib/auth/auth';
import { redirect } from 'next/navigation';
import { getDashboardAnalytics } from './_components/actions';
import DashboardCard from './_components/DashboardCard';
import RecentTestCard from './_components/RecentTestCard';
import { SubjectWiseScoreBarGraph } from './_components/SubjectWiseScoreBarGraph';

type Props = {};

const page = async (props: Props) => {
    const { data: user, message: userSessionMessage } = await getUserSession();
    // Redirect non-subscribed users
    if (!user || !user.isSubscribed) {
        return redirect('/');
    }

    const userId = user.id;
    const {
        data: dashboardAnalyticsData,
        message: dashboardAnalyticsMessage,
    } = await getDashboardAnalytics(userId);

    if (!dashboardAnalyticsData) {
        return <ErrorPage errorMessage={dashboardAnalyticsMessage} />;
    }

    const {
        totalTests,
        totalQuestionsAttempt,
        totalCorrectAnswers,
        totalIncorrectanswers,
        totalUnattemptQuestions,
        averageScorePerTest,
        scoreParametersData,
        averageScorePerQuestion,
        recentTests,
        dailyTestProgressChartData,
        subjectWiseScoreChartData
    } = dashboardAnalyticsData;


    return (
        <div className='w-full mx-auto space-y-5 pt-24 pb-16 px-4 md:px-10 lg:px-20 xl:px-32'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                <DashboardCard
                    title="Total Tests"
                    value={totalTests}
                    badgeText="Completed Tests"
                    className="bg-blue-500 text-white"
                    badgeClassName="bg-secondary text-primary"
                />
                <DashboardCard
                    title="Total Questions Attempted"
                    value={totalQuestionsAttempt}
                    badgeText="Attempted Questions"
                    className="bg-violet-500 text-white"
                    badgeClassName="bg-secondary text-accent-foreground"
                />
                <DashboardCard
                    title="Average Score Per Test"
                    value={`${averageScorePerTest}%`}
                    badgeText="Score/Test"
                    className="bg-green-500 text-white"
                    badgeClassName="bg-secondary text-success-foreground"
                />
                <DashboardCard
                    title="Average Score Per Question"
                    value={`${averageScorePerQuestion}%`}
                    badgeText="Score/Question"
                    className="bg-orange-500 text-white"
                    badgeClassName="bg-secondary text-warning-foreground"
                />
            </div>

            <div className="flex gap-4 flex-col md:flex-row">
                {/* pie chart */}
                <div className="w-full">
                    <PieChartWithCenterLabel
                        chartTitle='Various Scores'
                        chartDescription='A comprehensive chart showing the score of different types'
                        dataKey='value'
                        nameKey='name'
                        centreLabel='Total'
                        chartData={scoreParametersData}
                    />
                </div>
                <div className="w-full h-full">
                    <PieChartWithCenterLabel
                        chartTitle='Various Subject Scores'
                        chartDescription='A comprehensive chart showing the score of different Subjects'
                        dataKey='score'
                        nameKey='subject'
                        centreLabel='Total Score'
                        chartData={subjectWiseScoreChartData}
                    />
                </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className='w-full'>
                    <SubjectWiseScoreBarGraph
                        chartData={subjectWiseScoreChartData}
                    />
                </div>
                <div className="w-full">
                    <ReusableLineChart
                        chartData={dailyTestProgressChartData}
                        chartTitle='Daily Progress Score'
                        chartDescription='Overall scores of tests given everyday'
                        xAxisKey='date'
                        dataKey='score'
                    />
                </div>
            </div>

            {/* recent tests */}
            <div className='w-full'>
                <h2 className="text-2xl font-bold mb-4">Recent Tests</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {recentTests.length > 0 ? (
                        recentTests.map((test) => (
                            <RecentTestCard key={test.id} {...test} />
                        ))
                    ) : (
                        <p className="text-gray-500">No recent tests found.</p>
                    )}
                </div>
            </div>

        </div>
    );
};

export default page;
