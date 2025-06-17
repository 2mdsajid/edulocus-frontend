import ErrorPage from '@/components/reusable/ErrorPage';
import { ReusableLineChart } from '@/components/reusable/ReusableLineChart';
import { getUserSession } from '@/lib/auth/auth';
import { constructMetadata } from '@/lib/data';
import { redirect } from 'next/navigation';
import DashboardCard from './_components/DashboardCard';
import RecentTestCard from './_components/RecentTestCard';
import { SubjectWiseScoreBarGraph } from '@/components/charts/SubjectWiseScoreBarGraph';
import { VariousScoresPieChart } from '@/components/charts/VariousScoresPieChart';
import { VariousSubjectScore } from '@/components/charts/VariousSubjectScore';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AiFillRobot } from 'react-icons/ai';
import { getDashboardAnalytics } from '@/lib/actions/users.actions';

type Props = {};

export const metadata = constructMetadata({
    title: "Edulocus | Dashboard",
    description: "Dashboard by EduLocus"
})

const page = async (props: Props) => {

    const { data: user, message: authMessage } = await getUserSession()
    if (!user || !user.googleId || !user.id) {
        redirect('/login')
    }

    if (!user.isCompleted) {
        redirect('/login/stream')
    }


    const {
        data: dashboardAnalyticsData,
        message: dashboardAnalyticsMessage,
    } = await getDashboardAnalytics(user?.id as string);

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
        subjectWiseScoreChartData,
        groupData,
    } = dashboardAnalyticsData;

    return (
        <div className='w-full bg-color1 mx-auto space-y-5 pt-24 pb-16 px-4 md:px-10 lg:px-20 xl:px-32'>

            <Link href="/dashboard/ai">
                <Button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white">
                    <AiFillRobot className="w-6 h-6" />
                    Generate AI Report
                </Button>
            </Link>


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
                    value={`${Math.round(averageScorePerTest / 10)}`}
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
                <div className="w-full">
                    <VariousScoresPieChart data={scoreParametersData} />
                </div>
                <div className="w-full h-full">
                    <VariousSubjectScore data={subjectWiseScoreChartData} />
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

            {/* Group Data */}
            {groupData && groupData.length > 0 && (
                <div className='w-full'>
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 pb-3">Your Groups</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {groupData.map((group) => (
                            <div key={group.id} className="bg-white p-6 rounded-lg shadow-md border">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">{group.name}</h3>
                                <Link href={`/group/view/${group.id}`}>
                                    <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                                        View Group
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* recent tests */}
            <div className='w-full '>
                <h2 className="text-3xl font-bold text-gray-800 mb-6 mt-20 border-b-2 pb-3">Your Recent Test Activity</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {recentTests.length > 0 ? (
                        recentTests.map((test) => (
                            <RecentTestCard key={test.id} {...test} />
                        ))
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center p-8 text-gray-500 bg-gray-50 rounded-lg">
                            <p className="text-lg mb-2">No recent tests found.</p>
                            <p className="text-md">Time to challenge yourself with a new test!</p>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default page;
